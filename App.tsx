
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, Phone, MessageCircle, Download, 
  ArrowDown, Brain, Smartphone, Code, Shield, Plane, Eye, GraduationCap, 
  BarChart, ArrowUpRight, Send, Heart 
} from 'lucide-react';
import { PROJECTS_DATA, SERVICES_DATA } from './constants';
import { Category, Project } from './types';

// Components defined outside main App to prevent remount issues
const IconMap: Record<string, any> = {
  Code, Smartphone, BarChart, Shield, Plane, Eye, GraduationCap, Github, Linkedin, Mail, Phone, MessageCircle, Download, Send
};

const SkillBadge: React.FC<{ color: string; label: string }> = ({ color, label }) => {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 text-blue-400',
    yellow: 'border-yellow-500/30 text-yellow-400',
    orange: 'border-orange-500/30 text-orange-400',
    indigo: 'border-indigo-500/30 text-indigo-400',
    violet: 'border-violet-500/30 text-violet-400',
    green: 'border-green-500/30 text-green-400',
    pink: 'border-pink-500/30 text-pink-400',
    amber: 'border-amber-500/30 text-amber-400',
  };

  return (
    <div className={`px-4 py-2 rounded-xl glass-card flex items-center gap-2 border transition-all hover:scale-105 hover:-translate-y-1 ${colorMap[color] || 'border-white/10'}`}>
      <Code size={14} />
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  // Typing animation logic
  const roles = ["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "Mobile Developer", "Data Analyst"];
  
  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setTypedText(currentRole.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(type, 100);
        } else {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentRole.substring(0, charIndex - 1));
          charIndex--;
          timeoutId = setTimeout(type, 50);
        } else {
          isDeleting = false;
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timeoutId = setTimeout(type, 100);
        }
      }
    };

    timeoutId = setTimeout(type, 500);
    return () => clearTimeout(timeoutId);
  }, [roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const filteredProjects = PROJECTS_DATA.filter(p => activeTab === 'all' || p.category === activeTab);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-200 overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/10 py-4 md:border-0 md:backdrop-blur-0 ${isScrolled ? 'md:bg-[#0A0A0F]/90 md:backdrop-blur-xl md:border-b md:border-white/10 md:py-4 md:shadow-lg' : 'md:bg-transparent md:py-6'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          <button onClick={() => scrollTo('home')} className="text-2xl font-serif-logo font-bold text-white tracking-wider group">
            ABHINAV<span className="text-violet-500 transition-colors group-hover:text-amber-500">.</span>
          </button>

          <div className="hidden md:flex gap-8 items-center">
            {['home', 'about', 'services', 'portfolio', 'contact'].map(item => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors capitalize relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-violet-500 transition-all group-hover:w-full group-hover:left-0" />
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-violet-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Let's Talk
            </button>
          </div>

          <button
            className={`md:hidden text-white p-2 rounded-xl glass-card transition-all shadow-lg shadow-violet-500/10 ${
              isMobileMenuOpen
                ? 'bg-gradient-to-br from-[#0A0A0F]/90 via-violet-900/40 to-amber-900/30 border border-violet-500/30'
                : 'bg-gradient-to-br from-violet-600/15 to-amber-500/10 hover:from-violet-600/25 hover:to-amber-500/20'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#050507]/80 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {['home', 'about', 'services', 'portfolio', 'contact'].map(item => (
          <button 
            key={item} 
            onClick={() => scrollTo(item)}
            className="text-3xl font-bold text-white hover:text-violet-400 transition-colors capitalize"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute top-[20%] -left-20 w-[30rem] h-[30rem] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] -right-20 w-[30rem] h-[30rem] bg-amber-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Available for opportunities</span>
            </div>
            <h2 className="text-xl text-gray-400 font-medium mb-4">Hello, I'm</h2>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white block">Abhinav</span>
              <span className="gradient-text">Mamidi</span>
            </h1>
            <div className="h-12 flex items-center text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-8">
              <span>{typedText}</span>
              <span className="w-1 h-8 bg-violet-400 ml-1 animate-pulse" />
            </div>
            <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
              Passionate about creating innovative solutions through code. I blend creativity 
              with technical expertise to build impactful applications that solve real-world problems.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => scrollTo('contact')} className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-bold flex items-center gap-2 shadow-xl shadow-violet-600/30 transition-all hover:scale-105 active:scale-95">
                <MessageCircle size={20} /> Get in Touch
              </button>
              <a href="/resume.pdf" download className="px-8 py-4 glass-card hover:bg-white/5 text-white rounded-full font-bold flex items-center gap-2 border border-white/10 transition-all hover:scale-105 active:scale-95">
                <Download size={20} /> Download Resume
              </a>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Github, link: "https://github.com/Imabhinavvv" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/abhinav-mamidi-in" },
                { icon: Mail, link: "mailto:abhinavmamidi.mails@gmail.com" }
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all hover:scale-110">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="relative group flex justify-center mt-12 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-amber-600/20 blur-[60px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white/5 shadow-2xl animate-float">
               <img src="https://picsum.photos/600/600" alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating Badges */}
            <div className="absolute top-10 right-4 md:right-10 px-6 py-3 glass-card rounded-2xl shadow-xl animate-float delay-100 border border-white/10">
              <span className="text-xl font-bold text-white">6+</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Projects Done</p>
            </div>
            <div className="absolute bottom-10 left-4 md:left-10 px-6 py-3 glass-card rounded-2xl shadow-xl animate-float delay-500 border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="text-sm font-bold text-white">AI / ML Expert</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1 px-4 sm:px-0">
             <div className="glass-card rounded-[2rem] p-10 border border-white/10 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Code size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Coding Stats</h4>
                    <p className="text-sm text-gray-500">My technical landscape</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "6+", label: "Projects" },
                    { val: "10+", label: "Technologies" },
                    { val: "10K+", label: "Code Lines" },
                    { val: "∞", label: "Learning" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all group">
                      <h3 className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform origin-left">{stat.val}</h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
             </div>
             {/* Decorative Skills Bubbles */}
             <div className="absolute -top-4 right-0 sm:-top-6 sm:-right-6 px-6 py-4 glass-card rounded-2xl border border-white/20 flex items-center gap-3 animate-float shadow-2xl z-20">
                <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center"><Brain size={20} /></div>
                <span className="font-bold">AI Enthusiast</span>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-violet-400 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">About Me</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Aspiring <span className="gradient-text">Full-Stack Developer</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I'm a dedicated software developer with a passion for creating efficient, 
              scalable solutions. My journey in technology spans multiple programming 
              languages and frameworks, with expertise in both frontend and backend development.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SkillBadge color="blue" label="C / C++" />
              <SkillBadge color="yellow" label="Python" />
              <SkillBadge color="orange" label="Java" />
              <SkillBadge color="indigo" label="R Lang" />
              <SkillBadge color="violet" label="Web Dev" />
              <SkillBadge color="green" label="Android" />
              <SkillBadge color="pink" label="AI / ML" />
              <SkillBadge color="amber" label="Data Analysis" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#08080D]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-violet-400 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">What I Do</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Expert <span className="gradient-text">Services</span></h2>
            <p className="text-gray-500 text-lg">Specialized in creating digital experiences that combine aesthetics with functionality.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, i) => {
              const Icon = IconMap[service.icon];
              return (
                <div key={i} className="group p-10 glass-card rounded-[2.5rem] border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${service.color}-500/10 blur-[60px] rounded-full transition-all group-hover:scale-150`} />
                  <div className={`w-16 h-16 bg-gradient-to-br from-${service.color}-600 to-${service.color}-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl group-hover:rotate-6 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-10">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} className="flex items-center gap-2 text-violet-400 font-bold group-hover:gap-4 transition-all">
                    <span></span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-xl">
              <span className="text-violet-400 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Featured <span className="gradient-text">Projects</span></h2>
              <p className="text-gray-500 text-lg">Showcasing technical skills through real-world applications and experimental builds.</p>
            </div>
            
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 self-start overflow-x-auto max-w-full no-scrollbar">
              {['all', 'ai-ml', 'web', 'mobile'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as Category)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  {tab === 'ai-ml' ? 'AI/ML' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const Icon = IconMap[project.icon];
              return (
                <div key={project.id} className="group glass-card rounded-3xl border border-white/5 overflow-hidden hover:border-violet-500/30 transition-all duration-500">
                  <div className={`h-52 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center p-12 overflow-hidden`}>
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:16px_16px]" />
                     <div className="relative z-10 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                       {Icon && <Icon size={64} />}
                     </div>
                     <div className="absolute top-4 left-4 px-3 py-1 glass-card rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                       {project.category === 'ai-ml' ? 'AI / ML' : project.category}
                     </div>
                     {project.featured && (
                       <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                         Featured
                       </div>
                     )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-gray-500 border border-white/10 px-2 py-1 rounded-md bg-white/5">{tag}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" className="flex items-center justify-between text-sm font-bold text-violet-400 hover:text-white transition-colors">
                      <span>View Case Study</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#08080D] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-violet-600/5 blur-[150px] rounded-full" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-violet-400 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Let's <span className="gradient-text">Collaborate</span></h2>
            <p className="text-gray-500 text-lg">Have a project in mind or want to collaborate? Feel free to reach out!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">Let's create something amazing together</h3>
              {[
                { label: "Email", val: "abhinavmamidi.mails@gmail.com", icon: Mail, color: "violet", link: "mailto:abhinavmamidi.mails@gmail.com" },
                { label: "Phone", val: "+91 8500078108", icon: Phone, color: "amber", link: "tel:+918500078108" },
                { label: "LinkedIn", val: "abhinav-mamidi-in", icon: Linkedin, color: "indigo", link: "https://www.linkedin.com/in/abhinav-mamidi-in" }
              ].map((item, i) => (
                <a key={i} href={item.link} className="flex items-center gap-6 p-6 glass-card rounded-2xl border border-white/5 hover:border-violet-500/30 hover:translate-x-3 transition-all group">
                  <div className={`w-14 h-14 bg-gradient-to-br from-${item.color}-600/20 to-${item.color}-500/10 rounded-xl flex items-center justify-center text-${item.color}-400 border border-${item.color}-500/20`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-violet-400 transition-colors">{item.val}</p>
                  </div>
                  <ArrowUpRight size={20} className="text-gray-600 group-hover:text-violet-400 transition-colors" />
                </a>
              ))}
              
              <div className="pt-10">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Socials</p>
                <div className="flex gap-4">
                   <a href="https://github.com/Imabhinavvv" className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Github size={20} /></a>
                   <a href="https://www.linkedin.com/in/abhinav-mamidi-in" className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Linkedin size={20} /></a>
                   <a href="mailto:abhinavmamidi.mails@gmail.com" className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Mail size={20} /></a>
                </div>
              </div>
            </div>

            <div className="glass-card w-full max-w-full p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[60px] rounded-full" />
               <form
                 className="space-y-6 relative z-10"
                 onSubmit={async (e) => {
                   e.preventDefault();
                   if (formStatus === 'sending') return;
                   setFormStatus('sending');
                   setFormMessage('');

                   const form = e.currentTarget;
                   const formData = new FormData(form);

                   try {
                     const res = await fetch('https://formspree.io/f/mbdalnkw', {
                       method: 'POST',
                       headers: { Accept: 'application/json' },
                       body: formData
                     });

                     if (res.ok) {
                       form.reset();
                       setFormStatus('sent');
                       setFormMessage('Cool, thanks for keeping me in the loop.');
                     } else {
                       const data = await res.json().catch(() => null);
                       setFormStatus('error');
                       setFormMessage(data?.error || 'Something went wrong. Please try again.');
                     }
                   } catch {
                     setFormStatus('error');
                     setFormMessage('Network error. Please try again.');
                   }
                 }}
               >
                  <input type="hidden" name="_subject" value="New portfolio contact form submission" />
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Tell me about your project..."
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold py-5 rounded-xl shadow-xl shadow-violet-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  {formMessage && (
                    <p className={`text-sm font-medium ${formStatus === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {formMessage}
                    </p>
                  )}
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Abhinav Mamidi. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by Abhinav</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
