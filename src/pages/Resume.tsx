import { useEffect, useState } from 'react';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';

const Resume = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'work' | 'competition'>('work');
  const [showCVPreview, setShowCVPreview] = useState(false);

  // Logic dinamis: Cek bahasa + Tambahkan parameter agar Fit to Width di mobile
  const baseCvFile = i18n.language === 'en' ? '/assets/cv/cv-eng.pdf' : '/assets/cv/cv-ind.pdf';
  // #view=FitH memaksa PDF menyesuaikan lebar container
  const cvFile = `${baseCvFile}#view=FitH`;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

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
    const link = document.createElement('a');
    link.href = baseCvFile; // Download file murni tanpa parameter view
    link.download = 'CV_Naufal-Andriana.pdf';
    link.click();
  };

  const handleOpenNewTab = () => {
    window.open(baseCvFile, '_blank');
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
        
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }}
        ></div>
        
        <div className="particles-container" id="particles-resume"></div>
      </div>
      
      {/* CV Preview Modal */}
      {showCVPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-secondary rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex flex-wrap gap-2 justify-between items-center p-4 border-b border-border bg-secondary/95 backdrop-blur rounded-t-2xl">
              <h3 className="text-xl font-semibold hidden sm:block">{t('resume.modal.title')}</h3>
              
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {/* Tombol Open New Tab (Sangat penting untuk Mobile) */}
                <button
                  onClick={handleOpenNewTab}
                  className="bg-tertiary hover:bg-white/10 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border border-border"
                  title="Open in new tab (Recommended for Mobile)"
                >
                  <i className="ph ph-arrow-square-out"></i>
                  <span className="text-sm">Full View</span>
                </button>

                <button
                  onClick={handleDownloadCV}
                  className="bg-accent hover:bg-accent-hover text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <i className="ph ph-download-simple"></i>
                  <span className="hidden sm:inline">{t('resume.modal.download')}</span>
                </button>
                
                <button
                  onClick={closeCVPreview}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <i className="ph ph-x"></i>
                </button>
              </div>
            </div>

            {/* Modal Body - Iframe Container */}
            <div className="flex-1 p-2 sm:p-4 bg-tertiary/20 overflow-hidden relative">
              {/* Pesan Fallback untuk Mobile jika iframe bermasalah */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 z-0 pointer-events-none">
                <p>Loading Preview...</p>
              </div>

              <iframe 
                src={cvFile} 
                className="w-full h-full rounded-lg border border-border relative z-10 bg-white"
                title="CV Preview"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
            {/* Footer hint for mobile users */}
            <div className="p-2 text-center text-xs text-gray-500 sm:hidden bg-secondary rounded-b-2xl">
              Jika preview terpotong, gunakan tombol "Full View" di atas.
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
            {t('resume.titleMy')} <span className="gradient-text">{t('resume.titleResume')}</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('resume.subtitle')}
          </p>
        </div>

        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl font-bold">{t('resume.experience.title')}</h2>
            <button 
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 glow-effect hover:-translate-y-1"
              onClick={handlePreviewCV}
            >
              <i className="ph ph-eye"></i>
              {t('resume.experience.previewResume')}
            </button>
          </div>
          
          <div className="bg-secondary rounded-2xl p-2 mb-10 flex flex-col sm:flex-row gap-2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <button 
              className={`tab-btn flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'work' ? 'bg-accent text-white' : 'bg-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('work')}
            >
              <i className="ph ph-briefcase"></i>
              {t('resume.experience.tabs.work.label')}
            </button>
            <button 
              className={`tab-btn flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'competition' ? 'bg-accent text-white' : 'bg-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('competition')}
            >
              <i className="ph ph-trophy"></i>
              {t('resume.experience.tabs.competition.label')}
            </button>
          </div>

          {activeTab === 'work' && (
             <div className="relative">
               <div className="absolute left-2 md:left-2 top-0 bottom-0 w-0.5 bg-accent/30 z-0"></div>
               <div className="space-y-8 relative">
                 <div className="timeline-item" data-aos="fade-up" data-aos-duration="800">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.items.trainer.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.items.trainer.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-buildings"></i>
                        {t('resume.experience.items.trainer.company')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.items.trainer.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.items.trainer.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.items.intern.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.items.intern.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-buildings"></i>
                        {t('resume.experience.items.intern.company')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.items.intern.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.items.intern.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.items.freelance.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.items.freelance.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-buildings"></i>
                        {t('resume.experience.items.freelance.company')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.items.freelance.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.items.freelance.description')}
                      </p>
                    </div>
                  </div>
                </div>
               </div>
             </div>
          )}

          {activeTab === 'competition' && (
             <div className="relative">
               <div className="absolute left-2 md:left-2 top-0 bottom-0 w-0.5 bg-accent/30 z-0"></div>
               <div className="space-y-8 relative">
                 <div className="timeline-item" data-aos="fade-up" data-aos-duration="800">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.competitions.etime.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.competitions.etime.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-trophy"></i>
                        {t('resume.experience.competitions.etime.event')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.competitions.etime.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.competitions.etime.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.competitions.elination.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.competitions.elination.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-trophy"></i>
                        {t('resume.experience.competitions.elination.event')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.competitions.elination.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.competitions.elination.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.competitions.cybersecurity.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.competitions.cybersecurity.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-shield-check"></i>
                        {t('resume.experience.competitions.cybersecurity.event')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.competitions.cybersecurity.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.competitions.cybersecurity.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="timeline-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-lg"></div>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2 flex-1">
                      <div className="text-accent text-sm font-semibold mb-2 flex items-center gap-2">
                        <i className="ph ph-calendar"></i>
                        {t('resume.experience.competitions.integer.date')}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t('resume.experience.competitions.integer.title')}</h3>
                      <div className="text-gray-400 mb-2 flex items-center gap-2">
                        <i className="ph ph-trophy"></i>
                        {t('resume.experience.competitions.integer.event')}
                      </div>
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <i className="ph ph-map-pin"></i>
                        {t('resume.experience.competitions.integer.location')}
                      </div>
                      <p className="text-gray-400">
                        {t('resume.experience.competitions.integer.description')}
                      </p>
                    </div>
                  </div>
                </div>
               </div>
             </div>
          )}
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center" data-aos="fade-up" data-aos-duration="800">
            {t('resume.skills.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-gear-six"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('resume.skills.mikrotik.title')}</h3>
                  <p className="text-accent text-sm font-medium">{t('resume.skills.mikrotik.certification')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('resume.skills.mikrotik.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(t('resume.skills.mikrotik.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-network"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('resume.skills.cisco.title')}</h3>
                  <p className="text-accent text-sm font-medium">{t('resume.skills.cisco.certification')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('resume.skills.cisco.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(t('resume.skills.cisco.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-linux-logo"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('resume.skills.linux.title')}</h3>
                  <p className="text-accent text-sm font-medium">{t('resume.skills.linux.certification')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('resume.skills.linux.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(t('resume.skills.linux.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-browser"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('resume.skills.frontend.title')}</h3>
                  <p className="text-accent text-sm font-medium">{t('resume.skills.frontend.certification')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('resume.skills.frontend.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(t('resume.skills.frontend.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="400">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-database"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('resume.skills.backend.title')}</h3>
                  <p className="text-accent text-sm font-medium">{t('resume.skills.backend.certification')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('resume.skills.backend.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(t('resume.skills.backend.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl">
                  <i className="ph ph-number-circle-zero"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('resume.skills.unifi.title')}</h3>
                  <p className="text-accent text-sm font-medium">{t('resume.skills.unifi.certification')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('resume.skills.unifi.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(t('resume.skills.unifi.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-tertiary border border-border text-gray-400 text-xs rounded-lg transition-all duration-300 hover:border-accent hover:text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-10 text-center" data-aos="fade-up" data-aos-duration="800">
            {t('resume.education.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-secondary border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2" data-aos="fade-up" data-aos-duration="800">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-3xl flex-shrink-0">
                  <i className="ph ph-book-open-text"></i>
                </div>
                <div className="flex-1">
                  <div className="text-accent text-sm font-semibold mb-2">
                    {t('resume.education.highschool.date')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('resume.education.highschool.title')}
                  </h3>
                  <div className="text-gray-400 mb-2">
                    {t('resume.education.highschool.school')}
                  </div>
                  <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                    <i className="ph ph-map-pin"></i>
                    {t('resume.education.highschool.location')}
                  </div>
                  <p className="text-gray-400">
                    {t('resume.education.highschool.description')}
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
                  <div className="text-accent text-sm font-semibold mb-2">
                    {t('resume.education.university.date')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('resume.education.university.title')}
                  </h3>
                  <div className="text-gray-400 mb-2">
                    {t('resume.education.university.school')}
                  </div>
                  <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                    <i className="ph ph-map-pin"></i>
                    {t('resume.education.university.location')}
                  </div>
                  <p className="text-gray-400">
                    {t('resume.education.university.description')}
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