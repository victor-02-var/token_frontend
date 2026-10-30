import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Zap, AlignLeft, FileText, Activity, ArrowLeft, CheckCircle, Loader, FlaskConical, Copy } from 'lucide-react';

const SAMPLE_PROMPTS = [
  {
    label: "Login + Dashboard App",
    tag: "Web Dev",
    color: "bg-pink-400",
    text: "so like i want to build a thing where basically users can login and then see their dashboard and maybe there should be settings too and please make it look nice with dark mode thanks",
  },
  {
    label: "REST API Design",
    tag: "Backend",
    color: "bg-indigo-500",
    text: "hey can you help me design a rest api for my ecommerce app i need endpoints for products and users and orders and also maybe some authentication stuff like jwt tokens would be great",
  },
  {
    label: "ML Model Training",
    tag: "ML / DS",
    color: "bg-yellow-400",
    text: "so basically i want to train a machine learning model on my dataset which has like customer purchase history and i want to predict whether they will churn or not please help me with the code",
  },
  {
    label: "Fix a React Bug",
    tag: "Debug",
    color: "bg-green-400",
    text: "my react component is not re rendering when the state changes and i dont know why i tried using useEffect but it still doesnt work can you please look at this and tell me what is wrong",
  },
  {
    label: "SQL Query Help",
    tag: "Database",
    color: "bg-orange-400",
    text: "i need to write a sql query that gets all the users who have placed more than 3 orders in the last 30 days and also shows their total spending amount and sorts them by highest spender first",
  },
];

const OptimizerTool = ({ onViewAnalysis, onBackToLanding, onResult }) => {
  const [inputText, setInputText] = useState("");
  const [optimizedText, setOptimizedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  
  const textareaRef = useRef(null);

  // Auto-resize the textarea based on its content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [inputText]);

  const handleOptimize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setOptimizedText("");
    setCopied(false);

    try {
      const res = await fetch("http://localhost:8000/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Optimization failed.");
      }

      const data = await res.json();
      setOptimizedText(data.optimized_text);
      onResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!optimizedText) return;
    try {
      await navigator.clipboard.writeText(optimizedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copy status after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3EE] flex flex-col items-center pt-12 pb-12 px-6 relative overflow-hidden text-black font-sans">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Top Navigation */}
      <div className="max-w-6xl w-full flex justify-start mb-8 relative z-10">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white border-4 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:-translate-x-1 transition-transform active:translate-y-1 active:shadow-none"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>

      {/* Header */}
      <div className="max-w-6xl w-full text-center relative z-10 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 border-black bg-yellow-400 text-black font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-1">
          <Zap className="fill-black" size={14} />
          Active Workspace
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-black leading-none mb-4">
          Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Optimizing</span>
        </h1>
        <p className="font-mono text-sm md:text-base uppercase text-gray-700 tracking-widest font-bold max-w-xl mx-auto">
          Paste your bloated context below and let the algorithm strip the fat.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row gap-8 items-start">

        {/* Left: Sample Prompts Panel */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-indigo-900 border-b-4 border-black p-4 flex items-center gap-3">
              <FlaskConical size={18} className="text-yellow-400" />
              <span className="font-black text-sm uppercase tracking-widest text-white">Sample Prompts</span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {SAMPLE_PROMPTS.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(sample.text)}
                  className="w-full text-left border-2 border-black rounded-xl p-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-none bg-white"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${sample.color} border border-black text-black font-black text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full`}>
                      {sample.tag}
                    </span>
                  </div>
                  <p className="font-black text-sm uppercase tracking-wide text-black leading-tight">{sample.label}</p>
                  <p className="font-mono text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{sample.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Main Tool Card */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border-4 border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-8">
            
            {/* Card Toolbar */}
            <div className="bg-indigo-50 border-b-4 border-black p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400 border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-black"></div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-500 uppercase">
                <FileText size={16} />
                Input / raw_context.txt
              </div>
            </div>

            {/* Editor Area */}
            <div className="p-6 md:p-8 bg-white relative group">
              <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-xs font-bold text-gray-400 uppercase pointer-events-none">
                <AlignLeft size={14} />
                {inputText.length} Chars
              </div>
              
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your massive prompt, codebase, or context here..."
                className="w-full min-h-[160px] overflow-hidden resize-none bg-transparent outline-none font-mono text-sm md:text-base leading-relaxed text-black placeholder:text-gray-300 selection:bg-pink-300 selection:text-black border-2 border-transparent focus:border-indigo-100 rounded-xl p-2 transition-colors"
                spellCheck="false"
              />
            </div>

            {/* Action Footer */}
            <div className="bg-yellow-400 border-t-4 border-black p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-black font-black uppercase text-sm tracking-widest hidden md:block">
                Ready to shrink
              </div>
              
              <button 
                onClick={handleOptimize}
                disabled={!inputText.trim() || loading}
                className={`
                  w-full sm:w-auto px-10 py-4 rounded-xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-100 uppercase tracking-wide
                  border-4 border-black
                  ${inputText.trim() && !loading
                    ? 'bg-pink-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-400 active:translate-y-2 active:shadow-none cursor-pointer' 
                    : 'bg-gray-200 text-gray-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] cursor-not-allowed'}
                `}
              >
                {loading ? <Loader className="animate-spin" size={22} /> : <Sparkles className={inputText.trim() ? "animate-pulse" : ""} />}
                {loading ? "Optimizing..." : "Optimized"}
              </button>
            </div>
            
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-100 border-4 border-red-500 rounded-xl p-4 font-mono text-sm font-bold text-red-700 uppercase tracking-wide">
              ⚠ {error}
            </div>
          )}

          {/* Result Card */}
          {optimizedText && (
            <div className="bg-white border-4 border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-8">
              <div className="bg-green-400 border-b-4 border-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-black" />
                  <span className="font-black text-sm uppercase tracking-widest text-black">Optimized Output</span>
                </div>
                
                {/* Copy Button */}
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all active:translate-y-0.5 active:shadow-none font-black text-xs uppercase text-black"
                >
                  {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="p-6 md:p-8">
                <pre className="font-mono text-sm leading-relaxed text-black whitespace-pre-wrap break-words">{optimizedText}</pre>
              </div>
            </div>
          )}

          {/* Navigation to Analysis Page */}
          <div className="flex justify-center">
             <button 
                onClick={onViewAnalysis}
                className="flex items-center gap-3 px-8 py-4 bg-white border-4 border-black rounded-xl font-black text-lg uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-none"
              >
                <Activity className="text-pink-500" size={24} />
                View Analytics Dashboard
              </button>
          </div>

        </div>{/* end right col */}
      </div>{/* end two-col */}
    </div>
  );
};

export default OptimizerTool;