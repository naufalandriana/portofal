import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Certification() {
  const { t } = useTranslation();

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

  const certifications = [
    {
      id: "mtcna",
      title: t('certifications.items.mtcna.title'),
      issuer: t('certifications.items.mtcna.issuer'),
      date: t('certifications.items.mtcna.date'),
      iconType: "image",
      icon: "/assets/logo/mikrotik-logo.svg",
      color: "accent",
      description: t('certifications.items.mtcna.description'),
      certificateLink: "https://mikrotik.com/training/certificates/c244584c75b9d6ab1526",
      status: "completed",
      details: {
        skills: t('certifications.items.mtcna.details.skills', { returnObjects: true }),
        credential: t('certifications.items.mtcna.details.credential')
      }
    },
    {
      id: "ccna",
      title: t('certifications.items.ccna.title'),
      issuer: t('certifications.items.ccna.issuer'),
      date: t('certifications.items.ccna.date'),
      iconType: "image",
      icon: "/assets/logo/cisco-logo.svg",
      color: "success",
      description: t('certifications.items.ccna.description'),
      certificateLink: "https://www.credly.com/badges/085f0ab7-9cd6-4ca1-8b38-58d104dc2595/public_url",
      status: "completed",
      details: {
        skills: t('certifications.items.ccna.details.skills', { returnObjects: true }),
        credential: t('certifications.items.ccna.details.credential')
      }
    },
    {
      id: "mtcre",
      title: t('certifications.items.mtcre.title'),
      issuer: t('certifications.items.mtcre.issuer'),
      date: t('certifications.items.mtcre.date'),
      iconType: "image",
      icon: "/assets/logo/mikrotik-logo.svg",
      color: "accent",
      description: t('certifications.items.mtcre.description'),
      certificateLink: "https://mikrotik.com/training/certificates/c249640cb60e155b1910",
      status: "completed",
      details: {
        skills: t('certifications.items.mtcre.details.skills', { returnObjects: true }),
        credential: t('certifications.items.mtcre.details.credential')
      }
    },
    {
      id: "aws",
      title: t('certifications.items.aws.title'),
      issuer: t('certifications.items.aws.issuer'),
      date: t('certifications.items.aws.date'),
      iconType: "image",
      icon: "/assets/logo/aws-logo.svg",
      color: "accent",
      description: t('certifications.items.aws.description'),
      certificateLink: "https://www.credly.com/earner/earned/badge/ddda805a-b914-4a74-b975-cc3c763c9568",
      status: "completed",
      details: {
        skills: t('certifications.items.aws.details.skills', { returnObjects: true }),
        credential: t('certifications.items.aws.details.credential')
      }
    },
    {
      id: "linux",
      title: t('certifications.items.linux.title'),
      issuer: t('certifications.items.linux.issuer'),
      date: t('certifications.items.linux.date'),
      iconType: "image",
      icon: "/assets/logo/linux-logo.svg",
      color: "accent",
      description: t('certifications.items.linux.description'),
      certificateLink: "https://apidev.agunacourse.com/media/media/certificate/AC-980-85268757-55.pdf",
      status: "completed",
      details: {
        skills: t('certifications.items.linux.details.skills', { returnObjects: true }),
        credential: t('certifications.items.linux.details.credential')
      }
    },
    {
      id: "ai",
      title: t('certifications.items.ai.title'),
      issuer: t('certifications.items.ai.issuer'),
      date: t('certifications.items.ai.date'),
      iconType: "image",
      icon: "/assets/logo/dicoding-logo.svg",
      color: "accent",
      description: t('certifications.items.ai.description'),
      certificateLink: "https://www.dicoding.com/certificates/JMZVV88R3ZN9",
      status: "completed",
      details: {
        skills: t('certifications.items.ai.details.skills', { returnObjects: true }),
        credential: t('certifications.items.ai.details.credential')
      }
    },
    {
      id: "upcoming",
      title: t('certifications.items.upcoming.title'),
      issuer: t('certifications.items.upcoming.issuer'),
      date: t('certifications.items.upcoming.date'),
      icon: "assets/logo/progres-icon.svg",
      iconType: "image",
      color: "accent",
      description: t('certifications.items.upcoming.description'),
      certificateLink: null,
      status: "in-progress",
      details: {
        skills: [],
        credential: ""
      }
    }
  ];

  return (
    <>
      {/* Certifications Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-20">
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
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('certifications.titleMy')} <span className="gradient-text">{t('certifications.titleCertifications')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('certifications.titleDescription')}
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={cert.id}
                className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 group relative overflow-hidden"
                data-aos="zoom-in" 
                data-aos-duration="600" 
                data-aos-delay={index * 100}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 ${cert.status === 'in-progress' ? 'animate-pulse' : ''}`}>
                    {cert.iconType === "image" ? (
                      <img 
                        src={cert.icon} 
                        alt={cert.title} 
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <i className={`ph ${cert.icon}`}></i>
                    )}
                  </div>

                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-medium mb-3 ${
                    cert.status === 'completed' 
                      ? 'bg-tertiary border-border text-gray-400' 
                      : 'bg-accent/10 border-accent text-accent'
                  }`}>
                    <i className={`ph ${cert.status === 'completed' ? 'ph-certificate' : 'ph-sparkle'} ${cert.status === 'completed' ? 'text-accent' : ''}`}></i>
                    {cert.date}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-accent font-medium mb-3">
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Show Certificate Button */}
                  {cert.status === 'completed' ? (
                    <a
                      href={cert.certificateLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-tertiary hover:bg-accent border border-border hover:border-accent text-gray-100 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <i className="ph ph-arrow-square-out"></i>
                      <span>{t('certifications.viewCertificate')}</span>
                    </a>
                  ) : (
                    <div className="w-full bg-gradient-to-r from-accent/10 to-success/10 border border-accent/50 text-accent px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2">
                      <i className="ph ph-hourglass-medium"></i>
                      <span>{t('certifications.inProgress')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Certification;