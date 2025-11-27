import { useEffect, useState } from 'react';
import AOS from 'aos';

const Resume = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'competition'>('work');
  const [showCVPreview, setShowCVPreview] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles-resume');
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

    return () => {
      const particlesContainer = document.getElementById('particles-resume');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  const handleDownloadCV = () => {
    // Direct download tanpa preview
    const link = document.createElement('a');
    link.href = '/assets/cv/cv-ind.pdf';
    link.download = 'CV_Naufal-Andriana.pdf'; // Ganti dengan nama file yang diinginkan
    link.click();
  };

  const handlePreviewCV = () => {
    setShowCVPreview(true);
  };

  const closeCVPreview = () => {
    setShowCVPreview(false);
  };

  return (
    <main className="pt-24 pb-16 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-success/10 rounded-full blur-3xl floating-element"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }}
        ></div>
        
        {/* Floating Particles */}
        <div className="particles-container" id="particles-resume"></div>
      </div>
      
      {/* CV Preview Modal */}
      {showCVPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-secondary rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-xl font-semibold">Preview Resume</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadCV}
                  className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <i className="ph ph-download-simple"></i>
                  Download
                </button>
                <button
                  onClick={closeCVPreview}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <i className="ph ph-x"></i>
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <iframe 
                src="/assets/cv/cv-ind.pdf" 
                className="w-full h-full rounded-lg border border-border"
                title="CV Preview"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Network engineer specialized in MikroTik, Cisco, and cloud technologies
          </p>
        </div>

        {/* Experience Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl font-bold">Experience</h2>
            <button 
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 glow-effect hover:-translate-y-1"
              onClick={handlePreviewCV}
            >
              <i className="ph ph-eye"></i>
              Preview Resume
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="bg-secondary rounded-2xl p-2 mb-10 flex flex-col sm:flex-row gap-2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <button 
              className={`tab-btn flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'work' ? 'bg-accent text-white' : 'bg-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('work')}
            >
              <i className="ph ph-briefcase"></i> Work Experience
            </button>
            <button 
              className={`tab-btn flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'competition' ? 'bg-accent text-white' : 'bg-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('competition')}
            >
              <i className="ph ph-trophy"></i> Competitions
            </button>
          </div>

          {/* Work Experience Tab */}
          {activeTab === 'work' && (
            <div className="relative">
              {/* Timeline Line - Always on left */}
              <div className="absolute left-2 md:left-2 top-0 bottom-0 w-0.5 bg-accent/30 z-0"></div>
              
              <div className="space-y-8 relative">
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        May - June 2023
                      </div>
                      <h3 className="text-xl font-semibold mb-2">MikroTik Trainer</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-buildings"></i>
                        IDN Mengajar
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        SMK Wikrama Garut, West Java
                      </div>
                      <p className="text-gray-400">
                        Trained teachers to become MikroTik Academy members, covering MTCNA and MTCRE certification materials.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        August 2024 - July 2025
                      </div>
                      <h3 className="text-xl font-semibold mb-2">IT Infrastructure Intern</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-buildings"></i>
                        MCS Corp
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        Cibubur, West Java
                      </div>
                      <p className="text-gray-400">
                        IT Infrastructure Intern at PT MCS Corp. Handling servers, networks, and creating app monitoring backup databases.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        September 2025 - Present
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Freelance Fullstack Developer</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-buildings"></i>
                        Beaulytics
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        Freelance
                      </div>
                      <p className="text-gray-400">
                        Focus on product database management and web application development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Competition Tab */}
          {activeTab === 'competition' && (
            <div className="relative">
              {/* Timeline Line - Always on left */}
              <div className="absolute left-2 md:left-2 top-0 bottom-0 w-0.5 bg-accent/30 z-0"></div>
              
              <div className="space-y-8 relative">
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        July 2023
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Finalist</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-trophy"></i>
                        E-TIME Competition
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        Politeknik Negeri Jakarta
                      </div>
                      <p className="text-gray-400">
                        Competed in networking branch and qualified for the final round.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        October 2023
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Finalist</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-trophy"></i>
                        ELINATION Competition
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        Universitas Negeri Yogyakarta
                      </div>
                      <p className="text-gray-400">
                        Successfully configured network topology to qualify as finalist.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        October 2023
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Participant</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-shield-check"></i>
                        National Cyber Security Connected
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        Menara Bidakara, Jakarta
                      </div>
                      <p className="text-gray-400">
                        Attended cybersecurity event organized by BSSN, Nagayana Indonesia, and APTIKNAS.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Timeline Dot - Centered vertically with card */}
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        October 2023
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Participant</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-trophy"></i>
                        INTEGER Competition
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        Undiksha University, Bali
                      </div>
                      <p className="text-gray-400">
                        Network analysis and configuration using Cisco Packet Tracer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center" data-aos="fade-up" data-aos-duration="800">Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MikroTik Skills */}
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-gear-six"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">MikroTik</h3>
                  <p className="text-accent text-sm font-medium">MTCNA & MTCRE</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Network Associate & Routing Engineer certified with expertise in network configuration, routing protocols, and infrastructure management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">OSPF</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Load Balancing</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Firewall & NAT</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">VPN</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Wireguard</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">VLAN</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Wireless</span>
              </div>
            </div>

            {/* Cisco Skills */}
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-network"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Cisco</h3>
                  <p className="text-accent text-sm font-medium">CCNA ITNv7</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Cisco Certified Network Associate with comprehensive knowledge in routing, switching, and network fundamentals.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">EIGRP</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">BGP</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">ACL</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Inter-VLAN</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">IPv6</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Switching</span>
              </div>
            </div>

            {/* Linux Skills */}
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-linux-logo"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Linux</h3>
                  <p className="text-accent text-sm font-medium">Ubuntu</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Able to manage Linux servers, run basic commands, and deploy apps using LAMP or NGINX.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Command Line</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">LAMP Stack</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">NGINX</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Server Setup</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Web Deployment</span>
              </div>
            </div>

            {/* Frontend Skills */}
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-browser"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Frontend</h3>
                  <p className="text-accent text-sm font-medium">Web Development</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Skilled in building modern websites using HTML, React, Tailwind CSS, and basic JavaScript. Capable of creating creative AI-assisted web designs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">HTML</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">React</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Tailwind</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">JavaScript</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">AI Web Design</span>
              </div>
            </div>

            {/* Backend Skills */}
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="400">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-database"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Backend</h3>
                  <p className="text-accent text-sm font-medium">Web Development</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Skilled in backend development using PHP, MySQL, and Supabase. Experienced in deploying and hosting web applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">PHP</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">MySQL</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Supabase</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">XAMPP</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Hosting</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">API</span>
              </div>
            </div>

            {/* Unifi Skills */}
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-number-circle-zero"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Unifi</h3>
                  <p className="text-accent text-sm font-medium">Access Point</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Experienced in resetting, configuring, and managing UniFi Access Points during internship.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">UniFi Controller</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Access Point</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Reconfiguration</span>
                <span className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">Network Setup</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center" data-aos="fade-up" data-aos-duration="800">Education</h2>
          
          <div className="space-y-6">
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="fade-up" data-aos-duration="800">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-3xl flex-shrink-0">
                  <i className="ph ph-book-open-text"></i>
                </div>
                <div className="flex-1">
                  <div className="text-accent text-sm font-semibold mb-2">2022 - 2025</div>
                  <h3 className="text-xl font-semibold mb-2">Network Engineering</h3>
                  <div className="text-gray-400 mb-2">SMK IDN Boarding School</div>
                  <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                    <i className="ph ph-map-pin"></i>
                    Pamijahan, Bogor
                  </div>
                  <p className="text-gray-400">
                    Specialized in network infrastructure and administration with hands-on experience in MikroTik, Cisco, and AWS technologies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-3xl flex-shrink-0">
                  <i className="ph ph-graduation-cap"></i>
                </div>
                <div className="flex-1">
                  <div className="text-accent text-sm font-semibold mb-2">2025 - Present</div>
                  <h3 className="text-xl font-semibold mb-2">Computer Engineering</h3>
                  <div className="text-gray-400 mb-2">Faculty of Engineering, Jenderal Soedirman University</div>
                  <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                    <i className="ph ph-map-pin"></i>
                    Purbalingga, Central Java
                  </div>
                  <p className="text-gray-400">
                    First-year student learning programming fundamentals in C++ and Python, with a growing interest in networking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resume;