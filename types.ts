
export type Mode = 'morning' | 'evening';

export type ZikrType = 'shared' | 'morning' | 'evening';

export interface Zikr {
  id: number;
  title: string;
  text?: string;
  morningText?: string;
  eveningText?: string;
  count: number;
  type: ZikrType;
}

export interface CompletedAzkar {
  [key: number]: number;
}
