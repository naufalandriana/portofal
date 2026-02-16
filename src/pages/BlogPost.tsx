import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlockRenderer } from '../components/BlockRenderer';
import AOS from 'aos';

const BlogPost = () => {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isLightMode, setIsLightMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const OuterBackground = useMemo(() => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0" id="particles-blog"></div>
      </div>
    );
  }, []); 

  useEffect(() => {
    // 1. Inisialisasi AOS
    AOS.init({
      duration: 800,
      once: true,
    });

    // 2. LOGIKA KRUSIAL: Hapus atribut data-aos setelah animasi awal selesai
    // Ini biar pas ganti tema/full screen, AOS nggak "bangun" lagi.
    const timer = setTimeout(() => {
      const animatedElement = document.querySelector('[data-aos]');
      if (animatedElement) {
        animatedElement.removeAttribute('data-aos');
      }
    }, 1000); // 1 detik cukup untuk animasi fade-up awal selesai

    const createParticles = () => {
      const particlesContainer = document.getElementById('particles-blog');
      if (!particlesContainer || particlesContainer.childElementCount > 0) return;
      const particleCount = 10; 
      const fragment = document.createDocumentFragment(); 
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`; 
        fragment.appendChild(particle);
      }
      particlesContainer.appendChild(fragment);
    };

    requestAnimationFrame(createParticles);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return; 
      setLoading(true);
      setErrorMsg('');
      try {
        const { data, error } = await supabase
            .from('posts')
            .select('id, title, content, created_at, slug') 
            .eq('slug', slug) 
            .single();
        if (error) throw error;
        if (!data) throw new Error('Artikel tidak ditemukan.');
        setPost(data);
      } catch (err: any) {
        setErrorMsg('Artikel tidak ditemukan atau link salah.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]); 

  if (loading) {
    return (
      <div className="min-h-screen pt-32 relative font-poppins">
         {OuterBackground}
         <div className="max-w-4xl mx-auto px-6 relative z-10 animate-pulse">
            <div className="flex justify-between mb-8">
                <div className="h-10 w-24 bg-gray-700/30 rounded-full"></div>
                <div className="flex gap-2">
                    <div className="h-10 w-20 bg-gray-700/30 rounded-full"></div>
                    <div className="h-10 w-20 bg-gray-700/30 rounded-full"></div>
                </div>
            </div>
            <div className="bg-[#0B0F19]/50 border border-white/10 rounded-3xl p-12 h-[600px]">
                <div className="w-32 h-6 bg-gray-700/50 rounded-full mx-auto mb-8"></div>
                <div className="w-3/4 h-12 bg-gray-700/50 rounded-lg mx-auto mb-16"></div>
                <div className="space-y-4">
                    <div className="w-full h-4 bg-gray-700/30 rounded"></div>
                    <div className="w-full h-4 bg-gray-700/30 rounded"></div>
                    <div className="w-2/3 h-4 bg-gray-700/30 rounded"></div>
                </div>
            </div>
         </div>
      </div>
    );
  }

  if (errorMsg || !post) return (
    <div className="min-h-screen pt-32 text-center relative">
        {OuterBackground}
        <div className="relative z-10 bg-secondary/80 inline-block p-8 rounded-2xl border border-red-500/30 backdrop-blur-md">
            <p className="text-red-400 mb-4">{errorMsg || 'Data kosong'}</p>
            <button onClick={() => navigate('/blog')} className="bg-accent px-4 py-2 rounded-lg text-white hover:bg-accent/80 transition">Back to Blog</button>
        </div>
    </div>
  );

  const content = post.content || {};
  const blocks = content.blocks || [];

  return (
    <div className={`min-h-screen relative font-poppins ${isFullScreen ? 'overflow-hidden' : ''}`}>
      
      {!isFullScreen && OuterBackground}

      <div className={`
        ${isFullScreen 
            ? `fixed inset-0 z-[100] overflow-y-auto ${isLightMode ? 'bg-white' : 'bg-[#0B0F19]'}` 
            : 'max-w-4xl mx-auto py-24 px-4 sm:px-6 relative z-10'
        }
      `}>
        
        <div className={`
            flex justify-between items-center 
            ${isFullScreen 
                ? `sticky top-0 z-[110] px-4 py-4 md:px-12 backdrop-blur-md border-b ${isLightMode ? 'bg-white/80 border-gray-200' : 'bg-[#0B0F19]/80 border-white/10'}` 
                : 'mb-8 px-2'
            }
        `}>
            <button 
              onClick={() => navigate('/blog')} 
              className={`flex items-center gap-2 group ${isLightMode ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'}`}
            >
               <i className="ph ph-arrow-left group-hover:-translate-x-1 transition-transform"></i>
               <span className="hidden sm:inline">Kembali</span>
            </button>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsLightMode(!isLightMode)}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border
                        ${isLightMode 
                            ? 'bg-gray-100 text-gray-900 border-gray-300' 
                            : 'bg-[#0B0F19]/50 text-gray-300 border-white/20 hover:border-accent hover:text-accent'
                        }
                    `}
                >
                    {isLightMode ? <i className="ph-fill ph-cloud-moon text-accent text-lg"></i> : <i className="ph-fill ph-cloud-sun text-yellow-500 text-lg"></i>}
                    <span className="text-sm font-medium hidden sm:inline">{isLightMode ? 'Dark' : 'Light'}</span>
                </button>

                <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className={`
                        flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full border
                        ${isLightMode 
                            ? 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200' 
                            : 'bg-[#0B0F19]/50 text-gray-300 border-white/20 hover:border-accent hover:text-accent'
                        }
                    `}
                >
                    {isFullScreen ? (
                         <>
                            <i className="ph ph-arrows-in-simple text-lg"></i>
                            <span className="text-sm font-medium hidden sm:inline ml-2">Exit</span>
                         </>
                    ) : (
                        <>
                            <i className="ph ph-arrows-out-simple text-lg"></i>
                            <span className="text-sm font-medium hidden sm:inline ml-2">Full</span>
                        </>
                    )}
                </button>
            </div>
        </div>

        <article 
            data-aos="fade-up"
            className={`
                relative
                ${isFullScreen 
                    ? 'shadow-none border-none max-w-4xl mx-auto min-h-screen' 
                    : `rounded-3xl shadow-2xl overflow-hidden border ${isLightMode ? 'bg-white border-white' : 'bg-[#0B0F19] border-white/10'}`
                }
                ${isLightMode ? 'text-gray-900' : 'text-white'}
            `}
        >
            {!isLightMode && !isFullScreen && (
                <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/5 blur-[50px] rounded-full pointer-events-none"></div>
                </>
            )}

            <div className={`px-6 py-12 md:px-12 md:py-16 relative z-10 ${isFullScreen ? 'pt-8' : ''}`}>
                <header className={`mb-12 text-center border-b pb-10 ${isLightMode ? 'border-gray-200' : 'border-white/5'}`}>
                    <div className={`
                        inline-block px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6
                        ${isLightMode 
                            ? 'bg-gray-100 border-gray-300 text-gray-600' 
                            : 'bg-secondary border-white/5 text-accent'
                        }
                    `}>
                        {new Date(post.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                    </div>
                    
                    <h1 className={`text-3xl md:text-5xl font-bold leading-tight mb-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                        {post.title}
                    </h1>
                </header>

                <div className="max-w-none prose prose-invert">
                    {blocks.map((block: any, index: number) => (
                        <BlockRenderer 
                           key={block.id || index} 
                           block={block} 
                           isLightMode={isLightMode} 
                        />
                    ))}
                </div>
            </div>
        </article>

      </div>
    </div>
  );
};

export default BlogPost;
