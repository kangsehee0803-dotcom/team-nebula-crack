
import React, { useState, useEffect, useCallback } from 'react';

interface HeroProps {
  isCinematic?: boolean;
  isOverlayActive?: boolean;
  setIsOverlayActive?: (val: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ 
  isCinematic = false, 
  isOverlayActive = true, 
  setIsOverlayActive = () => {} 
}) => {
  const [isSynchronized, setIsSynchronized] = useState(false);
  const [isWarningActive, setIsWarningActive] = useState(false);

  // 시네마틱 슬라이드쇼용 이미지 5장
  const slideImages = [
    "https://i.postimg.cc/vT6XSMkM/jemog-eul-iblyeoghaejuseyo-(67).png", // Main
    "https://i.postimg.cc/Y2dzQdnX/1.png", // Nox
    "https://i.postimg.cc/8PsB4L9w/4.png", // Fuse
    "https://i.postimg.cc/J4tcxjvT/2.png", // Link
    "https://i.postimg.cc/L6hBDjwN/3.png", // Caffeine
  ];

  // 초기 스크롤 잠금 처리
  useEffect(() => {
    if (isOverlayActive || isCinematic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOverlayActive, isCinematic]);

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation(); // 경고창 트리거 방지
    setIsSynchronized(true);
    setTimeout(() => {
      setIsOverlayActive(false);
    }, 800);
  };

  // 잘못된 영역 클릭 시 보안 경고 발생
  const triggerSecurityWarning = useCallback(() => {
    if (!isOverlayActive || isCinematic) return;
    
    setIsWarningActive(true);
    // 짧은 진동 및 사운드 시각화 효과 연출용
    setTimeout(() => setIsWarningActive(false), 1500);
  }, [isOverlayActive, isCinematic]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 시네마틱 모드일 때는 UI 투명도 조절
  const uiHiddenClass = isCinematic ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100';

  return (
    <section 
      className={`relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden bg-deepbase ${isOverlayActive ? 'cursor-default' : ''}`}
      onClick={triggerSecurityWarning}
    >
      
      {/* Background Layer: Cinematic Slideshow vs Static */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isCinematic ? (
          <div className="relative w-full h-full flex items-center overflow-hidden">
             <div className="flex h-full animate-cinematic-slide">
                {[...slideImages, ...slideImages].map((img, idx) => (
                  <div key={idx} className="h-full w-screen shrink-0 relative overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Slide ${idx}`} 
                      className="w-full h-full object-cover brightness-100 contrast-110"
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none"></div>
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <>
            <img 
              src={slideImages[0]} 
              alt="NEBULA Core Background" 
              className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
                isSynchronized ? 'opacity-100 brightness-[0.4] scale-100' : 'opacity-30 brightness-[0.2] blur-md scale-110'
              }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-b from-deepbase/80 via-darkteal/20 to-deepbase/90 transition-opacity duration-1000 opacity-100`}></div>
          </>
        )}
      </div>

      <div className={`relative z-10 flex flex-col items-center max-w-7xl w-full px-6 py-20 transition-all duration-700 ${uiHiddenClass} ${isOverlayActive ? 'blur-sm grayscale scale-[0.98] pointer-events-none' : ''}`}>
        
        {/* Main Content (Hidden when overlay is active) */}
        <div className={`transition-all duration-1000 transform ${isSynchronized ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90 pointer-events-none'}`}>
          <div className="mb-8 inline-flex items-center space-x-3 px-5 py-2 bg-darkteal/60 border border-alert/40 backdrop-blur-md rounded-sm">
            <span className="w-2 h-2 bg-alert rounded-full shadow-[0_0_12px_#ff003c] animate-pulse"></span>
            <span className="font-mono text-[10px] text-offwhite tracking-[0.4em] uppercase font-bold">
              NEBULA LINK STATUS: <span className="text-alert">CONNECTED</span>
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold px-6 leading-[0.85] tracking-tighter uppercase relative mb-12">
            <span className="glitch-text block text-offwhite drop-shadow-[0_0_20px_rgba(255,0,229,0.3)]" data-text="EREBOS">EREBOS</span>
            <span className="text-mint relative glitch-text" data-text="NEBULA">NEBULA</span>
          </h1>
          
          <div className="flex flex-col items-center">
            <p className="max-w-2xl text-offwhite text-sm md:text-lg font-medium px-8 leading-relaxed tracking-wider bg-deepbase/80 backdrop-blur-xl py-6 border-l-2 border-alert shadow-2xl">
              [CRACKED] EREBOS 기밀 보안망 강제 우회 완료.<br />
              최정예 전술팀 <span className="font-mono font-bold text-alert tracking-normal">[NEBULA]</span>의 가공되지 않은 기밀 데이터에 접근합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10 mt-16 w-full max-w-xl justify-center mx-auto">
            <button 
              onClick={() => scrollTo('universe')}
              className="group relative px-12 py-5 bg-alert text-offwhite font-black transition-all hover:tracking-[0.5em] active:scale-95 overflow-hidden text-sm uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,0,60,0.5)]"
            >
              세계관 설명
            </button>
            <button 
              onClick={() => scrollTo('members')}
              className="group px-12 py-5 tactical-border text-offwhite font-bold transition-all hover:bg-alert/20 active:scale-95 text-sm uppercase tracking-[0.3em] border-alert/40"
            >
              캐릭터 프로필
            </button>
          </div>
        </div>
      </div>

      {/* Security Warning Layer (Appears on invalid click) */}
      {isWarningActive && (
        <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-alert/20 backdrop-invert-[0.1] animate-in fade-in duration-150">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40"></div>
           <div className="flex flex-col items-center space-y-6 animate-glitch-fast">
             <div className="w-24 h-24 border-4 border-alert flex items-center justify-center rounded-sm">
                <span className="text-alert font-black text-6xl">!</span>
             </div>
             <div className="text-center">
               <h3 className="text-alert font-mono text-4xl font-black uppercase tracking-[0.4em] mb-2 drop-shadow-[0_0_20px_#ff003c]">ACCESS DENIED</h3>
               <p className="text-offwhite font-mono text-xs uppercase tracking-widest font-bold bg-alert px-4 py-1">UNAUTHORIZED_INTERACTION // FUSE_IS_WATCHING</p>
             </div>
           </div>
        </div>
      )}

      {/* Marco (FUSE) Intercept Overlay */}
      {isOverlayActive && !isCinematic && (
        <div className={`fixed inset-0 z-[150] flex items-center justify-center p-6 transition-all duration-700 ${isSynchronized ? 'opacity-0 scale-110 blur-xl pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="absolute inset-0 bg-deepbase/90 backdrop-blur-2xl"></div>
          
          <div className="relative group/marco max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className={`absolute -top-12 left-0 right-0 flex justify-center items-center space-x-3 font-mono font-black text-[11px] tracking-[0.6em] uppercase transition-colors duration-300 ${isWarningActive ? 'text-alert' : 'text-mint/60'}`}>
              <span className={`h-px flex-1 ${isWarningActive ? 'bg-alert/50' : 'bg-mint/20'}`}></span>
              <div className="flex items-center space-x-2 animate-pulse">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2L1 21h22L12 2zm0 3.45l8.2 14.1H3.8L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
                <span>{isWarningActive ? 'SECURITY_BREACH_DETECTED' : 'UNKNOWN_SIGNAL_LOCKED'}</span>
              </div>
              <span className={`h-px flex-1 ${isWarningActive ? 'bg-alert/50' : 'bg-mint/20'}`}></span>
            </div>

            <div className={`flex flex-col md:flex-row items-center md:items-stretch space-y-8 md:space-y-0 md:space-x-10 bg-[#030014]/95 backdrop-blur-3xl p-10 md:p-12 border-2 transition-all duration-300 tactical-border rounded-sm overflow-hidden ${isWarningActive ? 'border-alert shadow-[0_0_100px_rgba(255,0,60,0.4)]' : 'border-mint/40 shadow-[0_0_100px_rgba(0,242,255,0.2)]'}`}>
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent to-transparent animate-[scan_2s_linear_infinite] ${isWarningActive ? 'via-alert/80' : 'via-mint/40'}`}></div>
              
              <div className="shrink-0 relative">
                <div className={`w-36 h-36 md:w-48 md:h-48 overflow-hidden border-2 rounded-sm bg-deepbase transition-colors duration-300 ${isWarningActive ? 'border-alert shadow-[0_0_30px_rgba(255,0,60,0.5)]' : 'border-mint/50 shadow-[0_0_30px_rgba(0,242,255,0.3)]'}`}>
                  <img src="https://i.postimg.cc/8PsB4L9w/4.png" alt="MARCO" className={`w-full h-full object-cover transition-all duration-300 ${isWarningActive ? 'brightness-150 saturate-[2] contrast-125' : 'brightness-125 contrast-110 saturate-[1.2]'}`} />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                </div>
                <div className={`absolute -bottom-4 -right-4 text-deepbase text-xs font-black px-4 py-1.5 uppercase tracking-tighter transition-colors duration-300 shadow-xl ${isWarningActive ? 'bg-alert text-offwhite' : 'bg-mint'}`}>FUSE // V-SYNC</div>
              </div>
              
              <div className="flex-1 text-center md:text-left flex flex-col justify-between">
                <div className="mb-8 md:mb-0">
                  <div className="flex justify-center md:justify-between items-center mb-5">
                    <span className={`font-mono text-[11px] font-black tracking-[0.4em] uppercase opacity-60 transition-colors duration-300 ${isWarningActive ? 'text-alert' : 'text-mint'}`}>Intercepted_Comms // 2017.09.14</span>
                    <div className="hidden md:flex space-x-1.5">
                      <div className={`w-2 h-2 rounded-full animate-ping ${isWarningActive ? 'bg-alert' : 'bg-alert'}`}></div>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${isWarningActive ? 'bg-alert' : 'bg-mint'}`}></div>
                    </div>
                  </div>
                  
                  <h2 className="text-offwhite font-sans text-2xl md:text-3xl font-black tracking-tight leading-snug drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {isWarningActive ? (
                      <span className="text-alert">"함부로 손대지 마. <br />네 손가락을 다 날려버릴 수도 있으니까."</span>
                    ) : (
                      <>"뭐야, <span className="text-mint">이 작은 꼬맹이는?</span><br />스파이인건가?"</>
                    )}
                  </h2>
                  
                  <div className="mt-6 flex flex-col space-y-2 opacity-40">
                    <p className={`font-mono text-[9px] uppercase tracking-[0.4em] ${isWarningActive ? 'text-alert' : 'text-mint/80'}`}>Target_ID: UNKNOWN_INVADER</p>
                    <p className={`font-mono text-[9px] uppercase tracking-[0.4em] ${isWarningActive ? 'text-alert' : 'text-mint/80'}`}>Location: BLACKSITE_01_ENTRANCE</p>
                  </div>
                </div>
                
                <button 
                  onClick={handleConnect}
                  className={`w-full md:w-auto self-center md:self-end font-mono text-xl font-black uppercase tracking-[0.8em] md:tracking-[1.2em] px-14 py-6 transition-all duration-300 relative overflow-hidden group/btn rounded-sm border-2 border-transparent ${
                    isWarningActive 
                      ? 'bg-alert text-offwhite animate-pulse shadow-[0_0_50px_#ff003c]' 
                      : 'bg-mint text-deepbase hover:bg-offwhite hover:shadow-[0_0_50px_#00f2ff]'
                  } active:scale-95`}
                >
                  <span className="relative z-10 pl-[0.8em] md:pl-[1.2em]">START</span>
                  <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </div>
            
            <div className={`mt-6 text-[10px] font-mono tracking-[0.8em] uppercase text-center font-bold transition-colors duration-300 ${isWarningActive ? 'text-alert/60' : 'text-mint/30'}`}>
              EREBOS: Team Nebula Tactical Protocol
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-300%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
        @keyframes cinematic-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-500vw); }
        }
        .animate-cinematic-slide {
          animation: cinematic-slide 75s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
