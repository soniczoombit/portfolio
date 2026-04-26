import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import HoverButton from "./components/HoverButton";
import { HeroBackground } from "./components/HeroBackground";
import { ProjectsBackground } from "./components/ProjectsBackground";
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaNodeJs, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Custom Section wrapper to detect visibility
function Section({ id, className, children, setActiveBg, bgName }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveBg(bgName);
    }
  }, [isInView, setActiveBg, bgName]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

function App() {
  const [activeBg, setActiveBg] = useState("hero");

  const languages = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Python", icon: <FaPython className="text-blue-400" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-300" /> },
  ];

  const tools = [
    { name: "GitHub", icon: <FaGithub className="text-gray-300" /> },
    { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
  ];

  const concepts = [
    "Web Development",
    "Problem Solving",
    "Database Fundamentals"
  ];

  return (
    <div className="relative min-h-screen text-white font-outfit selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* BACKGROUND MANAGER */}
      <div className="fixed inset-0 w-full h-full z-[-10] bg-black">
        {/* First Background: Hero, About, Skills */}
        <motion.div 
          animate={{ opacity: ["hero", "about", "skills"].includes(activeBg) ? 1 : 0 }} 
          transition={{ duration: 1 }} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <HeroBackground />
        </motion.div>
        
        {/* Second Background: Projects, Contact */}
        <motion.div 
          animate={{ opacity: ["projects", "contact"].includes(activeBg) ? 1 : 0 }} 
          transition={{ duration: 1 }} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <ProjectsBackground />
        </motion.div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 bg-black/30 backdrop-blur-md z-50 border-b border-white/10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bold text-xl tracking-wider"
        >
          BR.
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex space-x-8 text-sm font-medium text-gray-400"
        >
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <Section id="hero" bgName="hero" setActiveBg={setActiveBg} className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative z-10 pt-32">
        <div className="max-w-4xl mx-auto flex flex-col items-center bg-black/20 p-8 rounded-3xl backdrop-blur-sm border border-white/5">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-2"
          >
            Breyon Rodrigues
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 font-medium mb-8 max-w-2xl"
          >
            Computer Science-Focused Engineering Student <span className="text-gray-500">|</span> Web Development & AI
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl leading-relaxed font-inter"
          >
            I’m a second-year Electronics and Computer Science student focused on building practical web applications and exploring AI-driven development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HoverButton onClick={() => window.location.href = "#projects"}>
              View My Work
            </HoverButton>
          </motion.div>
        </div>
      </Section>

      {/* ABOUT ME SECTION */}
      <Section id="about" bgName="about" setActiveBg={setActiveBg} className="py-40 px-6 relative z-10">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/10"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold">About Me</h2>
            <div className="h-[1px] flex-grow bg-white/20"></div>
          </div>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-inter">
            <p>
              I’m a second-year Electronics and Computer Science student with a strong focus on the computer science side. I enjoy building websites, experimenting with code, and understanding how systems work.
            </p>
            <p>
              I’m particularly interested in using AI as a tool to improve development while still strengthening my core fundamentals.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* SKILLS SECTION */}
      <Section id="skills" bgName="skills" setActiveBg={setActiveBg} className="py-40 px-6 relative z-10 pointer-events-none">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto pointer-events-auto bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] flex-grow bg-white/20"></div>
            <h2 className="text-3xl md:text-4xl font-semibold">Skills & Tech</h2>
            <div className="h-[1px] flex-grow bg-white/20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl text-gray-400 mb-6 font-medium">Languages & Technologies</h3>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((skill, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10 hover:border-white/30 transition-colors backdrop-blur-md">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl text-gray-400 mb-6 font-medium">Tools & Environment</h3>
              <div className="grid grid-cols-1 gap-4">
                {tools.map((tool, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10 hover:border-white/30 transition-colors backdrop-blur-md">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="text-sm font-medium">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl text-gray-400 mb-6 font-medium">Core Concepts</h3>
              <div className="flex flex-col gap-4">
                {concepts.map((concept, i) => (
                  <motion.div key={i} variants={fadeIn} className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center h-[58px]">
                    <span className="text-sm font-medium text-gray-200">{concept}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section id="projects" bgName="projects" setActiveBg={setActiveBg} className="py-40 px-6 relative z-10">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center bg-black/40 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/10"
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-2">Projects</h2>
          <motion.div 
            className="text-gray-500 text-xl md:text-2xl mb-8 flex justify-center flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {"(Work in Progress)".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    x: Math.random() * 100 - 50, 
                    y: Math.random() * 100 - 50,
                    rotate: Math.random() * 90 - 45,
                    filter: "blur(10px)"
                  },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    rotate: 0,
                    filter: "blur(0px)",
                    transition: { type: "spring", damping: 12, stiffness: 200 }
                  }
                }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto font-inter">
            I am currently building and refining projects to strengthen my development skills. This section will be updated with completed work soon.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[1, 2].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md min-h-[250px] flex flex-col justify-center items-center group cursor-pointer transition-all hover:border-white/30"
              >
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-500 mb-4 flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:border-white">
                  <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-white transition-colors"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-300 group-hover:text-white transition-colors">Coming Soon</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* RESUME & CONTACT SECTION */}
      <Section id="contact" bgName="contact" setActiveBg={setActiveBg} className="py-40 px-6 relative z-10">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center bg-black/40 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/10"
        >
          <div className="mb-24">
            <h2 className="text-2xl font-medium mb-8 text-gray-300">Interested in my academic or professional background?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <HoverButton 
                className="w-full sm:w-auto"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                View Resume
              </HoverButton>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's Connect</h2>
          <p className="text-gray-400 text-lg mb-12 font-inter">
            Always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="flex justify-center gap-6 md:gap-8">
            <a href="mailto:breyonrodrigues2@gmail.com" className="p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
              <FiMail className="text-2xl" />
            </a>
            <a href="https://github.com/soniczoombit" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://www.linkedin.com/in/breyon-rodrigues-6a853338a/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://www.instagram.com/breyonrodrigues/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </motion.div>
      </Section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10 bg-black/60 backdrop-blur-md relative z-10">
        <p>© {new Date().getFullYear()} Breyon Rodrigues. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;