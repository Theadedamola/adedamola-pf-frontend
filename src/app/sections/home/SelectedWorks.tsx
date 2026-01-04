import ProjectCard from '@/components/common/ProjectCard';

// Import images from assets
import atwImage from '@/assets/atwImage.png';
import thumbnail from '@/assets/thumbnail.png';
import walletwiseThumbnail from '@/assets/walletwise-thumbnail.png';

export default function SelectedWorks() {
  const projects = [
    {
      id: 1,
      title: 'Vendorize',
      description: 'A comprehensive platform streamlining vendor management and procurement processes for modern enterprises.',
      year: '2024',
      image: thumbnail, // Using docImg as placeholder for Vendorize based on assumption
      tags: ['SaaS', 'B2B', 'Product Design'],
      theme: 'light' as const
    },
    {
      id: 2,
      title: 'WalletWise',
      description: 'Smart financial tracking application that helps users make informed decisions about their spending habits.',
      year: '2025',
      image: walletwiseThumbnail,
      tags: ['Fintech', 'Mobile App', 'UX Research'],
      theme: 'dark' as const
    },
    {
      id: 3,
      title: 'Along the way',
      description: 'An immersive digital storytelling experience capturing the subtle moments of everyday journeys.',
      year: '2023',
      image: atwImage,
      tags: ['Digital Art', 'Web Experience'],
      theme: 'light' as const
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-7xl font-thaloria mb-4">Selected Works</h2>
          <p className="text-gray-500 max-w-md">
            A curation of projects that challenged my thinking and sharpened my craft.
          </p>
        </div>
        <a href="/projects" className="text-sm font-mono border-b border-gray-300 pb-1 hover:border-black transition-colors">
          View all projects
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={index === 2 ? "md:col-span-2 md:w-2/3 mx-auto" : ""}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              year={project.year}
              image={project.image}
              tags={project.tags}
              theme={project.theme}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
