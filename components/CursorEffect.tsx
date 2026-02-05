
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface BulletHole {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

const CursorEffect: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);
  
  const onMouseMove = useCallback((e: MouseEvent) => {
    setTargetPos({ x: e.clientX, y: e.clientY });
    
    const target = e.target as HTMLElement;
    const isClickable = !!(
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' || 
      target.closest('button') || 
      target.closest('a') || 
      window.getComputedStyle(target).cursor === 'pointer'
    );
    
    setIsHovering(isClickable);
  }, []);

  const onMouseDown = useCallback((e: MouseEvent) => {
    setIsPressed(true);

    const target = e.target as HTMLElement;
    const isClickable = !!(
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' || 
      target.closest('button') || 
      target.closest('a') || 
      window.getComputedStyle(target).cursor === 'pointer'
    );

    if (!isClickable) {
      const newHole: BulletHole = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360,
      };
      
      setBulletHoles(prev => [...prev, newHole]);

      setTimeout(() => {
        setBulletHoles(prev => prev.filter(h => h.id !== newHole.id));
      }, 2000);
    }
  }, []);

  const onMouseUp = useCallback(() => setIsPressed(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    let animationFrameId: number;
    const updateCursor = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.45,
        y: prev.y + (targetPos.y - prev.y) * 0.45
      }));
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos, onMouseMove, onMouseDown, onMouseUp]);

  return (
    <div className="custom-cursor-container">
      {/* Bullet Holes Rendering Area */}
      {bulletHoles.map((hole) => (
        <div 
          key={hole.id}
          className="fixed pointer-events-none z-40 animate-out fade-out duration-1000 fill-mode-forwards"
          style={{ 
            left: `${hole.x}px`, 
            top: `${hole.y}px`, 
            transform: `translate(-50%, -50%) rotate(${hole.rotation}deg)`,
            animationDelay: '1s'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 w-8 h-8 bg-alert/40 rounded-full blur-md animate-ping opacity-0" style={{ animationIterationCount: 1, animationDuration: '0.3s' }}></div>
            <svg width="24" height="24" viewBox="0 0 24 24" className="filter drop-shadow-[0_0_2px_rgba(255,0,60,0.5)]">
              <circle cx="12" cy="12" r="3" fill="#050510" />
              <path d="M12 9L11 4M13 15L14 20M9 12L4 11M15 13L20 14M10 10L6 6M14 14L18 18M10 14L6 18M14 10L18 6" stroke="#ff003c" strokeWidth="0.5" strokeOpacity="0.6" />
              <circle cx="12" cy="12" r="5" fill="rgba(255,0,60,0.1)" />
            </svg>
          </div>
        </div>
      ))}

      {/* Hardware-synced Aim Dot */}
      <div 
        className={`fixed w-1 h-1 rounded-full pointer-events-none z-[101] transition-colors duration-100 ${isPressed ? 'bg-alert shadow-[0_0_8px_#ff003c]' : 'bg-mint'}`}
        style={{ left: `${targetPos.x}px`, top: `${targetPos.y}px`, transform: `translate(-50%, -50%)` }}
      />

      {/* Trailing Crosshair */}
      <div 
        className={`fixed pointer-events-none z-[99] transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-60'}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: `translate(-50%, -50%)` }}
      >
        <div className={`border rounded-full transition-all duration-150 ease-out flex items-center justify-center ${
          isPressed ? 'w-10 h-10 border-alert border-2 bg-alert/5' : isHovering ? 'w-9 h-9 border-mint border-2' : 'w-12 h-12 border-mint/20 border-dashed animate-[spin_10s_linear_infinite]'
        }`}>
           {!isPressed && <div className="w-4 h-4 border border-mint/10 rounded-full"></div>}
        </div>
        
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px transition-all ${isPressed ? 'bg-alert w-8' : isHovering ? 'bg-mint/60 w-10' : 'bg-mint/20 w-12'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-px transition-all ${isPressed ? 'bg-alert h-8' : isHovering ? 'bg-mint/60 h-10' : 'bg-mint/20 h-12'}`} />

        <div className={`absolute top-8 left-8 whitespace-nowrap transition-transform duration-200 ${isPressed ? 'scale-90 translate-x-[-2px] translate-y-[-2px]' : ''}`}>
           <div className={`font-mono text-[7px] font-black tracking-tighter transition-colors ${isPressed ? 'text-alert' : 'text-mint/60'}`}>
              COORD // {Math.round(mousePos.x)}:{Math.round(mousePos.y)}
           </div>
           <div className={`font-mono text-[6px] uppercase transition-colors font-bold ${isPressed ? 'text-alert animate-pulse' : isHovering ? 'text-mint' : 'text-mint/30'}`}>
              {isPressed ? 'LOCK_ENGAGED' : isHovering ? 'TARGET_IN_SIGHT' : 'SCANNING_FEED...'}
           </div>
        </div>
      </div>

      {/* Snap Ripple Effect */}
      {isPressed && (
        <div 
          className="fixed w-6 h-6 border-2 border-alert rounded-full animate-ping pointer-events-none opacity-40"
          style={{ left: `${targetPos.x}px`, top: `${targetPos.y}px`, transform: `translate(-50%, -50%)` }}
        />
      )}
    </div>
  );
};

export default CursorEffect;
