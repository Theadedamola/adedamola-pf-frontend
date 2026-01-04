import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function TagInput({ tags = [], onChange, placeholder = 'Add a tag...', className = '' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      onChange([...tags, trimmedInput]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 p-2 border border-gray-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-transparent ${className}`}>
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="text-gray-400 hover:text-red-500 focus:outline-none"
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none focus:ring-0 text-sm p-1"
      />
    </div>
  );
}
