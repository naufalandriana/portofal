import React, { type JSX } from 'react';

export const BlockRenderer = ({ block, isLightMode }: { block: any, isLightMode: boolean }) => {
  
  // Logic warna (Tanpa transition class biar instan & ga ngebug)
  const headingColor = isLightMode ? 'text-gray-900' : 'text-white';
  const paragraphColor = isLightMode ? 'text-gray-800' : 'text-gray-300';
  const codeBg = isLightMode ? 'bg-gray-100 border-gray-200' : 'bg-[#0d1117] border-white/10';
  const codeColor = isLightMode ? 'text-pink-600' : 'text-gray-200';
  const quoteColor = isLightMode ? 'text-gray-800' : 'text-gray-200';
  const linkColor = isLightMode ? 'text-blue-600' : 'text-accent';

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
        <p 
          className={`${paragraphColor} leading-relaxed mb-6 text-lg`} 
          dangerouslySetInnerHTML={{ __html: block.data.text }} 
        />
      );
    
    case 'image':
      return (
        <figure className="my-10">
          <div className={`${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-secondary border-border'} p-2 rounded-2xl border`}>
            <img 
              src={block.data.file.url} 
              alt={block.data.caption} 
              className="w-full rounded-xl" 
            />
          </div>
          {block.data.caption && (
            <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );
      
    case 'list':
      const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
      return (
        <ListTag className={`${paragraphColor} mb-8 space-y-2 pl-6 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
          {block.data.items.map((item: string, i: number) => (
             <li key={i} dangerouslySetInnerHTML={{ __html: item }} className="pl-2" />
          ))}
        </ListTag>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-success/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
           )}
          <pre className={`relative ${codeBg} p-6 rounded-xl overflow-x-auto border shadow-sm`}>
            <code className={`font-mono text-sm ${codeColor}`}>
              {block.data.code}
            </code>
          </pre>
        </div>
      );

    default:
      return null;
  }
};