
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-mint/10 bg-deepbase py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
        <div className="text-center md:text-left flex flex-col">
          <div className="flex items-center justify-center md:justify-start space-x-5 mb-8 opacity-40 hover:opacity-100 transition-opacity">
            {/* Minimal New Logo */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-mint">
              <path d="M25 25 L35 25 L75 75 L65 75 Z" />
              <path d="M25 25 L35 25 L35 75 L25 75 Z" />
              <path d="M65 25 L75 25 L75 75 L65 75 Z" />
            </svg>
            <div className="w-[1px] h-6 bg-mint/30"></div>
            <span className="font-mono text-[10px] tracking-[0.5em] text-mint uppercase font-black">Erebos // Team Nebula Archive</span>
          </div>
          <p className="font-mono text-xs text-offwhite/60 tracking-widest mb-3 uppercase leading-relaxed font-medium">
            © 2026 EREBOS PMC. Unauthorized access is strictly prohibited.<br />
            All operational data is classified under the Singapore Security Act.
          </p>
          <p className="text-[10px] text-mint/30 font-mono tracking-widest uppercase font-bold">
            System Identity: Raffles-45-TCC // Version: 4.2.7-NEBULA-CORE
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <p className="font-mono text-[10px] text-mint mb-6 uppercase tracking-[0.6em] font-black underline decoration-mint/40 underline-offset-8">Contact Protocol</p>
          <p className="text-sm text-offwhite/80 font-medium leading-relaxed max-w-sm">
            암호화된 통신 채널을 통해서만 접수 가능합니다. 모든 통신은 실시간으로 모니터링 및 기록됩니다.
          </p>
          <div className="mt-8 flex space-x-8 font-mono text-[9px] text-mint/40 uppercase tracking-[0.4em] font-black">
             <span className="hover:text-mint transition-colors cursor-help border-b border-transparent hover:border-mint">TCC Alpha Node</span>
             <span className="hover:text-mint transition-colors cursor-help border-b border-transparent hover:border-mint">Argos Uplink</span>
             <span className="hover:text-mint transition-colors cursor-help border-b border-transparent hover:border-mint">BlackSite HQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
