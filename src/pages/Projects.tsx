import { useEffect, useState } from 'react';

function Projects() {
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

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Full-stack e-commerce platform with payment integration, inventory management, and real-time analytics.",
      image: "/assets/project1.jpg",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/naufalandriana",
      demo: "https://demo.com",
      icon: "ph-shopping-cart"
    },
    {
      title: "Network Monitoring System",
      category: "Networking",
      description: "Real-time network monitoring dashboard with automated alerts and performance analytics using SNMP.",
      image: "/assets/project2.jpg",
      tech: ["Python", "Flask", "Grafana", "SNMP"],
      github: "https://github.com/naufalandriana",
      demo: null,
      icon: "ph-monitor"
    },
    {
      title: "Portfolio Website",
      category: "Web Development",
      description: "Modern portfolio website with dark mode, smooth animations, and responsive design.",
      image: "/assets/project3.jpg",
      tech: ["React", "TypeScript", "Tailwind", "Vite"],
      github: "https://github.com/naufalandriana",
      demo: "https://demo.com",
      icon: "ph-layout"
    },
    {
      title: "MikroTik VPN Server Setup",
      category: "Networking",
      description: "Secure VPN infrastructure with MikroTik RouterOS, supporting multiple protocols and user management.",
      image: "/assets/project4.jpg",
      tech: ["MikroTik", "Wireguard", "IPSec", "L2TP"],
      github: "https://github.com/naufalandriana/MikroTik-VPN",
      demo: null,
      icon: "ph-lock"
    },
    {
      title: "Task Management App",
      category: "Web Development",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      image: "/assets/project5.jpg",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Socket.io"],
      github: "https://github.com/naufalandriana",
      demo: "https://demo.com",
      icon: "ph-check-square"
    },
    {
      title: "Enterprise Network Design",
      category: "Networking",
      description: "Complete network infrastructure design for enterprise with VLAN segmentation and redundancy.",
      image: "/assets/project6.jpg",
      tech: ["Cisco", "VLAN", "OSPF", "HSRP"],
      github: null,
      demo: null,
      icon: "ph-network"
    }
  ];

  const categories = ['All', 'Web Development', 'Networking'];

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
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              A collection of my work in web development and network engineering
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-accent text-white glow-effect'
                    : 'bg-tertiary border border-border text-gray-400 hover:border-accent hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={index}
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
                    {project.category}
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
              <p className="text-xl text-gray-400">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;