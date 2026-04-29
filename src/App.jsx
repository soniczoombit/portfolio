import { useState, useRef, useEffect, useCallback } from "react";
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
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      title: "Safora",
      tagline: "A protective safety layer for every journey.",
      image: "/safora-preview.jpg",
      status: "Ongoing — Work in Progress",
      overview: "Safora is a smart tourist safety and emergency response application designed to protect travellers in unfamiliar environments. It provides real-time safety intelligence, zone-based risk alerts, and instant emergency escalation — all in a single, intuitive interface.",
      problem: "Tourists in unfamiliar cities often lack real-time situational awareness. There is no unified system that combines safety zone mapping, emergency response, and local risk intelligence into a single accessible tool.",
      solution: "Safora aggregates live safety data, maps colour-coded risk zones, and provides a one-tap emergency pipeline — giving travellers a proactive safety layer rather than a reactive one.",
      features: [
        { name: "Live Safety Map", desc: "Colour-coded zones showing real-time risk levels across areas." },
        { name: "SOS Emergency Button", desc: "One-tap escalation that alerts local authorities and emergency contacts." },
        { name: "Zone Alerts", desc: "Push notifications when entering or approaching high-risk areas." },
        { name: "Nearby Safe Spots", desc: "Locates hospitals, police stations, and shelters in proximity." },
        { name: "Offline Mode", desc: "Core safety features accessible without an active internet connection." },
      ],
      techStack: {
        Frontend: "React Native",
        Backend: "Node.js / Express",
        Database: "Firebase Realtime DB",
        "APIs / Integrations": "Google Maps API, Twilio SMS",
      },
      impact: "Safora directly addresses personal safety gaps for travellers and tourists. By providing real-time risk intelligence and a fast emergency pipeline, it reduces response time in critical situations and gives users the confidence to explore unfamiliar places safely.",
      future: [
        "AI-powered predictive risk scoring based on historical incident data.",
        "Community reporting — users can flag and verify incidents in real time.",
        "Multi-language support for international travellers.",
      ],
      tags: ["React Native", "Node.js", "Firebase", "Maps API"],
      github: "#",
    },
    {
      title: "BookSpace",
      tagline: "Smarter room booking for smarter departments.",
      image: "/bookspace-preview.png",
      status: "Ongoing — Core Features Built",
      overview: "BookSpace is a full-stack faculty room and lab booking system built for the Electronics & Computer Science department at Fr. CRCE. It allows faculty to check real-time room availability, book slots around the fixed timetable, track absences, and interact with an AI assistant for scheduling — all in one dashboard.",
      problem: "Faculty in the ECS department had no centralised system to check room availability or make ad-hoc bookings. Scheduling conflicts, double-bookings, and manual coordination were common pain points across 9 rooms and multiple time slots.",
      solution: "BookSpace integrates the fixed department timetable directly into a smart booking engine. Faculty log in, see live room availability, and make bookings in seconds. An AI chatbot (powered by Gemini) handles conversational scheduling and cancellations.",
      features: [
        { name: "Live Room Grid", desc: "Real-time availability across all 9 classrooms and labs with conflict detection." },
        { name: "Timetable-Aware Engine", desc: "Fixed schedule is baked in — bookings are automatically blocked during class hours." },
        { name: "AI Chatbot", desc: "Gemini-powered assistant that understands natural language booking and cancellation requests." },
        { name: "Absence Tracking", desc: "Faculty can log absences, freeing up timetable slots for ad-hoc bookings." },
        { name: "Offline Fallback", desc: "Local storage fallback ensures functionality even when the backend is unreachable." },
      ],
      techStack: {
        Frontend: "HTML, CSS, Vanilla JS",
        Backend: "Node.js / Express",
        Database: "Supabase (PostgreSQL)",
        "APIs / Integrations": "Google Gemini API (OpenAI-compatible)",
      },
      impact: "BookSpace eliminates scheduling conflicts and reduces coordination overhead for the ECS department. It gives every faculty member real-time visibility into room usage, saving time and preventing double-bookings across a busy academic floor.",
      future: [
        "Role-based access — HOD override, admin dashboard, and read-only student view.",
        "Calendar sync — export bookings directly to Google Calendar.",
        "Mobile-responsive redesign for use on phones between lectures.",
      ],
      tags: ["Node.js", "Supabase", "Gemini AI", "Vanilla JS"],
      github: "#",
    },
  ];

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
      <Section id="hero" bgName="hero" setActiveBg={setActiveBg} className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
        
        {/* Name — per-letter stagger animation */}
        <motion.div
          style={{ paddingBottom: "0.5rem" }}
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
        >
          {"Breyon Rodrigues".split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { y: "110%", opacity: 0, rotate: char === " " ? 0 : (i % 2 === 0 ? -8 : 8) },
                visible: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", damping: 14, stiffness: 160 } }
              }}
              style={{
                display: "inline-block",
                marginRight: char === " " ? "1.25rem" : undefined,
                color: "#ffffff",
                lineHeight: 1.15,
                paddingBottom: "0.25rem",
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="w-24 h-px mb-6 origin-left bg-white/50"
        />

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg md:text-xl text-white font-medium mb-5 max-w-2xl tracking-wide"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
        >
          Computer Science-Focused Engineering Student
          <span className="mx-3 text-white/50">|</span>
          Web Development &amp; AI
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-sm md:text-base text-white/80 mb-12 max-w-xl leading-relaxed font-inter"
          style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}
        >
          Second-year Electronics and Computer Science student — building real products, one line at a time.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <HoverButton onClick={() => window.location.href = "#projects"}>
            View My Work
          </HoverButton>
          <a
            href="#about"
            className="text-sm text-white/70 hover:text-white transition-colors tracking-wider uppercase"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
          >
            About me →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
          />
        </motion.div>
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
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-2">Projects</h2>
          <motion.div 
            className="text-gray-500 text-xl md:text-2xl mb-12 flex justify-center flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {"(Work in Progress)".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, rotate: Math.random() * 90 - 45, filter: "blur(10px)" },
                  visible: { opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 200 } }
                }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card Image */}
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col gap-4">
                  {/* Card Header */}
                  <div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-400 border border-white/10">
                      {project.status}
                    </span>
                    <h3 className="text-2xl font-bold mt-3 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 italic">{project.tagline}</p>
                  </div>

                  {/* Card Overview */}
                  <p className="text-gray-400 text-sm leading-relaxed font-inter line-clamp-2">{project.overview}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-colors mt-1">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* PROJECT DETAIL MODAL */}
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-10 relative"
          >
            {/* Close */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors text-2xl leading-none"
            >
              ✕
            </button>

            {/* Hero Image Banner */}
            <div className="w-full h-52 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-400 border border-white/10">{activeProject.status}</span>
              <h2 className="text-3xl font-bold mt-3">{activeProject.title}</h2>
              <p className="text-gray-400 italic mt-1">{activeProject.tagline}</p>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Overview</h4>
              <p className="text-gray-300 text-sm leading-relaxed font-inter">{activeProject.overview}</p>
            </div>

            {/* Problem + Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Problem</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-inter">{activeProject.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Solution</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-inter">{activeProject.solution}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Core Features</h4>
              <ul className="space-y-2">
                {activeProject.features.map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-white mt-0.5">◆</span>
                    <span className="text-gray-300 font-inter"><span className="text-white font-medium">{f.name}</span> — {f.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Tech Stack</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(activeProject.techStack).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-white text-sm font-medium">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Impact</h4>
              <p className="text-gray-300 text-sm leading-relaxed font-inter">{activeProject.impact}</p>
            </div>

            {/* Future Scope */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Future Scope</h4>
              <ul className="space-y-1">
                {activeProject.future.map((f, i) => (
                  <li key={i} className="text-gray-400 text-sm font-inter flex gap-2"><span className="text-gray-600">→</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* GitHub Button */}
            <a
              href={activeProject.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              <FaGithub />
              {activeProject.github === "#" ? "View on GitHub — WIP, link soon" : "View on GitHub"}
            </a>
          </motion.div>
        </motion.div>
      )}

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