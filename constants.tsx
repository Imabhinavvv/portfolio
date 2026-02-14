
import { Project, Service } from './types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "PPE Kit Detection",
    category: "ai-ml",
    description: "AI-powered system for detecting Personal Protective Equipment in automobile manufacturing environments.",
    icon: "Shield",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Python", "Computer Vision", "AI"],
    featured: true,
    link: "https://github.com/Imabhinavvv/ppe-kit-detection"
  },
  {
    id: 2,
    title: "AI Travel Guide",
    category: "ai-ml",
    description: "Intelligent travel companion providing personalized recommendations using ML algorithms.",
    icon: "Plane",
    gradient: "from-violet-500 to-fuchsia-500",
    tags: ["ML", "Python", "API"],
    featured: true,
    link: "https://github.com/Imabhinavvv/AI-Travel-Guide"
  },
  {
    id: 3,
    title: "Algorithm Visualizer",
    category: "web",
    description: "Visual tool for understanding algorithms with interactive animations.",
    icon: "Eye",
    gradient: "from-amber-500 to-orange-500",
    tags: ["React", "Algorithms"],
    featured: false,
    link: "https://github.com/Imabhinavvv/"
  },
  {
    id: 4,
    title: "AI Tutor",
    category: "ai-ml",
    description: "Personalized learning platform with interactive NLP-driven sessions.",
    icon: "GraduationCap",
    gradient: "from-emerald-500 to-teal-500",
    tags: ["AI", "NLP", "Education"],
    featured: true,
    link: "https://github.com/Imabhinavvv/AI-Tutor"
  },
  {
    id: 5,
    title: "Mobile App Vansh",
    category: "mobile",
    description: "Robust Android application focusing on performance and UX.",
    icon: "Smartphone",
    gradient: "from-pink-500 to-rose-500",
    tags: ["Android", "Java", "Firebase"],
    featured: false,
    link: "https://github.com/Imabhinavvv/vansh"
  },
  {
    id: 6,
    title: "AI Code Reviewer",
    category: "ai-ml",
    description: "LLM-powered tool to get feedback on code best practices.",
    icon: "Code",
    gradient: "from-indigo-500 to-blue-500",
    tags: ["AI", "Python", "Analysis"],
    featured: true,
    link: "https://github.com/Imabhinavvv/AI-Code-Reviewer"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    title: "Full-Stack Development",
    description: "Building robust web applications using modern technologies and frameworks.",
    icon: "Code",
    color: "violet",
    features: ["React & Modern JS", "Backend APIs", "Database Design", "Cloud Deployment"]
  },
  {
    title: "Mobile App Development",
    description: "Creating intuitive and performant Android applications.",
    icon: "Smartphone",
    color: "amber",
    features: ["Android Native", "UI/UX Focus", "API Integration", "Performance Optimization"]
  },
  {
    title: "Data Analysis & AI",
    description: "Transforming raw data into meaningful insights using ML and AI.",
    icon: "BarChart",
    color: "emerald",
    features: ["Machine Learning", "Data Visualization", "Statistical Analysis", "AI Solutions"]
  }
];
