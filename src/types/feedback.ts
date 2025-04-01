
export type EmojiRating = 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very_dissatisfied';

export interface Feedback {
  id: string;
  rating: EmojiRating;
  comment?: string;
  timestamp: number;
}
