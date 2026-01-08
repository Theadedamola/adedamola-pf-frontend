import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/Projects/ProjectDetails";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/Blogs/BlogDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Explorations from "../pages/Explorations";

// Admin Pages
import AdminLogin from "../admin/Login";
import AdminDashboard from "../admin/Dashboard";
import AdminProjects from "../admin/Projects";
import CreateProject from "../admin/Projects/CreateProject";
import EditProject from "../admin/Projects/EditProject";
import AdminBlogs from "../admin/Blogs";
import CreateBlog from "../admin/Blogs/CreateBlog";
import EditBlog from "../admin/Blogs/EditBlog";
import AdminMedia from "../admin/Media";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:slug", element: <ProjectDetails /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:slug", element: <BlogDetails /> },
      { path: "about", element: <About /> },
      { path: "explorations", element: <Explorations /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "projects/create", element: <CreateProject /> },
      { path: "projects/edit/:id", element: <EditProject /> },
      { path: "blogs", element: <AdminBlogs /> },
      { path: "blogs/create", element: <CreateBlog /> },
      { path: "blogs/edit/:id", element: <EditBlog /> },
      { path: "media", element: <AdminMedia /> },
    ],
  },
]);
