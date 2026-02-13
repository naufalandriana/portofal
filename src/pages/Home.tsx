import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';

function Home() {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

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

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
      typewriterElement.style.width = '0';

      setTimeout(() => {
        typewriterElement.style.animation = 'typewriter 2s steps(20) forwards, blinkCursor 0.7s infinite';
      }, 500);
    }


    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6" data-aos="fade-right" data-aos-duration="1000">
            <div className="inline-flex items-center mt-5 gap-2 bg-tertiary border border-border rounded-full px-4 py-2 text-accent text-sm font-medium">
              <i className="ph ph-check-circle"></i>
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('hero.greeting')} <span className="gradient-text typewriter" id="typewriter-text">{t('hero.name')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-lg">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/resume" 
                className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 glow-effect hover:-translate-y-1"
              >
                <span>{t('hero.viewResume')}</span>
                <i className="ph ph-arrow-right"></i>
              </a>
              <a 
                href="/contact" 
                className="border border-border hover:border-accent bg-transparent text-gray-100 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center hover:-translate-y-1"
              >
                {t('hero.getInTouch')}
              </a>
            </div>
          </div>
          
          <div className="relative mb-5 flex justify-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Animated background glow */}
              <div className="absolute inset-0 gradient-bg rounded-3xl opacity-10 animate-pulse-glow"></div>
              
              {/* Profile image container */}
              <div className="absolute inset-2 bg-secondary border border-border rounded-2xl overflow-hidden flex items-center justify-center">
                <img src="/assets/me.jpg" alt="Muhammad Naufal Andriana" className="w-full h-full object-cover" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full opacity-20 floating-element"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-success rounded-full opacity-20 floating-element"></div>
              <div className="absolute top-1/2 -right-6 w-6 h-6 bg-accent rounded-full opacity-30 floating-element"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="text-gradient">{t('about.titleGradient')}</span>{t('about.title')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('about.subtitle')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <p className="text-lg text-gray-400 text-center mb-12">
              {t('about.description', { 
                name: t('about.name'), 
                mikrotik: t('about.mikrotik'), 
                cisco: t('about.cisco') 
              })}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-tertiary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-4">
                  <i className="ph ph-network"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('about.cards.networking.title')}</h3>
                <p className="text-gray-400">{t('about.cards.networking.description')}</p>
              </div>
              
              <div className="bg-tertiary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="100">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-4">
                  <i className="ph ph-code"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('about.cards.fullstack.title')}</h3>
                <p className="text-gray-400">{t('about.cards.fullstack.description')}</p>
              </div>
              
              <div className="bg-tertiary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-4">
                  <i className="ph ph-gear-six"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('about.cards.sysadmin.title')}</h3>
                <p className="text-gray-400">{t('about.cards.sysadmin.description')}</p>
              </div>
              
              <div className="bg-tertiary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-4">
                  <i className="ph ph-lightbulb"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('about.cards.problemSolver.title')}</h3>
                <p className="text-gray-400">{t('about.cards.problemSolver.description')}</p>
              </div>
            </div>

            <div className="mt-16 text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <div className="bg-secondary border border-border rounded-2xl p-8 md:p-12 inline-block">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('about.cta.title')}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                {t('about.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/resume" 
                  className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 glow-effect hover:-translate-y-1"
                >
                  <i className="ph ph-file-text"></i>
                  <span>{t('about.cta.viewResume')}</span>
                </a>
                <a 
                  href="https://wa.me/6282111726412?text=Haii%20Naufal%20Andriana..%20saya%20ingin%20bertanya%20sesuatu!!" 
                  target="_blank" 
                  className="inline-flex justify-center items-center gap-3 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 glow-effect hover:-translate-y-1"
                >
                  <i className="ph ph-envelope"></i>
                  <span>{t('about.cta.contactMe')}</span>
                </a>
              </div>
            </div>
          </div>
            <div className="flex justify-center gap-4 mt-12" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
              <a 
                href="https://www.linkedin.com/in/naufal-andriana-90410026b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-tertiary border border-border rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent hover:border-accent transition-all duration-300 text-xl"
              >
                <i className="ph ph-linkedin-logo"></i>
              </a>
              <a 
                href="https://github.com/naufalandriana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-tertiary border border-border rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent hover:border-accent transition-all duration-300 text-xl"
              >
                <i className="ph ph-github-logo"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
