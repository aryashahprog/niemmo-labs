import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PrimaryButton } from "@/components/Buttons";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-[#161616] text-white">
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-6 pb-20 pt-48 md:px-10">
        <p className="font-pixel text-[11px] uppercase tracking-[0.3em] text-white/45">404</p>
        <h1 className="mt-6 text-4xl font-light tracking-tight md:text-6xl">This page doesn’t exist.</h1>
        <div className="mt-10">
          <PrimaryButton href="/">Back to home</PrimaryButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
