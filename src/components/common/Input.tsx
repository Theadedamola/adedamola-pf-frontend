import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, useEffect, useRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
            w-full bg-transparent border-b border-gray-200 py-4 
            text-base md:text-lg placeholder:text-gray-400
            focus:outline-none focus:border-black transition-colors
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', label, error, value, onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
      const textArea = internalRef.current;
      if (!textArea) return;
      
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    };

    useEffect(() => {
      adjustHeight();
    }, [value]);

    return (
      <div className="w-full">
        <textarea
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as any).current = node;
            }
          }}
          value={value}
          onChange={(e) => {
            adjustHeight();
            onChange?.(e);
          }}
          className={`
            w-full bg-transparent border-b border-gray-200 py-4 
            text-base md:text-lg placeholder:text-gray-400 resize-none
            focus:outline-none focus:border-black transition-colors
            overflow-hidden
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);
