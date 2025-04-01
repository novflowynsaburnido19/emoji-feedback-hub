
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmojiRating } from '@/types/feedback';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import EmojiSelector from '@/components/EmojiSelector';
import { saveFeedback } from '@/services/feedbackService';
import { MessageSquare, Send } from 'lucide-react';

const FeedbackForm: FC = () => {
  const [rating, setRating] = useState<EmojiRating | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!rating) {
      toast({
        title: "Please select an emoji",
        description: "Let us know how you feel about your experience",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      saveFeedback(rating, comment);
      navigate('/thank-you');
    } catch (error) {
      toast({
        title: "Error saving feedback",
        description: "Please try again later",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <EmojiSelector selected={rating} onSelect={setRating} />
      
      <div className="mt-10 bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <label htmlFor="comment" className="block text-sm font-medium mb-2 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-primary opacity-70" />
          <span>Additional comments (optional)</span>
        </label>
        <Textarea
          id="comment"
          placeholder="Tell us more about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px] transition-all duration-300 focus:border-accent focus:ring-accent"
        />
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !rating}
          className="w-full md:w-auto px-10 py-6 rounded-full font-medium text-base transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? 'Submitting...' : (
            <>
              Submit Feedback
              <Send className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackForm;
