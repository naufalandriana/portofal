import { type JSX } from 'react';

interface BlockProps {
  block: any;
  isLightMode: boolean;
}

export const BlockRenderer = ({ block, isLightMode }: BlockProps) => {
  
  // Logic warna
  const headingColor = isLightMode ? 'text-gray-900' : 'text-white';
  const paragraphColor = isLightMode ? 'text-gray-800' : 'text-gray-300';
  const codeBg = isLightMode ? 'bg-gray-100 border-gray-200' : 'bg-[#0d1117] border-white/10';
  const codeColor = isLightMode ? 'text-pink-600' : 'text-gray-200';
  const quoteColor = isLightMode ? 'text-gray-800' : 'text-gray-200';

  switch (block.type) {
    case 'header':
      const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag className={`font-bold ${headingColor} mt-10 mb-4 leading-tight`}>
           <span className={block.data.level === 2 ? 'text-3xl' : 'text-2xl'}>
             {block.data.text}
           </span>
        </Tag>
      );
    
    case 'paragraph':
      return (
        <p className={`mb-6 text-lg leading-relaxed ${paragraphColor} font-sans`}>
           <span dangerouslySetInnerHTML={{ __html: block.data.text }} />
        </p>
      );

   case 'list':
    const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
    return (
      <ListTag className={`mb-8 pl-6 space-y-2 text-lg ${paragraphColor} ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
        {block.data.items.map((item: any, i: number) => {
          // Logika pengecekan: jika item adalah string pakai item, 
          // jika item adalah objek pakai item.content
          const contentText = typeof item === 'string' ? item : item.content;
          
          return (
            <li 
              key={i} 
              dangerouslySetInnerHTML={{ __html: contentText }} 
              className="pl-2" 
            />
          );
        })}
      </ListTag>
    );
      
    case 'image':
      return (
        <figure className="my-10">
          <img 
            src={block.data.file.url} 
            alt={block.data.caption || 'Blog Image'} 
            className="rounded-xl w-full object-cover shadow-lg border border-white/5"
            loading="lazy"
          />
          {block.data.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <div className="relative my-10 pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-transparent rounded-full"></div>
          <blockquote className={`text-xl italic ${quoteColor}`}>
            "{block.data.text}"
          </blockquote>
          {block.data.caption && (
            <footer className="text-sm font-bold mt-3 text-accent uppercase tracking-wider">
              — {block.data.caption}
            </footer>
          )}
        </div>
      );

    case 'code':
      return (
        <div className="my-8 relative group">
           {!isLightMode && (
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-success/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
           )}
          <pre className={`relative ${codeBg} p-6 rounded-xl overflow-x-auto border shadow-sm`}>
            <code className={`font-mono text-sm ${codeColor}`}>
              {block.data.code}
            </code>
          </pre>
        </div>
      );

    // === BAGIAN INI YANG PENTING BUAT DAFTAR PUSTAKA ===
    case 'references':
      // Handle format data array
      const refs = Array.isArray(block.data) ? block.data : (block.data.items || []);

      if (!refs || refs.length === 0) return null;

      return (
        <div className="mt-12 pt-8 border-t border-dashed border-gray-700/50">
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
            <i className="ph ph-books text-accent"></i>
            Daftar Pustaka
          </h3>

          <ul className="space-y-3">
            {refs.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="text-accent mt-1.5 text-xs">
                    <i className="ph-fill ph-caret-right"></i>
                </span>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`
                    text-base font-medium transition-all duration-200 break-all
                    ${isLightMode 
                        ? 'text-gray-700 hover:text-accent hover:translate-x-1' 
                        : 'text-gray-300 hover:text-accent hover:translate-x-1'
                    }
                  `}
                >
                  {item.title || item.url}
                  <span className="ml-2 text-xs opacity-50 text-gray-500 group-hover:opacity-100 transition-opacity">
                    <i className="ph ph-arrow-square-out"></i>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
};