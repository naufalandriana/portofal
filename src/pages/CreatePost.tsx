import { useEffect, useRef, useState } from 'react';
import EditorJS, { type OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import CodeTool from '@editorjs/code';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const ejInstance = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  
  // STATE
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(''); // State buat Slug
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // --- FUNGSI GENERATE SLUG OTOMATIS ---
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    
    // Logic: Lowercase -> Spasi jadi strip -> Hapus simbol aneh
    const autoSlug = val
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
        
    setSlug(autoSlug);
  };

  // Bisa edit slug manual juga kalau mau
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSlug(e.target.value);
  }

  useEffect(() => {
    // Logic Partikel Background
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles-editor');
      if (!particlesContainer) return;
      particlesContainer.innerHTML = '';
      for (let i = 0; i < 15; i++) {
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

    if (editorContainerRef.current && !ejInstance.current) {
      initEditor();
    }
    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: editorContainerRef.current!,
      placeholder: 'Tulis sesuatu yang awesome hari ini...',
      tools: {
        header: { class: Header as any, config: { placeholder: 'Sub-Judul', levels: [2, 3], defaultLevel: 2 } },
        list: { class: List as any, inlineToolbar: true },
        image: {
          class: ImageTool as any,
          config: {
            uploader: {
              uploadByFile(file: File) {
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    resolve({ success: 1, file: { url: e.target?.result } });
                  };
                  reader.readAsDataURL(file);
                });
              },
            }
          }
        },
        quote: { class: Quote as any, inlineToolbar: true },
        code: { class: CodeTool as any }
      },
    });
    ejInstance.current = editor;
  };

  const handleSave = async () => {
    // VALIDASI: Judul & Slug Wajib Ada!
    if (!title) return alert('Judul wajib diisi bro!');
    if (!slug) return alert('Slug wajib diisi bro!');

    setIsSaving(true);

    try {
      const savedData: OutputData = await ejInstance.current!.save();
      const firstParagraph = savedData.blocks.find(b => b.type === 'paragraph')?.data.text || 'No description';
      const cleanExcerpt = firstParagraph.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';

      const { error } = await supabase
        .from('posts')
        .insert([{ 
            title: title, 
            slug: slug, // <-- KIRIM SLUG KE DATABASE
            content: savedData, 
            excerpt: cleanExcerpt
        }]);

      if (error) throw error;
      
      alert('Mantap! Artikel berhasil dipublish.');
      navigate('/blog');
    } catch (error: any) {
      console.error('Error:', error);
      // Handle error duplicate slug (kalau slug udah ada di DB)
      if (error.code === '23505') {
          alert('Gagal: Slug/Judul ini sudah ada. Coba ganti dikit judulnya.');
      } else {
          alert('Gagal save: ' + error.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
       {/* --- BACKGROUND --- */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/5 rounded-full blur-3xl floating-element"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute inset-0" id="particles-editor"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-6">
          <h1 className="text-2xl font-bold text-gray-200">Admin Editor</h1>
          <button onClick={handleSave} disabled={isSaving} className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-accent/20">
            {isSaving ? 'Publishing...' : 'Publish Now'}
          </button>
        </div>

        {/* --- INPUT JUDUL --- */}
        <input 
          type="text" 
          value={title}
          onChange={handleTitleChange} // Pake handler baru
          placeholder="Judul Artikel Utama..." 
          className="w-full bg-transparent text-4xl font-bold text-white placeholder-gray-600 border-none outline-none mb-4 focus:ring-0"
        />

        {/* --- INPUT SLUG (Otomatis + Bisa Edit) --- */}
        <div className="flex items-center gap-2 mb-8 bg-secondary/50 p-3 rounded-lg border border-white/10">
            <span className="text-gray-500 text-sm font-mono select-none">/blog/</span>
            <input 
                type="text"
                value={slug}
                onChange={handleSlugChange}
                placeholder="url-slug-otomatis"
                className="w-full bg-transparent text-accent font-mono text-sm border-none outline-none focus:ring-0"
            />
        </div>

        {/* Editor Container Styled for Dark Mode */}
        <div className="bg-secondary/80 backdrop-blur-sm border border-border rounded-2xl p-8 min-h-[500px] shadow-2xl relative">
           
           <style>{`
             .codex-editor__redactor { padding-bottom: 100px !important; }
             h2, h3 { color: #fff !important; margin-bottom: 10px; }
             .ce-paragraph { color: #d1d5db !important; font-size: 1.1rem; line-height: 1.6; }
             .ce-toolbar__plus, .ce-toolbar__settings-btn { 
                color: #fff !important; 
                background-color: #374151 !important;
                border-radius: 6px;
             }
             .ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover {
                background-color: #2563eb !important; 
             }
             .ce-inline-toolbar {
                background-color: #1f2937 !important;
                color: white !important;
                border: 1px solid #374151;
             }
             .ce-inline-tool:hover { background-color: #374151 !important; }
             .cdx-input { 
                background: rgba(255,255,255,0.05) !important; 
                color: white !important; 
                border: 1px solid #374151 !important;
                border-radius: 8px;
                padding: 10px;
             }
             .ce-block--selected .ce-block__content { background: #1f2937 !important; }
           `}</style>
           
           <div ref={editorContainerRef} className="prose prose-invert max-w-none"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;