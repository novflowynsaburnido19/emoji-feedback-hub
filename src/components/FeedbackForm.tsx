// src/components/FeedbackForm.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EmojiRating } from '@/types/feedback';
import EmojiSelector from '@/components/EmojiSelector';
import { saveFeedback } from '@/services/feedbackService';
import { toast } from 'sonner';

export function FeedbackForm() {
  const [rating, setRating] = useState<EmojiRating | null>(null);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    try {
      // Save to DB (async) while keeping emoji selector UX
      await saveFeedback(rating, comment);
      toast.success('Feedback submitted successfully');

      // Reset form state
      setRating(null);
      setComment('');
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-4"
    >
      <div>
        <Label>Rating</Label>
        <EmojiSelector
          selected={rating}
          onSelect={setRating}
        />
      </div>

      <div>
        <Label>Comment (optional)</Label>
        <Textarea
          id="comment"
          placeholder="Tell us more about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Feedback
      </Button>
    </form>
  );
}
