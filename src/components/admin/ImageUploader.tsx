import { useState, useRef } from 'react';
import { useUploadMedia } from '../../hooks/queries/useMediaQueries';
import { Button } from '../common/Button';
import { Loader2, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  onImageRemoved?: () => void;
  className?: string;
  label?: string;
}

export default function ImageUploader({ 
  currentImage, 
  onImageUploaded, 
  onImageRemoved,
  className = '',
  label = 'Upload Image'
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadMedia, isPending } = useUploadMedia();
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    
    uploadMedia(file, {
      onSuccess: (response) => {
        onImageUploaded(response.data.url);
      },
      onError: () => {
        setError('Failed to upload image. Please try again.');
      }
    });
  };

  if (currentImage) {
    return (
      <div className={`relative group rounded-xl overflow-hidden bg-gray-100 ${className}`}>
        <img 
          src={currentImage} 
          alt="Uploaded content" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/90 hover:bg-white"
          >
            Change
          </Button>
          {onImageRemoved && (
            <Button 
              variant="danger" 
              size="sm"
              onClick={onImageRemoved}
              className="bg-red-500/90 hover:bg-red-600 text-white"
            >
              <X size={16} />
            </Button>
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed border-gray-200 rounded-xl p-8 
          flex flex-col items-center justify-center text-center cursor-pointer
          hover:border-gray-300 hover:bg-gray-50 transition-all
          ${isPending ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {isPending ? (
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
            <ImageIcon size={24} />
          </div>
        )}
        <p className="text-sm font-medium text-gray-700">{isPending ? 'Uploading...' : label}</p>
        <p className="text-xs text-gray-400 mt-1">Click to browse</p>
      </div>
      
      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
    </div>
  );
}
