"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Perspective corridor: scanlined ceiling and floor planes converging on a dark horizon.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

float h1(float n){ return fract(sin(n * 12.9898) * 43758.5453); }
float h2(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float y = uv.y + 0.035;
  float ay = max(abs(y), 1e-4);
  float side = step(0.0, y);
  float z = 0.3 / ay;
  float wz = z + uTime * 0.35;
  float wx = uv.x * z;
  float px = uRes.y / z;

  // fine screen-space scanlines with streaky per-row brightness
  float row = floor(gl_FragCoord.y / 2.0);
  float rr = h1(row * 1.37 + side * 31.0);
  float seg = h2(vec2(row, floor(wx * 0.35 + rr * 9.0)));
  float bandR = h1(floor(wz * 6.0) + side * 53.0);
  float scan = 0.55 + 0.45 * step(0.5, fract(gl_FragCoord.y * 0.5));
  float lum = (0.16 + 0.42 * rr * mix(0.55, 1.0, seg) * mix(0.6, 1.0, bandR)) * scan;

  // converging lines at constant world x
  float sp = 0.16;
  float lx = wx / sp;
  float cell = floor(lx + 0.5);
  float d = abs(lx - cell) * sp * px;
  float spacingPx = sp * px;
  float line = (1.0 - smoothstep(0.6, 2.2, d)) * smoothstep(4.0, 14.0, spacingPx);
  float lr = h1(cell * 3.17 + side * 7.3);
  float lrBright = step(0.45, lr) * (0.45 + 0.55 * h1(cell * 1.91 + side));
  float lrDark = step(lr, 0.25);
  lum += line * lrBright * 0.42 + (1.0 - smoothstep(0.0, 6.0, d)) * lrBright * 0.05;
  lum *= 1.0 - line * lrDark * 0.8;
  float center = 1.0 - smoothstep(0.5, 1.6, abs(wx) * px);
  lum *= 1.0 - center * 0.85;

  // grime specks
  lum *= 1.0 - 0.7 * step(0.997, h2(vec2(floor(wx * 6.0), floor(wz * 30.0) + side)));

  float fog = smoothstep(0.0, 0.14, ay);
  float horizon = smoothstep(0.004, 0.035, ay);
  lum *= mix(0.12, 1.0, fog) * mix(0.15, 1.0, horizon);
  lum *= 0.8 + 0.45 * smoothstep(0.15, 1.0, length(vec2(uv.x * 0.7, ay)));
  lum += (h2(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.04;
  lum = clamp(lum, 0.0, 1.0);
  gl_FragColor = vec4(vec3(lum * 0.98, lum * 0.99, lum), 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
  return s;
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let teardown = () => {};
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) {
        setFailed(true);
        return;
      }
      let prog: WebGLProgram;
      try {
        prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
      } catch {
        setFailed(true);
        return;
      }
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, "uRes");
      const uTime = gl.getUniformLocation(prog, "uTime");

      // Software rasterizers can't sustain a full-screen shader: render one still frame instead.
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
      let staticOnly = /swiftshader|llvmpipe|software/i.test(renderer);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      let raf = 0;
      let visible = true;
      let start = performance.now();
      let offset = 6;
      let scale = window.innerWidth < 768 ? 1 : 1.5;
      let last = 0;
      let slow = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, scale);
        const w = Math.round(canvas.clientWidth * dpr);
        const h = Math.round(canvas.clientHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      };

      const draw = (time: number) => {
        gl.uniform1f(uTime, time);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const stop = () => {
        cancelAnimationFrame(raf);
        raf = 0;
      };
      const pause = () => {
        if (raf) offset += (performance.now() - start) / 1000;
        stop();
      };

      // Adaptive quality: drop resolution, then stop animating, if frames stay slow.
      const loop = (now: number) => {
        if (last && now - last > 45) slow++;
        else slow = Math.max(0, slow - 1);
        last = now;
        if (slow > 20) {
          slow = 0;
          if (scale > 0.75) {
            scale = 0.75;
            resize();
          } else {
            staticOnly = true;
            pause();
            return;
          }
        }
        draw(offset + (now - start) / 1000);
        raf = requestAnimationFrame(loop);
      };

      const play = () => {
        if (raf || staticOnly || reduce.matches || !visible || document.hidden) return;
        start = performance.now();
        last = 0;
        raf = requestAnimationFrame(loop);
      };

      resize();
      draw(offset);
      setReady(true);
      play();

      const ro = new ResizeObserver(() => {
        resize();
        if (!raf) draw(offset);
      });
      ro.observe(canvas);
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) play();
        else pause();
      });
      io.observe(canvas);
      const onVis = () => (document.hidden ? pause() : play());
      const onMotion = () => (reduce.matches ? pause() : play());
      document.addEventListener("visibilitychange", onVis);
      reduce.addEventListener("change", onMotion);

      teardown = () => {
        stop();
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        reduce.removeEventListener("change", onMotion);
      };
    };

    // Defer GPU work until the page has loaded so it never competes with first paint.
    let idle = 0;
    const schedule = () => {
      const ric = window.requestIdleCallback;
      idle = ric ? ric(setup, { timeout: 1200 }) : window.setTimeout(setup, 200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      clearTimeout(idle);
      teardown();
    };
  }, []);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 4px), radial-gradient(ellipse at 50% 53%, #000 0%, #2a2a2a 45%, #4a4a4a 100%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
    />
  );
}
