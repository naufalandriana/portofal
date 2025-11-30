import { useEffect } from 'react';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';

function Contact() {
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
  }, []);

  return (
    <>
      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="bg-secondary border border-border rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
            {/* Background glow effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('contact.card.title')} <span className="gradient-text">{t('contact.card.titleGradient')}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-12">
              {t('contact.card.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                <a 
                  href="https://www.linkedin.com/in/naufal-andriana-90410026b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-tertiary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <i className="ph ph-linkedin-logo"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                    <p className="text-gray-400">{t('contact.card.linkedinDesc')}</p>
                  </div>
                </a>

                <a 
                  href="https://github.com/naufalandriana/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-tertiary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <i className="ph ph-github-logo"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                    <p className="text-gray-400">{t('contact.card.githubDesc')}</p>
                  </div>
                </a>
              </div>

              <a 
                href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=mr.naufalandriana@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 glow-effect hover:-translate-y-1"
                data-aos="fade-up" 
                data-aos-duration="800" 
                data-aos-delay="400"
              >
                <i className="ph ph-paper-plane-tilt text-xl"></i>
                <span className="text-lg">Hire me!</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;