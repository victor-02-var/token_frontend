import { useState } from 'react'
import './App.css'
import TokenOptimizerLanding from '../components/TokenOptimizerLanding' 
import OptimizerTool from '../components/OptimizerTool' 
import OptimizerAnalysis from '../components/OptimizerAnalysis'

function App() {
  const [activePage, setActivePage] = useState('landing');
  const [optimizationResult, setOptimizationResult] = useState(null);

  // Navigation Handlers
  const handleStartOptimizing = () => {
    setActivePage('tool');
    window.scrollTo(0, 0); 
  };

  const handleViewAnalysis = () => {
    setActivePage('analysis');
    window.scrollTo(0, 0);
  };

  const handleBackToTool = () => {
    setActivePage('tool');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setActivePage('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EE] font-sans">
      
      {/* Simple State-Based Routing */}
      {activePage === 'landing' && (
        <TokenOptimizerLanding onOptimize={handleStartOptimizing} />
      )}

      {activePage === 'tool' && (
        <OptimizerTool 
          onViewAnalysis={handleViewAnalysis} 
          onBackToLanding={handleBackToLanding}
          onResult={setOptimizationResult}
        />
      )}

      {activePage === 'analysis' && (
        <OptimizerAnalysis onBack={handleBackToTool} result={optimizationResult} />
      )}
      
    </div>
  )
}

export default App