import Hero from "./components/Hero";
import ProjectsParallax from "./components/ProjectsParallax";
import About from "./components/About";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import projects from "./data/projects";
import { ThemeProvider } from "./context/ThemeContext";

function Page() {

  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] min-h-screen">
      <Hero projects={projects} />
      <ProjectsParallax projects={projects} />
      <About />
      <ProjectsSection projects={projects} />
      <Contact />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}
