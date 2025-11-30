import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  icon: string;
}

// Nilai default untuk categories (untuk filter logic)
const DEFAULT_CATEGORIES = ['All', 'Web Development', 'Networking'];

function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  const projects: Project[] = [
    {
      id: "ecommerce",
      title: t('projects.items.ecommerce.title'),
      category: "Web Development", // Tetap pakai nilai asli untuk filter
      description: t('projects.items.ecommerce.description'),
      image: "/assets/project1.jpg",
      tech: t('projects.items.ecommerce.tech', { returnObjects: true }) as string[],
      github: "https://github.com/naufalandriana",
      demo: "https://demo.com",
      icon: "ph-shopping-cart"
    },
    {
      id: "monitoring",
      title: t('projects.items.monitoring.title'),
      category: "Networking", // Tetap pakai nilai asli untuk filter
      description: t('projects.items.monitoring.description'),
      image: "/assets/project2.jpg",
      tech: t('projects.items.monitoring.tech', { returnObjects: true }) as string[],
      github: "https://github.com/naufalandriana",
      demo: null,
      icon: "ph-monitor"
    },
    {
      id: "portfolio",
      title: t('projects.items.portfolio.title'),
      category: "Web Development", // Tetap pakai nilai asli untuk filter
      description: t('projects.items.portfolio.description'),
      image: "/assets/project3.jpg",
      tech: t('projects.items.portfolio.tech', { returnObjects: true }) as string[],
      github: "https://github.com/naufalandriana",
      demo: "https://demo.com",
      icon: "ph-layout"
    },
    {
      id: "vpn",
      title: t('projects.items.vpn.title'),
      category: "Networking", // Tetap pakai nilai asli untuk filter
      description: t('projects.items.vpn.description'),
      image: "/assets/project4.jpg",
      tech: t('projects.items.vpn.tech', { returnObjects: true }) as string[],
      github: "https://github.com/naufalandriana/MikroTik-VPN",
      demo: null,
      icon: "ph-lock"
    },
    {
      id: "taskmanager",
      title: t('projects.items.taskmanager.title'),
      category: "Web Development", // Tetap pakai nilai asli untuk filter
      description: t('projects.items.taskmanager.description'),
      image: "/assets/project5.jpg",
      tech: t('projects.items.taskmanager.tech', { returnObjects: true }) as string[],
      github: "https://github.com/naufalandriana",
      demo: "https://demo.com",
      icon: "ph-check-square"
    },
    {
      id: "networkdesign",
      title: t('projects.items.networkdesign.title'),
      category: "Networking", // Tetap pakai nilai asli untuk filter
      description: t('projects.items.networkdesign.description'),
      image: "/assets/project6.jpg",
      tech: t('projects.items.networkdesign.tech', { returnObjects: true }) as string[],
      github: null,
      demo: null,
      icon: "ph-network"
    }
  ];

  // Untuk display di UI, pakai terjemahan
  const categories: string[] = t('projects.categories', { returnObjects: true }) as string[];
  
  // Untuk filter logic, pakai nilai asli
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      {/* Projects Section */}
      <section className="min-h-screen relative overflow-hidden pt-24 pb-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl floating-element"></div>
          <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-success/10 rounded-full blur-3xl floating-element"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-element"></div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', 
              backgroundSize: '50px 50px' 
            }}
          ></div>
          
          {/* Floating Particles */}
          <div className="particles-container" id="particles"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="800">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('projects.titleMy')} <span className="gradient-text">{t('projects.titleProjects')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            {DEFAULT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-accent text-white glow-effect'
                    : 'bg-tertiary border border-border text-gray-400 hover:border-accent hover:text-white'
                }`}
              >
                {categories[DEFAULT_CATEGORIES.indexOf(category)]}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-secondary border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-2 group"
                data-aos="zoom-in" 
                data-aos-duration="600" 
                data-aos-delay={index * 100}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-tertiary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-success/20 flex items-center justify-center">
                    <i className={`ph ${project.icon} text-6xl text-accent/30`}></i>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-accent hover:bg-accent-hover rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="ph ph-github-logo"></i>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-success hover:bg-success/80 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="ph ph-arrow-square-out"></i>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 bg-tertiary border border-border rounded-full px-3 py-1 text-xs font-medium text-accent mb-3">
                    <i className="ph ph-tag"></i>
                    {/* Tampilkan terjemahan category */}
                    {project.category === 'Web Development' 
                      ? categories[1] 
                      : categories[2]
                    }
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-tertiary border border-border rounded-lg text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20" data-aos="fade-up">
              <i className="ph ph-folder-open text-6xl text-gray-600 mb-4"></i>
              <p className="text-xl text-gray-400">{t('projects.noProjects')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;