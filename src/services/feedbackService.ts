import { Feedback, EmojiRating } from "@/types/feedback";

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api/feedback';

export const saveFeedback = async (emoji: EmojiRating, comment?: string): Promise<Feedback> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emoji, comment }),
  });

  if (!response.ok) {
    throw new Error('Failed to save feedback');
  }

  const data: Feedback = await response.json();
  return data;
};

export const getFeedbackList = async (): Promise<Feedback[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }

  const data: Feedback[] = await response.json();
  return data;
};

export const clearAllFeedback = async (): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to clear feedback');
  }
};

export const getFeedbackStats = async () => {
  const allFeedback = await getFeedbackList();
  const total = allFeedback.length;
  if (total === 0) return { total: 0, counts: {}, percentages: {} };
  const counts = allFeedback.reduce((acc, item) => {
    acc[item.emoji] = (acc[item.emoji] || 0) + 1;
    return acc;
  }, {} as Record<EmojiRating, number>);
  const percentages = Object.entries(counts).reduce((acc, [key, count]) => {
    acc[key as EmojiRating] = Math.round((count / total) * 100);
    return acc;
  }, {} as Record<EmojiRating, number>);
  return { total, counts, percentages };
};