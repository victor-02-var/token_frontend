import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Activity, ArrowLeft, BarChart2, PieChart as PieIcon, TrendingDown } from 'lucide-react';

const COLORS = ['#ec4899', '#6366f1', '#eab308', '#22c55e'];

const STATIC_TOKEN_DATA = [
  { name: 'System Prompt', original: 4500, optimized: 1200 },
  { name: 'User Context', original: 8000, optimized: 3500 },
  { name: 'RAG Results', original: 15000, optimized: 6000 },
  { name: 'Chat History', original: 12000, optimized: 4000 },
];

const STATIC_COST_DATA = [
  { day: 'Mon', gpt4: 12.50, optimized: 4.20 },
  { day: 'Tue', gpt4: 14.20, optimized: 5.10 },
  { day: 'Wed', gpt4: 11.00, optimized: 3.80 },
  { day: 'Thu', gpt4: 18.50, optimized: 6.50 },
  { day: 'Fri', gpt4: 15.30, optimized: 5.20 },
];

const STATIC_REMOVAL_DATA = [
  { name: 'Whitespace', value: 45 },
  { name: 'Stop Words', value: 25 },
  { name: 'Redundant XML', value: 20 },
  { name: 'Polite Chatter', value: 10 },
];

// Custom Tooltip Component for styling consistency
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
        <p className="font-black text-xs uppercase mb-2 text-black border-b border-black pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs font-bold font-mono">
            <div 
              className="w-2 h-2 border border-black" 
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-gray-600 uppercase">{entry.name}:</span>
            <span className="text-black">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const OptimizerAnalysis = ({ onBack, result }) => {
  // Build chart data from real pipeline result if available
  const tokenData = result
    ? [{ name: 'Your Prompt', original: result.tokens.original || 0, optimized: result.tokens.optimized || 0 }]
    : STATIC_TOKEN_DATA;

  const costData = result
    ? (() => {
        const orig = result.tokens.original || 0;
        const opt = result.tokens.optimized || 0;
        const ratio = orig > 0 ? opt / orig : 1;
        return STATIC_COST_DATA.map(d => ({ ...d, optimized: parseFloat((d.gpt4 * ratio).toFixed(2)) }));
      })()
    : STATIC_COST_DATA;

  const removalData = result
    ? [
        { name: 'Filler Words', value: result.fillers?.percentage || 0 },
        { name: 'Duplicates', value: result.deduplication?.removed_count > 0 ? Math.min(40, result.deduplication.removed_count * 10) : 5 },
        { name: 'Stop Words', value: result.words ? Math.max(5, Math.round((result.words.saved / (result.words.original || 1)) * 60)) : 20 },
        { name: 'Restructured', value: result.tokens ? Math.max(5, Math.round(result.tokens.savings_pct * 0.3)) : 10 },
      ].map(d => ({ ...d, value: Math.round(d.value) || 1 }))
    : STATIC_REMOVAL_DATA;

  const avgReduction = result ? `${result.tokens?.savings_pct?.toFixed(1) || 0}%` : '64.2%';
  const tokensSaved = result ? result.tokens?.saved || 0 : '1.2M';
  const costAvoided = result ? `$${((result.tokens?.saved || 0) * 0.00003).toFixed(4)}` : '$450';
  const topKeywords = result?.keywords?.top_keywords || [];
  const intentLabel = result?.intent?.predicted || null;
  const intentConfidence = result?.intent?.confidence || 0;
  const textRankSentences = result?.textrank?.sentence_scores || [];
  return (
    <div className="min-h-screen bg-[#F4F3EE] pt-8 pb-24 px-6 relative overflow-hidden text-black font-sans">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white border-4 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:-translate-x-1 transition-transform active:translate-y-1 active:shadow-none"
          >
            <ArrowLeft size={18} />
            Back to Editor
          </button>

          <div className="text-left md:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 border-black bg-pink-500 text-white font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2 transform rotate-1">
              <Activity size={14} />
              Metrics Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black leading-none">
              Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Analysis</span>
            </h1>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-yellow-400 border-4 border-black p-6 rounded-[1.5rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown size={24} className="text-black" />
              <h3 className="font-black text-sm uppercase tracking-widest text-black/70">Avg. Reduction</h3>
            </div>
            <p className="text-5xl font-black text-black">{avgReduction}</p>
          </div>
          
          <div className="bg-white border-4 border-black p-6 rounded-[1.5rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-2">
              <BarChart2 size={24} className="text-pink-500" />
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-500">Tokens Saved</h3>
            </div>
            <p className="text-5xl font-black text-black">{tokensSaved}</p>
          </div>

          <div className="bg-indigo-900 border-4 border-black p-6 rounded-[1.5rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
            <div className="flex items-center gap-3 mb-2">
              <Activity size={24} className="text-yellow-400" />
              <h3 className="font-black text-sm uppercase tracking-widest text-indigo-300">Cost Avoided</h3>
            </div>
            <p className="text-5xl font-black text-white">{costAvoided}</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Token Usage Before vs After */}
          <div className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <div className="mb-6 border-b-4 border-black pb-4">
              <h3 className="text-2xl font-black uppercase text-black">Token Consumption</h3>
              <p className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">Original vs Optimized Payload</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: 'black', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} axisLine={{ stroke: 'black', strokeWidth: 2 }} />
                  <YAxis tick={{ fill: 'black', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} axisLine={{ stroke: 'black', strokeWidth: 2 }} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 800, fontSize: '12px' }} />
                  <Bar dataKey="original" name="Original Tokens" fill="#6366f1" stroke="black" strokeWidth={2} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="optimized" name="Optimized Tokens" fill="#ec4899" stroke="black" strokeWidth={2} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: API Cost Trajectory */}
          <div className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <div className="mb-6 border-b-4 border-black pb-4">
              <h3 className="text-2xl font-black uppercase text-black">Daily API Cost ($)</h3>
              <p className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">Standard Models vs Optimizer Proxy</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={costData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorGpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: 'black', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} axisLine={{ stroke: 'black', strokeWidth: 2 }} />
                  <YAxis tick={{ fill: 'black', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} axisLine={{ stroke: 'black', strokeWidth: 2 }} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 800, fontSize: '12px' }} />
                  <Area type="monotone" dataKey="gpt4" name="GPT-4 Cost" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorGpt)" />
                  <Area type="monotone" dataKey="optimized" name="Optimized Cost" stroke="#22c55e" strokeWidth={4} fillOpacity={1} fill="url(#colorOpt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Keywords & Intent (only when real data available) */}
          {result && (
            <div className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
              <div className="mb-6 border-b-4 border-black pb-4">
                <h3 className="text-2xl font-black uppercase text-black">TF-IDF Keywords</h3>
                <p className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">Top extracted keywords</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {topKeywords.map((kw, i) => (
                  <span key={i} className="px-4 py-2 border-2 border-black rounded-full font-black text-sm uppercase tracking-wide"
                    style={{ backgroundColor: COLORS[i % COLORS.length], color: 'white' }}>
                    {kw}
                  </span>
                ))}
                {topKeywords.length === 0 && <span className="font-mono text-gray-400 text-sm">No keywords extracted</span>}
              </div>
              {intentLabel && (
                <div className="mt-6 pt-4 border-t-4 border-black">
                  <p className="font-black text-sm uppercase tracking-widest text-gray-500 mb-2">Detected Intent</p>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-indigo-900 text-white border-2 border-black rounded-xl font-black uppercase text-sm">{intentLabel}</span>
                    <span className="font-mono font-bold text-lg">{(intentConfidence * 100).toFixed(1)}% confidence</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chart 4: TextRank Sentence Scores (only when real data available) */}
          {result && textRankSentences.length > 0 && (
            <div className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
              <div className="mb-6 border-b-4 border-black pb-4">
                <h3 className="text-2xl font-black uppercase text-black">TextRank Scores</h3>
                <p className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">Sentence importance ranking</p>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={textRankSentences.map((s, i) => ({ name: `S${i + 1}`, score: s.score, label: s.sentence }))} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis type="number" domain={[0, 1]} tick={{ fill: 'black', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} axisLine={{ stroke: 'black', strokeWidth: 2 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: 'black', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} axisLine={{ stroke: 'black', strokeWidth: 2 }} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" name="TextRank Score" fill="#6366f1" stroke="black" strokeWidth={2} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Chart: Composition of Removed Tokens */}
          <div className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 lg:col-span-2">
             <div className="mb-6 border-b-4 border-black pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end">
              <div>
                <h3 className="text-2xl font-black uppercase text-black">Fat Trimmed</h3>
                <p className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">Composition of removed tokens</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-2">
                <PieIcon size={20} className="text-pink-500" />
                <span className="font-black uppercase text-sm tracking-widest">Algorithm Output</span>
              </div>
            </div>
            <div className="h-[350px] w-full flex flex-col md:flex-row items-center justify-center">
              <div className="w-full md:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={removalData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="black"
                      strokeWidth={3}
                    >
                      {removalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 px-8">
                {removalData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-black rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="font-black uppercase text-sm">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-lg">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OptimizerAnalysis;