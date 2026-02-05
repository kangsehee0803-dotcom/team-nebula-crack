
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isCinematic: boolean;
  setIsCinematic: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isCinematic, setIsCinematic }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const MUSIC_FEED_URL = "https://suno.com/s/zGeL3xXjwikEoJBu";
  const audioSourceLabel = "NEBULA_TEAM_MUSIC";

  const navItems = [
    { label: 'DASHBOARD', id: 'home' },
    { label: 'UNIVERSE', id: 'universe' },
    { label: 'TEAM NEBULA', id: 'members' },
    { label: 'PROTOCOLS', id: 'protocols' },
    { label: 'OPS LOG', id: 'logs' },
  ];

  useEffect(() => {
    if (isCinematic) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCinematic]);

  const handleNavClick = (id: string) => {
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
    setIsMenuOpen(false);
  };

  const openMusicFeed = () => {
    window.open(MUSIC_FEED_URL, '_blank');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${isCinematic ? 'bg-transparent border-transparent' : 'bg-deepbase/90 backdrop-blur-md border-b border-darkteal/30'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* LOGO & CINEMATIC TOGGLE (The 'n' Icon) */}
          <div className="flex items-center space-x-3 shrink-0 group">
            <div 
              className={`relative w-10 h-10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-95 cursor-pointer ${isCinematic ? 'bg-mint/20 ring-2 ring-mint rounded-sm z-[210]' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // App의 전역 클릭 이벤트 방해 방지
                setIsCinematic(!isCinematic);
              }}
              title={isCinematic ? "UI 복구" : "시네마틱 슬라이드쇼"}
            >
              <svg viewBox="0 0 100 100" className={`absolute w-full h-full fill-none stroke-[2px] duration-700 ${isCinematic ? 'stroke-mint animate-pulse' : 'stroke-mint/20 group-hover:stroke-mint/50'}`}>
                <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" />
              </svg>
              <svg viewBox="0 0 100 100" className={`w-6 h-6 fill-mint transition-all ${isCinematic ? 'scale-125 drop-shadow-[0_0_15px_#00f2ff]' : 'group-hover:drop-shadow-[0_0_8px_#00f2ff]'}`}>
                <path d="M25 25 L35 25 L75 75 L65 75 Z" />
                <path d="M25 25 L35 25 L35 75 L25 75 Z" />
                <path d="M65 25 L75 25 L75 75 L65 75 Z" />
              </svg>
            </div>
            {!isCinematic && (
              <span className="hidden sm:block font-mono font-black text-lg hologram-text uppercase text-offwhite animate-in fade-in slide-in-from-left-2 duration-500">
                EREBOS <span className="text-mint/40">//</span> NEBULA
              </span>
            )}
          </div>

          {/* Tactical Music Link HUD */}
          {!isCinematic && (
            <div className="audio-hud flex-1 max-w-[280px] md:max-w-md bg-darkteal/60 border border-mint/20 p-2 rounded-sm transition-all duration-300 relative flex flex-col group/hud hover:border-mint/60 hover:bg-darkteal/80 animate-in fade-in duration-500">
              <div className="flex items-center gap-4">
                <button 
                  onClick={openMusicFeed}
                  title="Open External Music Feed"
                  className="w-12 h-12 shrink-0 flex items-center justify-center border border-white/20 bg-white/5 text-offwhite transition-all rounded-sm hover:bg-mint/20 hover:border-mint hover:text-mint active:scale-90"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </button>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-end mb-1">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[11px] font-mono font-black tracking-widest truncate uppercase text-offwhite/80 group-hover/hud:text-mint transition-colors">
                          {audioSourceLabel}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-mint/70 uppercase tracking-tighter font-bold animate-pulse">
                        아이콘을 눌러 사이트로 이동해주세요
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold block leading-none ml-2 text-mint/40 italic">LINK</span>
                  </div>

                  <div className="relative w-full h-4 overflow-hidden bg-black/60 rounded-sm border border-white/5">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_24px,rgba(0,242,255,0.2)_25px),linear-gradient(rgba(0,242,255,0.2)_1px,transparent_1px)] bg-[size:25px_6px]"></div>
                    <div className="absolute inset-0 flex items-center">
                      <svg viewBox="0 0 400 40" className="w-full h-full fill-none preserve-3d overflow-visible">
                        <path 
                          d="M0 20 L40 20 L50 10 L60 30 L70 5 L80 35 L90 20 L130 20 L140 10 L150 30 L160 5 L170 35 L180 20 L220 20 L230 10 L240 30 L250 5 L260 35 L270 20 L310 20 L320 10 L330 30 L340 5 L350 35 L360 20 L400 20" 
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="stroke-mint/30 animate-ekg-scroll"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {!isCinematic && (
            <nav className="hidden xl:flex space-x-6 animate-in fade-in duration-500">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-mono text-xs tracking-[0.2em] transition-all hover:text-mint group relative py-2 ${
                    activeSection === item.id ? 'text-mint font-black' : 'text-offwhite/40'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-mint transition-all duration-300 ${activeSection === item.id ? 'w-full shadow-[0_0_10px_#00f2ff]' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              ))}
            </nav>
          )}

          {!isCinematic && (
            <button 
              className="xl:hidden text-mint p-2 active:bg-mint/10 rounded-full transition-colors animate-in fade-in duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path d="M4 6h16M4 12h16m-7 6h7"/></svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {!isCinematic && isMenuOpen && (
          <div className="fixed inset-0 h-screen w-screen bg-black z-[105] flex flex-col items-center justify-center transition-all duration-200 xl:hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#7000ff_0%,_transparent_70%)]"></div>
            <nav className="flex flex-col items-center space-y-8 relative z-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-mono text-2xl tracking-[0.4em] uppercase transition-all active:scale-95 ${
                    activeSection === item.id ? 'text-mint font-black drop-shadow-[0_0_15px_#00f2ff]' : 'text-offwhite/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={openMusicFeed}
                className="font-mono text-xl tracking-[0.4em] uppercase text-alert mt-8 border border-alert/30 px-6 py-3 hover:bg-alert/10 transition-all"
              >
                EXTERNAL MUSIC FEED
              </button>
            </nav>
          </div>
        )}
      </header>

      <style>{`
        @keyframes ekg-scroll {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-ekg-scroll {
          stroke-dasharray: 400;
          animation: ekg-scroll 5s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Header;
