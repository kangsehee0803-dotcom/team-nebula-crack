
import React, { useState } from 'react';
import { STARTING_SETTINGS, KEYWORD_BOOK } from '../constants';

const TacticalProtocols: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const keywordData = KEYWORD_BOOK.find(k => k.word === selectedKeyword);

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
      <div className="mb-16 border-l-2 border-nebula pl-6">
        <h2 className="text-3xl font-bold tracking-tight uppercase hologram-text text-offwhite">Tactical Protocols & Lexicon</h2>
        <p className="text-mint/60 font-mono text-xs mt-2 tracking-[0.3em] uppercase font-bold">시작설정 // STARTING & 키워드북 // KEYWORDS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Starting Settings */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3 mb-6">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-mint/80">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.2 14.1H3.8L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" />
            </svg>
            <h3 className="text-xl font-black text-mint uppercase tracking-widest italic font-sans underline decoration-mint/20 underline-offset-4">STARTING // 시작 설정</h3>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {STARTING_SETTINGS.map((setting, idx) => (
              <button
                key={idx}
                onClick={() => setActiveScenario(idx)}
                className={`flex-1 min-w-[140px] px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all border ${
                  activeScenario === idx 
                    ? 'bg-mint text-deepbase border-mint font-black shadow-[0_0_15px_rgba(0,242,255,0.4)]' 
                    : 'bg-darkteal/20 text-mint/60 border-mint/20 hover:border-mint/50 hover:text-mint'
                }`}
              >
                {setting.category.split(': ')[1] || setting.category}
              </button>
            ))}
          </div>

          <div className="min-h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-darkteal/10 border border-mint/10 p-8 tactical-border relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <span className="font-mono text-[40px] font-black text-mint leading-none select-none">0{activeScenario + 1}</span>
              </div>
              
              <h4 className="font-mono text-[11px] text-mint mb-6 uppercase tracking-[0.4em] font-black underline decoration-mint/20 underline-offset-4">
                {STARTING_SETTINGS[activeScenario].category}
              </h4>
              
              <div className="space-y-6 relative z-10">
                {STARTING_SETTINGS[activeScenario].items.map((item, i) => (
                  <div key={i} className="flex flex-col border-l border-mint/10 pl-4 hover:border-mint/30 transition-colors">
                    <span className="text-[9px] text-mint/40 uppercase tracking-widest mb-1 font-bold">{item.label} // 분류</span>
                    <span className="text-offwhite text-[14px] font-medium leading-relaxed tracking-tight drop-shadow-sm">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Book - Redesigned to Grid Buttons */}
        <div className="space-y-8 flex flex-col">
          <div className="flex items-center space-x-3 mb-6">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-mint/80">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
            </svg>
            <h3 className="text-xl font-black text-mint uppercase tracking-widest italic font-sans underline decoration-mint/20 underline-offset-4">KEYWORDS // 키워드북</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
            {KEYWORD_BOOK.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedKeyword(item.word)}
                className={`px-2 py-3 font-black text-[10px] tracking-tighter uppercase transition-all border rounded-sm truncate ${
                  selectedKeyword === item.word
                    ? 'bg-mint text-deepbase border-mint shadow-[0_0_10px_rgba(0,242,255,0.4)]'
                    : 'bg-darkteal/5 text-mint/50 border-mint/10 hover:border-mint/40 hover:text-mint'
                }`}
              >
                {item.word}
              </button>
            ))}
          </div>

          {/* Keyword Details Panel */}
          <div className="flex-1 min-h-[200px] flex flex-col animate-in fade-in duration-500">
            {selectedKeyword ? (
              <div className="p-8 bg-darkteal/10 border border-mint/20 rounded-sm relative tactical-border overflow-hidden group">
                <div className="flex justify-between items-start mb-6 border-b border-mint/10 pb-4">
                  <div>
                    <span className="text-mint font-black text-2xl hologram-text uppercase tracking-widest">{selectedKeyword}</span>
                    <p className="text-mint/40 font-mono text-[8px] uppercase tracking-widest mt-1 font-bold">SYSTEM COMMAND // 시스템 명령어</p>
                  </div>
                  <span className="font-mono text-[10px] text-mint/20 font-black animate-pulse uppercase">STATUS: DECRYPTED</span>
                </div>

                <div className="relative">
                  <p className="text-offwhite/80 text-[14px] leading-relaxed font-medium pl-4 border-l-2 border-mint/40">
                    {keywordData?.definition}
                  </p>
                  <div className="mt-8 flex items-center space-x-2 text-mint/30 font-mono text-[8px] uppercase font-bold">
                      <div className="w-1 h-1 bg-mint/50 rounded-full animate-pulse"></div>
                      <span>Execution parameters verified // 실행 파라미터 확인됨</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-mint/10 rounded-sm bg-darkteal/5 p-12">
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-mint/10 mb-4 animate-pulse">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <p className="text-mint/40 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                  Select a Command for Data Decryption
                </p>
                <p className="text-nebula/40 text-[9px] mt-2 font-bold uppercase tracking-widest">
                  키워드를 선택하여 상세 프로토콜을 확인하십시오
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-darkteal/30">
        <p className="text-[9px] text-mint/30 font-mono tracking-[0.6em] uppercase italic text-center font-bold animate-pulse">
          &lt;&lt; Alpha Clearance Node // 허가된 대원만 접근 가능 &gt;&gt;
        </p>
      </div>
    </div>
  );
};

export default TacticalProtocols;