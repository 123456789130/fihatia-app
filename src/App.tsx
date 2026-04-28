import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Activity, 
  Utensils, 
  TrendingUp, 
  Zap, 
  Plus, 
  Flame,
  LayoutGrid,
  User
} from 'lucide-react';

// --- FIHATIA LOGIC ENGINE ---
const getMuscleColor = (recovery: number) => {
  if (recovery <= 30) return '#FF3D00'; // Fatigued
  if (recovery <= 75) return '#FFEA00'; // Recovering
  return '#A3FF12'; // Optimal
};

// --- UI COMPONENTS ---
const TabButton = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? 'text-primary' : 'text-gray-500'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-bold tracking-widest">{label}</span>
  </button>
);

const GlassCard = ({ children, className }: any) => (
  <div className={`glass-card p-6 rounded-3xl ${className}`}>
    {children}
  </div>
);

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('VAULT');
  const [recovery, setRecovery] = useState(100);
  const [mode, setMode] = useState('GYM');
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSyncing(false), 2500);
  }, []);

  const simulateWorkout = () => {
    setRecovery(prev => Math.max(10, prev - 25));
  };

  const simulateRecovery = () => {
    setRecovery(prev => Math.min(100, prev + 20));
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black font-['Inter']">
      {/* 1. SPLASH SCREEN / SYNC */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-2 border-primary/20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(163,255,18,0.5)]">FIHATIA</span>
              </div>
            </div>
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary text-xs font-['Manrope'] tracking-[0.3em]"
            >
              SINCRONIZANDO BIOMETRÍA REAL...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto h-[100dvh] flex flex-col relative overflow-hidden">
        {/* 2. TOP HUD */}
        <header className="p-8 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black tracking-tighter">FIHATIA</h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary tracking-widest font-bold">MODE: {mode}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="px-4 py-2 rounded-2xl bg-surface/50 backdrop-blur-md border border-white/5 flex items-center gap-3">
              <Activity size={16} className="text-primary" />
              <span className="text-xl font-bold font-['Manrope']" style={{ color: getMuscleColor(recovery) }}>
                {recovery}%
              </span>
            </div>
          </div>
        </header>

        {/* 3. CENTER CONTENT (SWITCHEABLE) */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'VAULT' && (
              <motion.div 
                key="vault"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full h-full flex flex-col items-center justify-center px-8 pb-32"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(163,255,18,0.05)_0%,rgba(0,0,0,0)_70%)]" />
                
                {/* 2D Scanner Graphic instead of 3D */}
                <div className="relative w-full max-w-[280px] aspect-[1/1.5] flex items-center justify-center">
                  {/* Holographic background */}
                  <div className="absolute inset-0 bg-surface/30 rounded-full blur-3xl" />
                  
                  {/* Body wireframe/icon placeholder */}
                  <div className="relative z-10 flex flex-col items-center">
                    <User size={180} strokeWidth={1} style={{ color: getMuscleColor(recovery) }} className="drop-shadow-[0_0_15px_rgba(163,255,18,0.5)]" />
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-4 px-4 py-1 rounded-full border border-primary/30 bg-primary/10"
                    >
                      <span className="text-[10px] font-bold tracking-widest text-primary">STATUS: {recovery >= 75 ? 'OPTIMAL' : recovery >= 30 ? 'RECOVERING' : 'FATIGUED'}</span>
                    </motion.div>
                  </div>

                  {/* Scanning Shimmer Effect */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(163,255,18,1)] z-20 rounded-full"
                  />
                  
                  {/* Scanner Grid */}
                  <div className="absolute inset-0 border border-white/5 rounded-3xl" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* Floating Metrics */}
                <div className="absolute bottom-10 left-8 right-8 flex justify-between gap-4">
                  <div className="flex-1 p-4 rounded-2xl glass-card flex flex-col gap-1 backdrop-blur-md bg-surface/40 border border-white/5">
                    <span className="text-[8px] text-gray-400 font-bold tracking-widest">GLUCÓGENO</span>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${recovery}%` }}
                        style={{ backgroundColor: getMuscleColor(recovery) }}
                        className="h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4 rounded-2xl glass-card flex flex-col gap-1 backdrop-blur-md bg-surface/40 border border-white/5">
                    <span className="text-[8px] text-gray-400 font-bold tracking-widest">FATIGA</span>
                    <span className="text-lg font-bold">{100 - recovery}%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'WORKOUT' && (
              <motion.div 
                key="workout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 space-y-6 overflow-y-auto max-h-full pb-32 h-full scrollbar-hide"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black">EXERCISE HUB</h2>
                  <div className="flex bg-surface rounded-xl p-1 border border-white/5">
                    <button 
                      onClick={() => setMode('GYM')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${mode === 'GYM' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                      GYM
                    </button>
                    <button 
                      onClick={() => setMode('HOME')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${mode === 'HOME' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                      CASA
                    </button>
                  </div>
                </div>

                <GlassCard className="flex flex-col gap-4 border-l-4 border-l-primary bg-surface/40 backdrop-blur-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">Press de Banca</h3>
                      <p className="text-xs text-gray-400">Objetivo: Pecho / Tríceps</p>
                    </div>
                    <Flame className="text-primary" size={20} />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[8px] font-bold rounded">4 SERIES</span>
                    <span className="px-2 py-1 bg-white/5 text-gray-300 text-[8px] font-bold rounded">RPE 9</span>
                  </div>
                </GlassCard>

                <div className="space-y-4">
                  <span className="text-[10px] font-black text-gray-500 tracking-widest block">LOGBOOK RÁPIDO</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-4 bg-surface rounded-2xl flex flex-col items-center border border-white/5">
                      <span className="text-[8px] text-gray-500 mb-1">KG</span>
                      <span className="text-lg font-bold">80</span>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl flex flex-col items-center border border-white/5">
                      <span className="text-[8px] text-gray-500 mb-1">REPS</span>
                      <span className="text-lg font-bold">10</span>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl flex flex-col items-center border border-white/5">
                      <span className="text-[8px] text-gray-500 mb-1">SET</span>
                      <span className="text-lg font-bold">#2</span>
                    </div>
                  </div>
                  <button 
                    onClick={simulateWorkout}
                    className="w-full py-4 bg-primary text-black font-black text-xs rounded-2xl hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(163,255,18,0.3)] hover:shadow-[0_0_25px_rgba(163,255,18,0.5)]"
                  >
                    <Plus size={18} strokeWidth={3} />
                    CONFIRMAR SERIE
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'EAT' && (
              <motion.div 
                key="eat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-6 overflow-y-auto max-h-full pb-32 h-full scrollbar-hide"
              >
                <h2 className="text-2xl font-black mb-8">NUTRITION HUD</h2>
                
                <div className="relative rounded-3xl overflow-hidden aspect-video bg-surface group flex items-center justify-center border border-white/5">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-40" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-primary/20 text-primary animate-pulse backdrop-blur-sm border border-primary/30">
                      <Zap size={32} />
                    </div>
                    <span className="text-xs font-black tracking-widest drop-shadow-md">SCANNER AR ACTIVO</span>
                  </div>
                  {/* Scan Line Animation */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-primary/50 shadow-[0_0_15px_rgba(163,255,18,0.8)] z-20"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h3 className="text-sm font-black">RECOMENDADO PARA RECUPERACIÓN</h3>
                    <span className="text-[10px] text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">BONUS 1.2x</span>
                  </div>
                  
                  <GlassCard className="flex items-center gap-4 bg-surface/40 backdrop-blur-md border border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      <Utensils size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">Batido Post-Entreno</h4>
                      <p className="text-xs text-gray-400 mt-1">45g Prot | 320 Kcal</p>
                    </div>
                    <button 
                      onClick={simulateRecovery}
                      className="p-3 rounded-xl bg-white/5 text-primary hover:bg-primary/20 transition-colors border border-white/5"
                    >
                      <Plus size={20} />
                    </button>
                  </GlassCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. BOTTOM NAV BAR */}
        <nav className="absolute bottom-0 w-full p-6 bg-background/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center rounded-t-[40px] z-50">
          <TabButton 
            icon={LayoutGrid} 
            label="VAULT" 
            active={activeTab === 'VAULT'} 
            onClick={() => setActiveTab('VAULT')} 
          />
          <TabButton 
            icon={Dumbbell} 
            label="TRAIN" 
            active={activeTab === 'WORKOUT'} 
            onClick={() => setActiveTab('WORKOUT')} 
          />
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-black -mt-12 shadow-[0_0_20px_rgba(163,255,18,0.4)] cursor-pointer hover:scale-105 transition-transform">
            <Plus size={32} strokeWidth={3} />
          </div>
          <TabButton 
            icon={Utensils} 
            label="EAT" 
            active={activeTab === 'EAT'} 
            onClick={() => setActiveTab('EAT')} 
          />
          <TabButton 
            icon={TrendingUp} 
            label="EVO" 
            active={activeTab === 'EVO'} 
            onClick={() => setActiveTab('EVO')} 
          />
        </nav>
      </main>

      {/* CSS For custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Manrope:wght@800&display=swap');
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
