// Framework-free scroll reveal + lazy backgrounds, so content never waits on React hydration.
// HEAD runs before first paint; BODY runs once, right after the server-rendered markup is parsed.
export const REVEAL_HEAD = `"IntersectionObserver" in window&&document.documentElement.classList.add("js")`;

export const REVEAL_BODY = `(function(){
if(!("IntersectionObserver" in window))return;
var pending=new Set();
var show=function(el){pending.delete(el);el.setAttribute("data-in","true")};
var mk=function(m){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);o.unobserve(e.target)}})},{rootMargin:m});return o};
var io=mk("0px 0px -80px 0px"),lz=mk("200px 0px");
var add=function(el){if(el.getAttribute("data-in"))return;
if(el.hasAttribute("data-lazy-bg"))lz.observe(el);
else if(el.hasAttribute("data-immediate"))requestAnimationFrame(function(){show(el)});
else{pending.add(el);io.observe(el)}};
var tick=0;addEventListener("scroll",function(){if(tick)return;tick=requestAnimationFrame(function(){tick=0;pending.forEach(function(el){if(el.getBoundingClientRect().top<innerHeight-80){show(el);io.unobserve(el)}})})},{passive:true});
var scan=function(n){if(n.nodeType!==1)return;if(n.matches("[data-reveal],[data-lazy-bg]"))add(n);n.querySelectorAll("[data-reveal],[data-lazy-bg]").forEach(add)};
scan(document.body);
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(scan)})}).observe(document.body,{childList:true,subtree:true});
})();`;
