// ==========================================
// Common / Shared Types
// ==========================================

export interface ContentBlock {
  type: 'text' | 'image';
  value: string;
  order: number;
}

export interface BaseResponse {
  status: string;
  message?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
}

// ==========================================
// Authentication Types
// ==========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  token: string;
  refreshToken: string;
  data: {
    user: {
      email: string;
    };
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse extends BaseResponse {
  token: string;
}

// ==========================================
// Project Types
// ==========================================

export interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  contentBlocks: ContentBlock[];
  status: 'published' | 'draft';
  tags: string[];
  createdAt: string; // Dates are strings in JSON responses
  updatedAt: string;
}

// Request DTO for creating/updating a project
export interface ProjectInput {
  title: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  contentBlocks?: ContentBlock[];
  status?: 'published' | 'draft';
  tags?: string[];
}

// Response for GET /api/v1/projects (Public & Admin)
export interface GetProjectsResponse extends BaseResponse, PaginationMeta {
  projects: Project[];
}

// Response for GET /api/v1/projects/:slug or /:id
export interface GetProjectResponse extends BaseResponse {
  data: Project;
}

// ==========================================
// Blog Types
// ==========================================

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  contentBlocks: ContentBlock[];
  status: 'published' | 'draft';
  tags: string[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

// Request DTO for creating/updating a blog
export interface BlogInput {
  title: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  contentBlocks?: ContentBlock[];
  status?: 'published' | 'draft';
  tags?: string[];
}

// Response for GET /api/v1/blogs (Public & Admin)
export interface GetBlogsResponse extends BaseResponse, PaginationMeta {
  blogs: Blog[];
}

// Response for GET /api/v1/blogs/:slug or /:id
export interface GetBlogResponse extends BaseResponse {
  data: Blog;
}

// ==========================================
// Media Types
// ==========================================

export interface Media {
  _id: string;
  url: string;
  publicId: string;
  type: 'image';
  usedIn?: 'blog' | 'project';
  createdAt: string;
}

// Request is 'multipart/form-data'
// Fields: 'file' (File object), 'type' (optional string)

export interface UploadMediaResponse extends BaseResponse {
  data: Media;
}
