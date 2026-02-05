
import React, { useState, useEffect, useRef } from 'react';
import { TEAM_MEMBERS } from '../constants';
import { CharacterProfile } from '../types';

// 멤버별 컬러 맵 정의
const MEMBER_COLORS: Record<string, { primary: string; shadow: string; bg: string }> = {
  nox: { primary: '#4ade80', shadow: 'rgba(74, 222, 128, 0.4)', bg: 'rgba(74, 222, 128, 0.1)' }, // Bright Green
  link: { primary: '#38bdf8', shadow: 'rgba(56, 189, 248, 0.4)', bg: 'rgba(56, 189, 248, 0.1)' }, // Sky Blue
  caffeine: { primary: '#facc15', shadow: 'rgba(250, 204, 21, 0.4)', bg: 'rgba(250, 204, 21, 0.1)' }, // Yellow
  fuse: { primary: '#ff003c', shadow: 'rgba(255, 0, 60, 0.4)', bg: 'rgba(255, 0, 60, 0.1)' }, // Alert Red (Default)
};

const HeartbeatGraph: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="relative w-full h-12 overflow-hidden bg-deepbase/50 border rounded-sm" style={{ borderColor: `${color}33` }}>
      <svg viewBox="0 0 200 40" className="w-full h-full fill-none" style={{ stroke: color }} preserveAspectRatio="none">
        <path d="M0 20 L20 20 L25 15 L30 20 L40 20 L45 5 L50 35 L55 20 L70 20 L75 12 L80 20 L100 20 L120 20 L125 15 L130 20 L140 20 L145 5 L150 35 L155 20 L170 20 L175 12 L180 20 L200 20" strokeWidth="2" className="animate-ekg" />
      </svg>
      <style>{`
        @keyframes ekg {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ekg { animation: ekg 2s linear infinite; stroke-dasharray: 200; }
      `}</style>
    </div>
  );
};

