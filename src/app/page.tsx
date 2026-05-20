import ScrollToTop from '@/components/ScrollToTop';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import AIAgents from '@/components/sections/AIAgents';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <AIAgents />
      <Blog />
      <Contact />
    </>
  );
}
