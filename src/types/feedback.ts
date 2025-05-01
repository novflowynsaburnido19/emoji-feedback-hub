export type EmojiRating = 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very_dissatisfied';

export interface Feedback {
  id: string;
  emoji: EmojiRating;
  comment?: string;
  timestamp: string; 
}