
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MemberProfiles from './components/MemberProfiles';
import WorldBuilding from './components/WorldBuilding';
import TacticalProtocols from './components/TacticalProtocols';
import OperationalLogs from './components/OperationalLogs';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isCinematic, setIsCinematic] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(true);

  const CONTACT_URL = "https://open.kakao.com/me/Ori_mack";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 화면 어디든 클릭 시 시네마틱 모드 해제
  const handleAppClick = () => {
    if (isCinematic) {
      setIsCinematic(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-deepbase font-mono text-mint p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#ff00e5_0%,_transparent_50%)] animate-pulse"></div>
        </div>
        
        <div className="relative mb-12 flex items-center justify-center scale-150">
           <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-alert/40 stroke-[1px] fill-none animate-[spin_2s_linear_infinite]">
             <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" />
           </svg>
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-alert font-black text-xl animate-pulse">!</span>
           </div>
           <div className="absolute -inset-4 border border-alert/20 rounded-full animate-ping opacity-20"></div>
        </div>

        <div className="mb-4 text-xs font-bold tracking-[0.4em] text-alert uppercase">
          [CRITICAL] UNAUTHORIZED ACCESS DETECTED...
        </div>
        <div className="w-full max-w-xs h-[2px] bg-darkteal overflow-hidden relative border border-mint/10">
          <div className="h-full bg-alert shadow-[0_0_15px_#ff003c] animate-[loading_2.5s_ease-in-out]"></div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-2 text-[10px] text-mint/60 uppercase tracking-widest text-center font-bold">
          <p className="animate-pulse">Brute-forcing Alpha Node...</p>
          <p className="delay-100 animate-pulse">Bypassing EREBOS Firewall [94.2%]</p>
          <p className="delay-200 animate-pulse">Injecting Cracker_V3.9.sh into Argos Feed...</p>
          <p className="text-alert">Root Clearance Acquired.</p>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className={`relative min-h-screen selection:bg-mint/30 scroll-smooth bg-deepbase ${isCinematic ? 'overflow-hidden cursor-pointer' : ''}`}
      onClick={handleAppClick}
    >
      <CursorEffect />
      <div className="scanline"></div>
      
      {/* 마르코 오버레이가 떠있는 동안에는 헤더를 렌더링하지 않음 */}
      {!isOverlayActive && (
        <Header isCinematic={isCinematic} setIsCinematic={setIsCinematic} />
      )}
      
      <main className={`pt-16 transition-all duration-700 ${isCinematic ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <section id="home">
          <Hero 
            isCinematic={isCinematic} 
            isOverlayActive={isOverlayActive}
            setIsOverlayActive={setIsOverlayActive}
          />
        </section>

        <div className="max-w-7xl mx-auto">
          {!isOverlayActive && (
            <>
              <section id="universe" className="py-8 px-6 md:px-12 border-t border-darkteal/50">
                <WorldBuilding />
              </section>
              
              <section id="members" className="py-8 px-6 md:px-12 border-t border-darkteal/50">
                <MemberProfiles />
              </section>

              <section id="protocols" className="py-8 px-6 md:px-12 border-t border-darkteal/50">
                <TacticalProtocols />
              </section>
              
              <section id="logs" className="py-8 px-6 md:px-12 border-t border-darkteal/50">
                <OperationalLogs />
              </section>
            </>
          )}
        </div>
      </main>

      {/* Cinematic Mode Overlay */}
      {isCinematic && (
        <div className="fixed inset-0 z-[190]">
           <Hero isCinematic={true} isOverlayActive={false} setIsOverlayActive={() => {}} />
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-mint/40 uppercase tracking-[0.5em] animate-pulse">
             Click anywhere to exit cinematic mode
           </div>
        </div>
      )}

      {/* Floating HQ Contact Button - Bottom Right */}
      {!isCinematic && !isOverlayActive && (
        <div className="fixed bottom-6 right-6 z-[250] flex items-center space-x-3 group animate-in slide-in-from-right-10 duration-1000">
           {/* Info Text */}
           <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
             <span className="text-[10px] font-mono text-mint/60 font-black uppercase tracking-widest">ERROR REPORT</span>
             <span className="text-[9px] font-mono text-offwhite/40 uppercase tracking-tighter">오류/1:1 문의</span>
           </div>
           
           {/* The Button */}
           <a 
             href={CONTACT_URL}
             target="_blank"
             rel="noopener noreferrer"
             onClick={(e) => e.stopPropagation()}
             className="relative flex items-center justify-center px-4 py-2 border border-mint/40 bg-deepbase/80 backdrop-blur-md transition-all hover:bg-mint/10 hover:border-mint hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] active:scale-95 group/btn overflow-hidden"
           >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-mint"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-mint"></div>
              
              <div className="flex items-center space-x-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-mint animate-pulse">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <span className="font-mono text-[11px] font-black text-offwhite uppercase tracking-widest">본부에 연락하기</span>
              </div>
           </a>
        </div>
      )}

      {!isCinematic && !isOverlayActive && <Footer />}

      {/* Global Background Glows */}
      <div className="fixed -z-20 top-0 right-0 w-[1000px] h-[1000px] bg-nebula/10 blur-[180px] rounded-full"></div>
      <div className="fixed -z-20 bottom-0 left-0 w-[800px] h-[800px] bg-alert/5 blur-[150px] rounded-full"></div>
      <div className="fixed -z-10 inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#020205_80%)]"></div>
    </div>
  );
};

export default App;
