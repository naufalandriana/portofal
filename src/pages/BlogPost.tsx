import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlockRenderer } from '../components/BlockRenderer';
import AOS from 'aos';

const BlogPost = () => {
  // 1. GANTI 'id' JADI 'slug'
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isLightMode, setIsLightMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [animasiSelesai, setAnimasiSelesai] = useState(false);

  useEffect(() => {
    AOS.refresh();
    
    const timer = setTimeout(() => {
        setAnimasiSelesai(true);
    }, 1200);

    const createParticles = () => {
      const particlesContainer = document.getElementById('particles-blog');
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
        particlesContainer.appendChild(particle);
      }
    };
    createParticles();

    const fetchPost = async () => {
      // 2. CEK KALAU SLUG KOSONG
      if (!slug) return; 
      
      try {
        // 3. QUERY BERDASARKAN KOLOM 'slug' (Bukan 'id' lagi)
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug) 
            .single();

        if (error) throw error;
        if (!data) throw new Error('Artikel tidak ditemukan.');
        setPost(data);
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setErrorMsg('Artikel tidak ditemukan atau link salah.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => clearTimeout(timer);
  }, [slug]); // 4. DEPENDENCY ARRAY GANTI JADI SLUG

  // Background Component
  const OuterBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/10 rounded-full blur-[100px]"></div>
      <div className="absolute inset-0" id="particles-blog"></div>
    </div>
  );


  if (errorMsg || !post) return (
    <div className="min-h-screen pt-32 text-center relative">
        <OuterBackground/>
        <div className="relative z-10 bg-secondary/80 inline-block p-8 rounded-2xl border border-red-500/30 backdrop-blur-md">
            <p className="text-red-400 mb-4">{errorMsg}</p>
            <button onClick={() => navigate('/blog')} className="bg-accent px-4 py-2 rounded-lg text-white">Back to Blog</button>
        </div>
    </div>
  );

  const content = post.content || {};
  const blocks = content.blocks || [];

  return (
    <div className={`min-h-screen relative font-poppins ${isFullScreen ? 'overflow-hidden' : ''}`}>
      
      {!isFullScreen && <OuterBackground />}

      <div className={`
        ${isFullScreen 
            ? `fixed inset-0 z-[100] overflow-y-auto ${isLightMode ? 'bg-white' : 'bg-[#0B0F19]'}` 
            : 'max-w-4xl mx-auto py-24 px-4 sm:px-6 relative z-10'
        }
      `}>
        
        {/* --- TOOLBAR --- */}
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

        {/* --- ARTIKEL --- */}
        <article 
            data-aos={!animasiSelesai && !isFullScreen ? "fade-up" : ""}
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
                        {new Date(post.created_at).toLocaleDateString('en-US', { dateStyle: 'long' })}
                    </div>
                    
                    <h1 className={`text-3xl md:text-5xl font-bold leading-tight mb-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                        {post.title}
                    </h1>
                </header>

                <div className="max-w-none">
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