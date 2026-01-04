import { useState } from 'react';
import type { BlogInput } from '../../../types/api';
import { Button } from '../../../components/common/Button';
import { TextArea } from '../../../components/common/Input';
import ImageUploader from '../../../components/admin/ImageUploader';
import BlockEditor from '../../../components/admin/BlockEditor';
import TagInput from '../../../components/admin/TagInput';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogFormProps {
  initialData?: Partial<BlogInput>;
  onSubmit: (data: BlogInput) => void;
  isSubmitting: boolean;
  title: string;
}

export default function BlogForm({ initialData, onSubmit, isSubmitting, title }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogInput>({
    title: '',
    coverImage: '',
    excerpt: '',
    contentBlocks: [],
    status: 'draft',
    tags: [],
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof BlogInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm py-4 z-20">
        <div className="flex items-center gap-4">
          <Link 
            to="/admin/blogs"
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={formData.status}
            onChange={(e) => updateField('status', e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Save size={16} />
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Cover Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <ImageUploader
            currentImage={formData.coverImage}
            onImageUploaded={(url) => updateField('coverImage', url)}
            onImageRemoved={() => updateField('coverImage', '')}
            label="Upload Cover Image"
            className="aspect-video w-full"
          />
        </div>

        {/* Title */}
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Title"
          className="w-full text-4xl md:text-5xl font-bold placeholder-gray-300 border-none outline-none bg-transparent p-0 focus:ring-0"
        />

        {/* Excerpt */}
        <TextArea
          value={formData.excerpt}
          onChange={(e) => updateField('excerpt', e.target.value)}
          placeholder="Write a short excerpt..."
          rows={2}
          className="text-lg text-gray-600 italic resize-none border-none bg-transparent px-0 focus:ring-0"
        />

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <TagInput
            tags={formData.tags || []}
            onChange={(tags) => updateField('tags', tags)}
            placeholder="Add tags (press Enter or comma to add)"
          />
        </div>

        {/* Content Editor */}
        <div className="pt-8 border-t border-gray-100">
          <BlockEditor
            blocks={formData.contentBlocks || []}
            onChange={(blocks) => updateField('contentBlocks', blocks)}
          />
        </div>
      </div>
    </div>
  );
}
