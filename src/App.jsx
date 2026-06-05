import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import SignatureCrafts from "./components/SignatureCrafts.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Gallery />
      <ExperienceSection />
      <SignatureCrafts />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
