
import React, { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: number;
  time: string;
  sender: string;
  message: string;
  type: 'INFO' | 'COMMS' | 'ALERT';
}

interface CharacterThought {
  sender: string;
  thought: string;
}

const OperationalLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeThought, setActiveThought] = useState<CharacterThought | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const characterThoughts: Record<string, string[]> = {
    'NOX': [
      "변수 0.02%. 오차 범위 내다. 하지만 리암의 데이터는 가끔 너무 낙관적이야.",
      "오른다리가 평소보다 쑤시는군. 비가 오려나.",
      "제이슨, 잡담하지 말고 시야나 확보해. 저 녀석은 긴장을 안 하는 게 문제야.",
      "아이들의 안전이 최우선이다. 에레보스의 이익은 그 다음이지."
    ],
    'LINK': [
      "풍속 2노트, 남서풍. 완벽한 저격 타이밍인데 보스는 너무 신중해.",
      "이번 작전 끝나면 진짜 맛있는 커피 한 잔 마시고 싶네.",
      "드론 배터리 15%... 아슬아슬하구만. 보스한테는 비밀로 할까?",
      "마르코 녀석, 또 방독면 안 쓰고 폭파하러 들어갔네. 무식하긴."
    ],
    'FUSE': [
      "C4 설치 완료. 이제 '예술'을 감상할 시간인가?",
      "리처드 보스, 가끔은 복잡하게 생각하지 말고 그냥 다 날려버리면 안 되나?",
      "심박수가 좀 빠른데... 아드레날린인가, 아니면 어제 먹은 타코 때문인가.",
      "이 문만 열면 끝이다. 네뷸라의 방식대로 화끈하게 가보자고."
    ],
    'CAFFEINE': [
      "시스템 침입까지 10초. 관리자 권한 획득 완료. 인간들은 너무 허술해.",
      "퓨즈, 제발 폭파할 때 파편 좀 신경 써요. 치료해 주기 귀찮으니까.",
      "잠 좀 자고 싶다. 카페인 수치가 위험군이군. 보스 몰래 한 캔 더 마실까.",
      "모든 생체 신호가 격렬해지고 있어. 전쟁터는 이래서 비효율적이야."
    ]
  };

  const initialLogs: LogEntry[] = [
    { id: 1, time: '22:45:01', sender: 'SYSTEM', message: 'ARGOS NETWORK ESTABLISHED. ENCRYPTION: SECURE.', type: 'INFO' },
    { id: 2, time: '22:45:12', sender: 'NOX', message: '네뷸라 전원 들리나. 작전 개시 10분 전이다. 최종 체크해.', type: 'COMMS' },
    { id: 3, time: '22:45:18', sender: 'LINK', message: '보스, 여긴 준비 끝. 드론 띄워서 3번 입구 시야 확보했어.', type: 'COMMS' },
    { id: 4, time: '22:45:25', sender: 'FUSE', message: '문 따는 건 걱정 마. 벌써 손이 근질근질하니까.', type: 'COMMS' },
    { id: 5, time: '22:45:31', sender: 'CAFFEINE', message: '퓨즈, 심박수 너무 높아요. 진정해요. 데이터 꼬이면 책임 안 집니다.', type: 'COMMS' },
    { id: 6, time: '22:45:40', sender: 'NOX', message: '카페인, 실시간 생체 데이터 전송 시작해. 즉시 보고하도록.', type: 'COMMS' },
  ];

  useEffect(() => {
    setLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle feed click
  const handleFeedClick = (name: string) => {
    const thoughts = characterThoughts[name];
    if (thoughts) {
      const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
      setActiveThought({ sender: name, thought: randomThought });
      
      // Auto close after 4 seconds
      setTimeout(() => {
        setActiveThought(prev => (prev?.sender === name ? null : prev));
      }, 4000);
    }
  };

  const startChat = () => {
    window.location.href = 'https://crack.wrtn.ai/detail/69819a4b36f38ed999b1a6ac';
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-1000 relative">
      <div className="mb-16 border-l-4 border-nebula pl-6">
        <h2 className="text-3xl font-bold tracking-tight uppercase hologram-text text-offwhite">Operational Logs</h2>
        <p className="text-mint/60 font-mono text-xs mt-2 tracking-[0.3em] uppercase font-bold">Real-Time Tactical Communication Stream</p>
      </div>

      <div className="bg-deepbase border border-nebula/40 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[500px] md:h-[700px] rounded-lg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nebula/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="bg-darkteal/40 px-6 py-4 border-b border-nebula/20 flex justify-between items-center shrink-0 backdrop-blur-md relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-mint rounded-full animate-pulse shadow-[0_0_12px_#00f2ff]"></div>
            <span className="font-mono text-[11px] text-offwhite uppercase tracking-[0.3em] font-black">Secure Stream [NEBULA-DIRECT-01]</span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] text-mint/60 tracking-widest font-bold">OS-TIME: 2017-09-14 // 22:45:45</span>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 font-mono text-xs md:text-sm relative z-10"
        >
          {logs.map((log) => (
            <div key={log.id} className="flex space-x-4 group border-l-2 border-nebula/10 pl-4 hover:border-nebula/40 transition-colors">
              <span className="text-mint/20 flex-shrink-0 font-bold opacity-70">[{log.time}]</span>
              <div className="flex-1">
                <span className={`font-black mr-3 tracking-widest px-2 py-0.5 rounded text-[10px] ${
                  log.sender === 'NOX' ? 'text-deepbase bg-mint shadow-[0_0_8px_#00f2ff]' :
                  log.sender === 'LINK' ? 'text-mint border border-mint/40 bg-mint/5' :
                  log.sender === 'FUSE' ? 'text-accent border border-accent/40 bg-accent/5' :
                  log.sender === 'CAFFEINE' ? 'text-nebula border border-nebula/40 bg-nebula/5' :
                  'text-mint/40'
                }`}>
                  {log.sender}
                </span>
                <span className="text-offwhite/90 font-medium leading-relaxed drop-shadow-sm">{log.message}</span>
              </div>
            </div>
          ))}
          <div className="animate-pulse flex space-x-4 items-center pl-4 border-l border-transparent">
             <span className="text-mint/10 font-bold">[--:--:--]</span>
             <div className="flex space-x-1">
               <div className="w-1.5 h-1.5 bg-mint rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
               <div className="w-1.5 h-1.5 bg-mint rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
               <div className="w-1.5 h-1.5 bg-mint rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
             </div>
             <span className="text-mint font-mono text-[11px] uppercase tracking-widest font-black drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">Intercepting Comms...</span>
          </div>
        </div>

        <div className="p-6 bg-darkteal/20 border-t border-nebula/20 shrink-0 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="flex-1 bg-deepbase/80 border border-nebula/30 px-6 py-4 text-offwhite text-xs font-mono flex items-center shadow-inner rounded-sm group cursor-text transition-all hover:border-mint/30">
              <span className="mr-3 text-mint font-black select-none">{'{user}'}</span>
              <span className="text-mint/50 mr-1 italic select-none group-hover:text-mint/70 transition-colors">당신의 이야기를 만들어보세요</span>
              <span className="tactical-cursor"></span>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <button 
                onClick={startChat}
                className="w-full md:w-auto px-10 py-4 bg-nebula text-offwhite text-xs font-mono font-black hover:bg-mint hover:text-deepbase transition-all uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(112,0,255,0.3)] active:scale-95 rounded-sm"
              >
                채팅 시작
              </button>
              <p className="mt-2 text-[9px] font-mono text-mint/40 uppercase tracking-widest font-bold text-center md:text-right">
                채팅 시작을 누르면 크랙사이트로 이동됩니다
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {['NOX', 'LINK', 'FUSE', 'CAFFEINE'].map((name) => (
          <div 
            key={name} 
            onClick={() => handleFeedClick(name)}
            className="bg-darkteal/20 p-5 border border-nebula/20 transition-all hover:border-mint/60 hover:bg-darkteal/40 backdrop-blur-sm cursor-pointer group active:scale-95 rounded-lg"
          >
             <div className="flex justify-between items-center mb-4">
               <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${
                 name === 'NOX' ? 'text-mint' : 
                 name === 'LINK' ? 'text-mint/80' : 
                 name === 'FUSE' ? 'text-accent' : 
                 'text-nebula'
               }`}>{name} Feed</span>
               <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse shadow-[0_0_8px_#00f2ff]"></div>
                  <span className="text-[9px] font-mono text-offwhite font-bold opacity-60">Live</span>
               </div>
             </div>
             <div className="w-full h-1.5 bg-deepbase overflow-hidden rounded-full">
               <div className="h-full bg-gradient-to-r from-nebula to-mint shadow-[0_0_15px_#00f2ff] transition-all duration-500" style={{width: `${70 + Math.random() * 25}%`}}></div>
             </div>
             <p className="mt-3 text-[8px] text-mint/30 font-mono uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">
               Intercept Neural Feed
             </p>
          </div>
        ))}
      </div>

      {/* Neural Thought Popup */}
      {activeThought && (
        <div className="fixed bottom-12 right-6 md:right-12 z-[150] max-w-sm w-full animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-500">
           <div className="bg-[#030014]/95 backdrop-blur-2xl border-2 border-nebula p-6 shadow-[0_0_60px_rgba(112,0,255,0.3)] tactical-border rounded-lg">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-nebula/20">
                <div className="flex items-center space-x-3">
                   <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
                   <span className="font-mono text-[10px] text-mint font-black tracking-[0.2em] uppercase">Neural Intercept: {activeThought.sender}</span>
                </div>
                <button onClick={() => setActiveThought(null)} className="text-mint/30 hover:text-offwhite">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </button>
              </div>
              <p className="text-offwhite font-sans text-sm leading-relaxed italic font-medium">
                "{activeThought.thought}"
              </p>
              <div className="mt-4 flex justify-between items-center font-mono text-[8px] text-nebula/60 uppercase tracking-widest font-black">
                 <span>Argos Integrity: 98%</span>
                 <span>TCC-ALPHA Decrypted</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OperationalLogs;