const MemberProfiles: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<CharacterProfile | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleMemberSelect = (member: CharacterProfile) => {
    setIsDecrypting(true);
    setSelectedMember(member);
    
    // 복호화 애니메이션 후 스크롤 실행
    setTimeout(() => {
      setIsDecrypting(false);
      if (detailsRef.current) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = detailsRef.current.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 400);
  };

  const getTheme = (id: string) => MEMBER_COLORS[id] || MEMBER_COLORS.fuse;

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-16 border-l-4 border-alert pl-6">
        <h2 className="text-3xl font-bold tracking-tight uppercase hologram-text text-offwhite">Operative Dossier [UNLOCKED]</h2>
        <p className="text-alert/60 font-sans text-[10px] mt-2 tracking-[0.3em] uppercase font-black">BYPASSED SECURITY LAYER // 바이오 데이터 유출됨</p>
      </div>

      {/* 대원 선택 그리드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {TEAM_MEMBERS.map((member) => {
          const theme = getTheme(member.id);
          const isSelected = selectedMember?.id === member.id;
          
          return (
            <div 
              key={member.id}
              onClick={() => handleMemberSelect(member)}
              className={`group relative tactical-border transition-all cursor-pointer overflow-hidden bg-darkteal/20`}
              style={{ 
                borderColor: isSelected ? theme.primary : 'rgba(255, 255, 255, 0.05)',
                boxShadow: isSelected ? `0 0 30px ${theme.shadow}` : 'none'
              }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={member.codeName} 
                  className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? 'grayscale-0 opacity-100' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepbase via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="font-mono text-[9px] mb-1 uppercase tracking-widest font-bold opacity-60" style={{ color: theme.primary }}>[{member.position}]</p>
                  <h3 className="text-2xl font-black tracking-tighter uppercase text-offwhite transition-colors" style={{ color: isSelected ? theme.primary : '' }}>[{member.codeName}]</h3>
                </div>
              </div>
              <div className={`absolute top-0 right-0 p-2 font-mono text-[8px] ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                 <span className="animate-pulse font-black" style={{ color: theme.primary }}>● INTERCEPTING...</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 상세 정보창 */}
      <div ref={detailsRef} className="scroll-mt-32">
        {selectedMember ? (
          <div className="relative">
            {isDecrypting && (
              <div className="absolute inset-0 z-50 bg-deepbase flex flex-col items-center justify-center font-mono animate-glitch-fast">
                 <span className="text-2xl font-black mb-4" style={{ color: getTheme(selectedMember.id).primary }}>DECRYPTING DATA...</span>
                 <div className="w-48 h-1 overflow-hidden" style={{ backgroundColor: `${getTheme(selectedMember.id).primary}33` }}>
                   <div className="h-full animate-[loading_0.4s_linear]" style={{ backgroundColor: getTheme(selectedMember.id).primary }}></div>
                 </div>
              </div>
            )}
            
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 bg-darkteal/10 border p-8 md:p-12 backdrop-blur-xl rounded-sm" style={{ borderColor: `${getTheme(selectedMember.id).primary}4D` }}>
              <button 
                onClick={() => setSelectedMember(null)} 
                className="absolute top-6 right-6 transition-colors"
                style={{ color: `${getTheme(selectedMember.id).primary}66` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 hover:scale-110 transition-transform"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="space-y-8">
                <div className="border-b pb-8" style={{ borderBottomColor: `${getTheme(selectedMember.id).primary}33` }}>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase hologram-text" style={{ color: getTheme(selectedMember.id).primary, textShadow: `0 0 10px ${getTheme(selectedMember.id).shadow}` }}>
                    {selectedMember.codeName}
                  </h3>
                  <p className="text-offwhite font-bold font-mono uppercase tracking-[0.2em] text-sm">{selectedMember.realName}</p>
                  <p className="text-[10px] font-mono mt-4 uppercase tracking-widest font-black opacity-60" style={{ color: getTheme(selectedMember.id).primary }}>{selectedMember.nationality}</p>
                </div>
                
                <div className="p-6 border-l-2 italic text-sm font-medium" style={{ backgroundColor: getTheme(selectedMember.id).bg, borderColor: getTheme(selectedMember.id).primary, color: getTheme(selectedMember.id).primary }}>
                  "{selectedMember.keyPhrase}"
                </div>

                {/* 대원 전술적 신체/기록 데이터 그리드 */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-xs font-mono">
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-40 mb-1" style={{ color: getTheme(selectedMember.id).primary }}>STATUS</p>
                    <p className="font-black" style={{ color: getTheme(selectedMember.id).primary }}>STOLEN_DATA</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-40 mb-1" style={{ color: getTheme(selectedMember.id).primary }}>MBTI</p>
                    <p className="text-offwhite font-bold">{selectedMember.mbti}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-40 mb-1" style={{ color: getTheme(selectedMember.id).primary }}>AGE</p>
                    <p className="text-offwhite font-bold">{selectedMember.age} YEARS</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-40 mb-1" style={{ color: getTheme(selectedMember.id).primary }}>BORN</p>
                    <p className="text-offwhite font-bold">{selectedMember.birthday}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-40 mb-1" style={{ color: getTheme(selectedMember.id).primary }}>HEIGHT</p>
                    <p className="text-offwhite font-bold">{selectedMember.height}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-40 mb-1" style={{ color: getTheme(selectedMember.id).primary }}>WEIGHT</p>
                    <p className="text-offwhite font-bold">{selectedMember.weight}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-10 lg:border-x lg:px-12" style={{ borderColor: `${getTheme(selectedMember.id).primary}33` }}>
                <div>
                  <h4 className="font-mono text-[10px] mb-4 uppercase tracking-[0.4em] font-black underline underline-offset-4" style={{ color: getTheme(selectedMember.id).primary, textDecorationColor: `${getTheme(selectedMember.id).primary}66` }}>DOSSIER</h4>
                  <p className="text-offwhite/80 leading-relaxed text-[13px]">{selectedMember.description}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] mb-4 uppercase tracking-[0.4em] font-bold opacity-40" style={{ color: getTheme(selectedMember.id).primary }}>VISUAL</h4>
                  <ul className="text-offwhite/70 text-[12px] space-y-3">
                    {selectedMember.appearance.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2" style={{ color: getTheme(selectedMember.id).primary }}>»</span>{item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="font-mono text-[10px] mb-4 uppercase tracking-[0.4em] font-black underline underline-offset-4" style={{ color: getTheme(selectedMember.id).primary, textDecorationColor: `${getTheme(selectedMember.id).primary}66` }}>RESTRICTED_HISTORY</h4>
                  <ul className="text-offwhite/70 text-[12px] space-y-3">
                    {selectedMember.past.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2" style={{ color: getTheme(selectedMember.id).primary }}>»</span>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] mb-4 uppercase tracking-[0.4em] font-bold opacity-40" style={{ color: getTheme(selectedMember.id).primary }}>TRAITS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.traits.map((item, i) => (
                      <span key={i} className="px-3 py-1 text-[10px] border uppercase font-black" style={{ backgroundColor: getTheme(selectedMember.id).bg, color: getTheme(selectedMember.id).primary, borderColor: `${getTheme(selectedMember.id).primary}4D` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-8 border-t" style={{ borderColor: `${getTheme(selectedMember.id).primary}33` }}>
                  <p className="font-mono text-[9px] mb-4 uppercase font-black" style={{ color: getTheme(selectedMember.id).primary }}>BIOMETRIC_INTERCEPT</p>
                  <HeartbeatGraph color={getTheme(selectedMember.id).primary} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-alert/30 rounded-sm bg-alert/5">
            <p className="text-alert font-mono uppercase text-xs tracking-[0.5em] animate-pulse font-black">Waiting for Data Injection...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberProfiles;
