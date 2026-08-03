import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-[-1] opacity-70"
        style={{
          backgroundImage: "url('/backend-development-and-programming-programmer-coding-and-testing-program-code-creating-apps.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-background/80 via-background/90 to-background" />

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center w-full z-10">
        <Hero />
        <div className="w-full bg-background">
          <Features />
        </div>
        <div className="w-full bg-transparent">
          <HowItWorks />
        </div>
        <div className="w-full bg-background">
          <FAQ />
        </div>
      </main>

      <div className="w-full bg-background relative z-10">
        <Footer />
      </div>
    </div>
  );
}
