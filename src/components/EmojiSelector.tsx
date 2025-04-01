
import { FC } from 'react';
import { EmojiRating } from '@/types/feedback';
import { Smile, Meh, Frown, Angry } from 'lucide-react';

interface EmojiOption {
  value: EmojiRating;
  label: string;
  icon: JSX.Element;
  color: string;
  background: string;
}

interface EmojiSelectorProps {
  selected: EmojiRating | null;
  onSelect: (rating: EmojiRating) => void;
}

const options: EmojiOption[] = [
  { 
    value: 'very_satisfied', 
    label: 'Very Satisfied', 
    icon: <Smile className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} fill="#FFD23F" />, 
    color: 'text-green-500',
    background: 'bg-green-100'
  },
  { 
    value: 'satisfied', 
    label: 'Satisfied', 
    icon: <Smile className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2} fill="#FFE087" />, 
    color: 'text-green-400',
    background: 'bg-green-50'
  },
  { 
    value: 'neutral', 
    label: 'Neutral', 
    icon: <Meh className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2} fill="#F1F0FB" />, 
    color: 'text-gray-400',
    background: 'bg-gray-100'
  },
  { 
    value: 'dissatisfied', 
    label: 'Dissatisfied', 
    icon: <Frown className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2} fill="#FEC6A1" />, 
    color: 'text-orange-400',
    background: 'bg-orange-50'
  },
  { 
    value: 'very_dissatisfied', 
    label: 'Very Dissatisfied', 
    icon: <Angry className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} fill="#FFDEE2" />, 
    color: 'text-red-500',
    background: 'bg-red-50'
  }
];

const EmojiSelector: FC<EmojiSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="py-6">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-8 text-primary">
        How would you rate your experience today?
      </h2>
      <div className="flex justify-around items-center max-w-3xl mx-auto">
        {options.map((option) => (
          <div 
            key={option.value} 
            className={`emoji-option flex flex-col items-center transition-all duration-300 ${
              selected === option.value ? 'emoji-selected' : ''
            }`}
            onClick={() => onSelect(option.value)}
          >
            <div className={`p-4 rounded-full ${option.background} border-2 ${
              selected === option.value 
                ? `border-${option.color.split('-')[1]}-500 shadow-lg` 
                : 'border-transparent'
            } transition-all duration-200`}>
              {option.icon}
            </div>
            <span className={`mt-3 text-xs md:text-sm font-medium text-center ${
              selected === option.value ? option.color : 'text-gray-600'
            }`}>
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
