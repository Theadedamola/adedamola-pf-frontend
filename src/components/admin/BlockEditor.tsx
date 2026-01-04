import { Type, Image as ImageIcon, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

export interface ContentBlock {
  type: 'text' | 'image';
  value: string;
  order: number;
}

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  // We need local state to manage the blocks for immediate UI updates
  // The parent component will receive updates via onChange
  
  const addBlock = (type: 'text' | 'image') => {
    const newBlock: ContentBlock = {
      type,
      value: '',
      order: blocks.length,
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], value };
    onChange(newBlocks);
  };

  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    // Reorder
    const reordered = newBlocks.map((block, i) => ({ ...block, order: i }));
    onChange(reordered);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={index} className="group relative pl-8">
            {/* Action Menu (Delete) */}
            <div className="absolute left-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
              <button
                onClick={() => removeBlock(index)}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                title="Remove block"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {block.type === 'text' ? (
              <textarea
                value={block.value}
                onChange={(e) => {
                  updateBlock(index, e.target.value);
                  // Auto-resize
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder="Type your story..."
                className="w-full resize-none outline-none text-lg text-gray-800 placeholder-gray-300 bg-transparent border-none p-0 focus:ring-0 leading-relaxed"
                rows={1}
                style={{ minHeight: '1.5em' }}
                onInput={(e: any) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            ) : (
              <ImageUploader
                currentImage={block.value}
                onImageUploaded={(url) => updateBlock(index, url)}
                onImageRemoved={() => updateBlock(index, '')}
                className="w-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Add Block Controls */}
      <div className="relative group py-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="h-px bg-gray-200 w-full"></div>
        </div>
        
        <div className="flex justify-center gap-4 relative z-10">
          <button
            onClick={() => addBlock('text')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 text-sm font-medium transition-colors"
          >
            <Type size={16} />
            Add Text
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 text-sm font-medium transition-colors"
          >
            <ImageIcon size={16} />
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
}
