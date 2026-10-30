import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { Zap } from "lucide-react";

// 1. Data tailored to token optimization
const chartData = [
  { metric: "Compression", optimizer: 90, standard: 30 },
  { metric: "Cost Efficiency", optimizer: 100, standard: 40 },
  { metric: "Context Retention", optimizer: 85, standard: 95 },
  { metric: "Processing Speed", optimizer: 95, standard: 60 },
  { metric: "Format Accuracy", optimizer: 90, standard: 85 },
  { metric: "Ease of Use", optimizer: 100, standard: 50 },
];

const chartConfig = {
  optimizer: {
    label: "Optimizer",
    color: "#ec4899", // Pink-500
  },
  standard: {
    label: "Standard LLM",
    color: "#6366f1", // Indigo-500
  },
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-black text-xs uppercase mb-2 text-black border-b border-black pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs font-bold font-mono">
            <div 
              className="w-2 h-2 border border-black" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 uppercase">{entry.name === 'optimizer' ? 'Optimizer' : 'Standard'}:</span>
            <span className="text-black">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TokenOptimizerChart() {
  return (
    <div className="border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden w-full max-w-md mx-auto">
      
      {/* --- Card Header --- */}
      <div className="p-6 border-b-4 border-black bg-yellow-400 flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter text-black leading-none">
          <Zap className="fill-black" size={24} />
          Optimization Benchmark
        </h3>
        <p className="text-black font-bold font-mono text-xs uppercase tracking-widest opacity-70">
          Token Optimizer vs. Standard Methods
        </p>
      </div>
      
      {/* --- Card Content --- */}
      <div className="p-4 pt-8 bg-indigo-50/50">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="black" strokeOpacity={0.1} />
              
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ 
                  fill: "black", 
                  fontSize: 10, 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  fontFamily: 'monospace' 
                }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Radar
                name="standard"
                dataKey="standard"
                stroke={chartConfig.standard.color}
                strokeWidth={3}
                fill={chartConfig.standard.color}
                fillOpacity={0.3}
              />
              <Radar
                name="optimizer"
                dataKey="optimizer"
                stroke={chartConfig.optimizer.color}
                strokeWidth={4}
                fill={chartConfig.optimizer.color}
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* --- Legend --- */}
        <div className="flex justify-center gap-6 pb-4 mt-2">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 border-2 border-black rounded-full"></div>
                <span className="text-xs font-black uppercase text-black">Optimizer</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 border-2 border-black rounded-full opacity-50"></div>
                <span className="text-xs font-black uppercase text-gray-500">Standard</span>
            </div>
        </div>
      </div>
    </div>
  );
}