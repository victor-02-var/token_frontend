import React from 'react';
import { FileCode, FileJson, FileText, MessageSquare, Terminal, Layers } from 'lucide-react';

const formats = [
    { label: "Code Snippets", icon: <FileCode size={32} />, color: "bg-blue-200" },
    { label: "JSON Payloads", icon: <FileJson size={32} />, color: "bg-purple-200" },
    { label: "Raw Text", icon: <FileText size={32} />, color: "bg-red-200" },
    { label: "Chat Logs", icon: <MessageSquare size={32} />, color: "bg-yellow-200" },
    { label: "System Prompts", icon: <Terminal size={32} />, color: "bg-green-200" },
    { label: "Complex Contexts", icon: <Layers size={32} />, color: "bg-orange-200" },
];

const SupportedInputs = () => {
  return (
    // CHANGE: Switched bg-indigo-950 -> bg-[#F4F3EE] (Warm Parchment/White Theme)
    <section className="py-24 px-6 bg-[#F4F3EE] border-t-4 border-black relative overflow-hidden">
      
      {/* CHANGE: Background Pattern updated to subtle black dots (Graph Paper look) */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* CHANGE: Text color White -> Black. Highlight Yellow -> Pink (for better contrast on white) */}
        <h2 className="text-4xl font-black text-black uppercase mb-12 text-center">
            Universal <span className="text-pink-500">Context</span> Support
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {formats.map((item, i) => (
                <div key={i} className={`
                    ${item.color} border-4 border-black p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center
                    transition-all cursor-default 
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    hover:-translate-y-1 
                    hover:shadow-[4px_4px_0px_0px_#ec4899] 
                `}>
                    {/* Icon container stays Yellow for brand consistency */}
                    <div className="bg-yellow-400 border-2 border-black p-3 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
                        {item.icon}
                    </div>
                    <span className="font-black text-xs uppercase tracking-wider text-black">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedInputs;