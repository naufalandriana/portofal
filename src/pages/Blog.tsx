import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';

interface Post {
  slug: any;
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
}

const Blog = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    AOS.refresh();

    // Logic Toast Bahasa
    const currentLang = i18n.language && i18n.language.startsWith('en') ? 'en' : 'id';
    if (currentLang === 'en') {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }

    // Logic Particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      particlesContainer.innerHTML = '';
      
      const particleCount = 15;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
    
    // Panggil fetch langsung
    fetchPosts();
  }, [i18n.language]);

  const fetchPosts = async () => {
    // Mulai loading (hanya visual indikator, tanpa delay buatan)
    setLoading(true);
    
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title, excerpt, created_at')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    // Langsung matikan loading setelah data didapat
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-success/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-element"></div>
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }}
        ></div>
        <div className="absolute inset-0" id="particles"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Blog <span className="gradient-text">Saya</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Sharing seputar web development dan jaringan
          </p>
        </div>

        {/* LOADING STATE - Spinner Minimalis */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <i className="ph ph-spinner text-4xl text-accent animate-spin mb-4"></i>
            <p className="text-gray-400 text-sm">Memuat artikel...</p>
          </div>
        ) : (
          /* DATA LOADED */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link 
                to={`/blog/${post.slug}`} 
                key={post.slug}
                className="bg-secondary border border-border rounded-2xl overflow-hidden hover:border-accent hover:-translate-y-2 transition-all duration-300 group relative"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="p-6 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-tertiary border border-border rounded-full px-3 py-1 text-xs font-medium text-accent mb-4">
                    <i className="ph ph-calendar-blank"></i>
                    {new Date(post.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-accent text-sm font-medium">
                    Baca Selengkapnya <i className="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && posts.length === 0 && (
            <div className="text-center py-20" data-aos="fade-up">
              <i className="ph ph-pencil-slash text-6xl text-gray-600 mb-4"></i>
              <p className="text-xl text-gray-400">Belum ada artikel nih.</p>
            </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 md:bottom-8 inset-x-4 md:inset-x-auto md:right-8 z-50 animate-slide-up">
          <div className="bg-secondary border border-accent/50 rounded-xl px-6 py-4 shadow-2xl backdrop-blur-md flex items-center gap-4 md:min-w-[320px]">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <i className="ph ph-info text-accent text-xl"></i>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm mb-1">Oppss..! English Not Available</p>
              <p className="text-gray-400 text-xs">This page is only available in Indonesian</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <i className="ph ph-x text-lg"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;