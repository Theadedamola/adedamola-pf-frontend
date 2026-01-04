import { Link } from 'react-router-dom';
import { useAdminProjects, useDeleteProject } from '../../../hooks/queries/useProjectQueries';
import { Button } from '../../../components/common/Button';
import { Plus, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminProjects() {
  const { data, isLoading } = useAdminProjects();
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
  }

  const projects = data?.projects || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-thaloria mb-2">Projects</h1>
          <p className="text-gray-500">Manage your portfolio projects</p>
        </div>
        <Link to="/admin/projects/create">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} />
            Create Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">No projects found</p>
          <Link to="/admin/projects/create">
            <Button variant="secondary">Create your first project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gray-100">
                {project.coverImage ? (
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No Image
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium 
                    ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                  `}>
                    {project.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {project.excerpt || 'No excerpt'}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/projects/${project.slug}`} 
                      target="_blank"
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors"
                      title="View Live"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link 
                      to={`/admin/projects/edit/${project._id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-green-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
