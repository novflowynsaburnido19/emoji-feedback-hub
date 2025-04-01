
import { Feedback, EmojiRating } from "@/types/feedback";

const STORAGE_KEY = 'registrar_feedback';

export const saveFeedback = (rating: EmojiRating, comment?: string): Feedback => {
  const feedback: Feedback = {
    id: Date.now().toString(),
    rating,
    comment,
    timestamp: Date.now(),
  };

  const existing = getFeedbackList();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, feedback]));
  
  return feedback;
};

export const getFeedbackList = (): Feedback[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const clearAllFeedback = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getFeedbackStats = () => {
  const allFeedback = getFeedbackList();
  const total = allFeedback.length;
  
  if (total === 0) return { total: 0, counts: {}, percentages: {} };
  
  const counts = allFeedback.reduce((acc, item) => {
    acc[item.rating] = (acc[item.rating] || 0) + 1;
    return acc;
  }, {} as Record<EmojiRating, number>);
  
  const percentages = Object.entries(counts).reduce((acc, [key, count]) => {
    acc[key as EmojiRating] = Math.round((count / total) * 100);
    return acc;
  }, {} as Record<EmojiRating, number>);
  
  return { total, counts, percentages };
};
