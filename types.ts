
export interface CharacterProfile {
  id: string;
  codeName: string;
  realName: string;
  position: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  mbti: string;
  birthday: string;
  nationality: string;
  keyPhrase: string;
  description: string;
  appearance: string[];
  personality: string[];
  past: string[];
  traits: string[];
  imageUrl: string;
}

export type ViewState = 'HOME' | 'MEMBERS' | 'UNIVERSE' | 'LOGS';
