
import React from 'react';
import { WORLD_DATA } from '../constants';

const WorldBuilding: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-1000">
      <div className="mb-10 border-l-2 border-mint pl-6">
        <h2 className="text-2xl font-bold tracking-tight uppercase hologram-text text-offwhite">Strategic Briefing</h2>
        <p className="text-mint/60 font-mono text-[10px] mt-1 tracking-[0.3em] uppercase">Erebos Unit Nebula // Universe Protocol</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORLD_DATA.summary.map((item, i) => (
          <div key={i} className={`bg-darkteal/10 border border-mint/10 p-6 tactical-border group hover:border-mint/40 transition-all backdrop-blur-sm ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-1.5 h-1.5 bg-mint/50 rounded-full group-hover:bg-mint transition-colors shadow-[0_0_5px_#acf8e6]"></div>
              <h3 className="text-sm font-black text-mint uppercase tracking-widest">{item.title}</h3>
            </div>
            <p className="text-[12px] text-offwhite/90 leading-relaxed font-normal">
              {item.desc}
            </p>
            {/* Visual HUD detail */}
            <div className="mt-6 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="h-[1px] flex-1 bg-mint/20"></div>
              <span className="font-mono text-[8px] ml-3 text-mint/60 uppercase">Secured</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-end border-t border-darkteal/30 pt-8">
        <div className="hidden sm:block text-[9px] text-mint/40 font-mono tracking-[0.5em] uppercase italic">
          &lt;&lt; Strategic Intelligence Summary Complete &gt;&gt;
        </div>
      </div>
    </div>
  );
};

export default WorldBuilding;