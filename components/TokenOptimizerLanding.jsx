import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
// 1. IMPORT LENIS (Make sure to install: npm install lenis)
import Lenis from 'lenis';
import { 
  ArrowRight, Lock, Zap, Shield, Star, Download, User, Share2, 
  Settings, Cpu, Globe, HardDrive, Users, MessageSquare 
} from 'lucide-react';

import TokenOptimizerChart from './TokenOptimizerChart'; 
import OptimizerUseCases from './OptimizerUseCases';
import TokenOptimizerFAQ from './TokenOptimizerFAQ';
import SupportedInputs from './SupportedInputs';

/* --- REVEAL COMPONENT --- */
const Reveal = ({ children, delay = 0, width = "100%" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 } 
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    style={{ width }}
  >
    {children}
  </motion.div>
);

/* --- NAVBAR COMPONENT --- */
const Navbar = ({ onOptimize }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Hide navbar when scrolling down past 150px, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    // Change appearance if scrolled past 50px
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div 
          className={`flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled 
              ? "bg-[#F4F3EE] border-4 border-black p-3 px-6 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black" 
              : "bg-transparent p-3 px-6 text-white border-4 border-transparent shadow-none"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 font-black text-xl md:text-2xl uppercase tracking-tighter">
            <div className={`p-1.5 rounded-lg border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isScrolled ? 'bg-pink-500' : 'bg-yellow-400'}`}>
              <Zap size={20} className={isScrolled ? "text-white fill-white" : "text-black fill-black"} />
            </div>
            <span>Opti<span className={isScrolled ? "text-pink-500" : "text-yellow-400"}>Token</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-black uppercase text-sm tracking-widest">
            <a href="#how-it-works" className="hover:-translate-y-1 transition-transform">How It Works</a>
            <a href="#metrics" className="hover:-translate-y-1 transition-transform">Metrics</a>
            <a href="#stats" className="hover:-translate-y-1 transition-transform">Stats</a>
          </div>

          {/* CTA Button */}
          <button 
            onClick={onOptimize}
            className={`font-black uppercase text-xs md:text-sm tracking-widest px-6 py-2.5 rounded-xl border-4 border-black transition-all active:translate-y-1 active:shadow-none hover:-translate-y-1 ${
              isScrolled 
                ? "bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                : "bg-pink-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            Optimize
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

/* --- DATA --- */
const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "AI Engineer",
    company: "TechNova",
    content: "We were hitting the context limit constantly when trying to feed entire codebases to Claude. This optimizer shrank our payload by 60% without losing any structural logic.",
    rating: 5,
    avatarUrl:"/testimonial_pic.png"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "DataSync",
    content: "Our GPT-4 API costs were spiraling out of control due to massive system prompts. Implementing this cut our monthly inference bill in half literally overnight.",
    rating: 5,
   avatarUrl:"/pic.webp"
  },
{
    id: 3,
    name: "David Kim",
    role: "Indie Hacker",
    company: "Solo Forge",
    content: "Fast, simple, and it just works. I paste in my messy brainstorming dumps, and it spits out a lean, token-efficient prompt that gives me way better results.",
    rating: 5,
    avatarUrl:"/sak.webp"
  }
];

