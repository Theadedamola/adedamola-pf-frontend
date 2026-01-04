import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">What would you like to create today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/admin/projects/create" className="group">
          <motion.div
            whileHover={{ y: -5 }}
            className="h-64 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group-hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              P
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Create New Project</h2>
              <p className="text-gray-500">Showcase your latest work and case studies.</p>
            </div>
            <div className="flex items-center text-blue-600 font-medium">
              Start creating
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </Link>

        <Link to="/admin/blogs/create" className="group">
          <motion.div
            whileHover={{ y: -5 }}
            className="h-64 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group-hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              B
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Create New Blog</h2>
              <p className="text-gray-500">Share your thoughts and technical insights.</p>
            </div>
            <div className="flex items-center text-purple-600 font-medium">
              Start writing
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
