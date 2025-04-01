
import { FC } from 'react';
import { EmojiRating } from '@/types/feedback';
import { Smile, Meh, Frown, Angry } from 'lucide-react';

interface EmojiOption {
  value: EmojiRating;
  label: string;
  icon: JSX.Element;
  color: string;
}

interface EmojiSelectorProps {
  selected: EmojiRating | null;
  onSelect: (rating: EmojiRating) => void;
}

const options: EmojiOption[] = [
  { 
    value: 'very_satisfied', 
    label: 'Very Satisfied', 
    icon: <Smile className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2} />, 
    color: 'text-green-500' 
  },
  { 
    value: 'satisfied', 
    label: 'Satisfied', 
    icon: <Smile className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />, 
    color: 'text-green-400' 
  },
  { 
    value: 'neutral', 
    label: 'Neutral', 
    icon: <Meh className="w-12 h-12 md:w-16 md:h-16" />, 
    color: 'text-gray-400' 
  },
  { 
    value: 'dissatisfied', 
    label: 'Dissatisfied', 
    icon: <Frown className="w-12 h-12 md:w-16 md:h-16" />, 
    color: 'text-orange-400' 
  },
  { 
    value: 'very_dissatisfied', 
    label: 'Very Dissatisfied', 
    icon: <Angry className="w-12 h-12 md:w-16 md:h-16" />, 
    color: 'text-red-500' 
  }
];

const EmojiSelector: FC<EmojiSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="py-6">
      <h2 className="text-xl text-center mb-6">How would you rate your experience today?</h2>
      <div className="flex justify-around items-center max-w-3xl mx-auto">
        {options.map((option) => (
          <div 
            key={option.value} 
            className={`emoji-option flex flex-col items-center ${selected === option.value ? 'emoji-selected' : ''}`}
            onClick={() => onSelect(option.value)}
          >
            <div className={`p-4 rounded-full ${option.color}`}>
              {option.icon}
            </div>
            <span className="mt-2 text-xs md:text-sm font-medium text-center">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