const LandingPage = ({ onOptimize }) => {
  
  // 2. INITIALIZE SMOOTH SCROLL (LENIS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical', 
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-indigo-950 text-indigo-50 font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      
      {/* ADDED NAVBAR HERE */}
      <Navbar onOptimize={onOptimize} />
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-20 right-[-100px] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" 
           />
           <motion.div 
             animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }} 
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 left-[-100px] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl" 
           />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-4 border-black bg-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-2">
                <Zap className="fill-black" size={16} />
                Algorithm Online: Ready to Compress
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] leading-[0.9]">
                Shrink Prompts. <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Save Money.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed bg-indigo-900/50 p-4 rounded-xl border-2 border-indigo-500/30 backdrop-blur-sm">
                The <span className="text-yellow-400 font-bold">intelligent compressor</span> for LLM contexts. Strip away the fluff, keep the meaning, and bypass <span className="text-pink-400 font-bold italic">token limits</span> instantly.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <ActionButton onClick={onOptimize} variant="primary" icon={<ArrowRight />}>
                Start Optimizing
                </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>
      

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-[#F4F3EE] border-y-4 border-black text-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider flex items-center justify-center gap-3">
                    <Settings className="text-black fill-yellow-400" size={40}/>
                    How It Works
                </h2>
                <p className="text-gray-600 font-bold mt-4">Three simple steps to lean, mean prompts.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-2 bg-gray-300 rounded-full z-0" />
            
            <Reveal delay={0.1}>
                <FeatureCard number="1" title="Paste Context" desc="Drop your massive prompt, raw code, or JSON directly into the editor." icon={<Share2 className="text-white" />} color="bg-pink-500" />
            </Reveal>
            <Reveal delay={0.3}>
                <FeatureCard number="2" title="Analyze" desc="Our algorithm identifies filler words, redundant syntax, and whitespace." icon={<Cpu className="text-white" />} color="bg-purple-500" />
            </Reveal>
            <Reveal delay={0.5}>
                <FeatureCard number="3" title="Extract Value" desc="Get a compressed token payload that retains 100% of the original intent." icon={<Zap className="text-white" />} color="bg-cyan-500" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <Reveal>
         <OptimizerUseCases />
      </Reveal>

      {/* METRICS & COMPARISON */}
      <section id="metrics" className="py-24 px-6 bg-[#F4F3EE] border-b-4 border-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-left">
                <Reveal>
                    <div className="inline-block bg-black text-white px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border-2 border-pink-500 shadow-[4px_4px_0px_0px_#ec4899]">
                        Performance Metrics
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] mb-6">
                        DOMINATE <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">THE CONTEXT WINDOW.</span>
                    </h2>
                    <p className="text-lg font-bold text-gray-600 mb-8 leading-relaxed">
                        Stop paying for whitespace and polite AI chatter. Our optimizer ensures you only send the tokens that actually drive the output you need.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 font-bold text-black">
                            <div className="w-8 h-8 bg-green-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✓</div>
                            Slash API Costs
                        </div>
                        <div className="flex items-center gap-3 font-bold text-black">
                            <div className="w-8 h-8 bg-green-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✓</div>
                            Reduce Time-to-First-Token
                        </div>
                    </div>
                </Reveal>
            </div>
            
            <div className="lg:w-1/2 w-full">
                <Reveal delay={0.2}>
                    <TokenOptimizerChart />
                </Reveal>
            </div>
        </div>
      </section>

      {/* STATS */}
      <Reveal>
        <ActivitySection />
      </Reveal>
      
      {/* SUPPORTED FORMATS */}
      <Reveal>
        <SupportedInputs /> 
      </Reveal>

      {/* REVIEWS & CTA */}
      <Reveal>
        <AnimatedReviews />
      </Reveal>
      
      <Reveal>
        <TokenOptimizerFAQ />
      </Reveal>

    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const ActionButton = ({ children, onClick, variant, icon }) => {
  const isPrimary = variant === 'primary';
  return (
    <button 
      onClick={onClick}
      className={`
        relative group w-full sm:w-auto px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-100 active:translate-y-2 active:shadow-none
        border-4 border-black
        ${isPrimary 
          ? 'bg-pink-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-400' 
          : 'bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100'}
      `}
    >
      {children} 
      {icon && React.cloneElement(icon, { size: 20, className: "group-hover:scale-110 transition-transform" })}
    </button>
  );
};

const FeatureCard = ({ number, title, desc, icon, color }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className={`w-24 h-24 ${color} border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 transform transition-transform hover:-translate-y-2 hover:rotate-3`}>
      {React.cloneElement(icon, { size: 40 })}
      <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center font-black text-black">
        {number}
      </div>
    </div>
    <h3 className="font-black text-2xl text-black mb-2">{title}</h3>
    <p className="text-gray-600 font-medium leading-relaxed max-w-[260px]">{desc}</p>
  </div>
);

const ActivitySection = ({ id="stats" }) => (
  <section id={id} className="py-20 px-6 bg-indigo-950 border-t-4 border-black relative">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<Globe className="text-white" size={24} />} label="Tokens Saved" value="1.2B+" color="bg-purple-500" />
        <StatCard icon={<HardDrive className="text-white" size={24} />} label="Avg. Compression" value="45%" color="bg-pink-500" />
        <StatCard icon={<Users className="text-white" size={24} />} label="Happy Devs" value="8.5k+" color="bg-cyan-500" />
      </div>
    </div>
  </section>
);

const AnimatedReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-indigo-950 border-t-4 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-4 py-1 bg-cyan-500 border-2 border-black rounded-full text-black font-bold text-xs uppercase tracking-widest mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            User Feedback
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none mb-6">
            Trusted by <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Engineers.</span>
          </h2>
          <p className="text-indigo-300 text-lg font-medium max-w-md mb-8">
            See why builders, researchers, and prompt engineers rely on us for their daily workflows.
          </p>
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-4 border-2 border-black transition-all duration-300 ${
                  activeIndex === index ? "w-12 bg-pink-500" : "w-4 bg-indigo-800"
                } rounded-full`}
              />
            ))}
          </div>
        </div>
        <div className="relative h-[400px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0"
            >
              <div className="h-full bg-white border-4 border-black rounded-3xl p-8 flex flex-col justify-between shadow-[12px_12px_0px_0px_#000]">
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={24} className="fill-yellow-400 text-black stroke-[3]" />
                    ))}
                  </div>
                  <div className="relative">
                    <MessageSquare size={40} className="text-indigo-100 absolute -top-2 -left-2 -z-10 transform -scale-x-100" />
                    <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                      "{testimonials[activeIndex].content}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t-4 border-gray-100 pt-6 mt-4">
                  <div className="h-16 w-16 border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] relative bg-gray-200">
                    <img 
                        src={testimonials[activeIndex].avatarUrl} 
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-black text-xl uppercase">{testimonials[activeIndex].name}</h3>
                    <p className="text-sm font-bold text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded inline-block">
                        {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};


const StatCard = ({ icon, label, value, color }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-black rounded-2xl translate-x-2 translate-y-2" />
    <div className="relative p-6 bg-indigo-900 border-4 border-black rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 hover:translate-x-1 transition-transform bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className={`w-12 h-12 ${color} border-4 border-black rounded-lg flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]`}>
        {icon}
      </div>
      <h4 className="text-4xl font-black text-white mb-1">{value}</h4>
      <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

export default LandingPage;