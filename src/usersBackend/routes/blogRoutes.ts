// Authenticated blog routes — doctors, hospitals and super-admins can all write.
// Mounted by src/usersBackend/routes/index.ts at /api/users/blogs.
import express from 'express';
import { protectedRoute } from '../../authentication/middleware/authMiddleware.js';
import {
  listUserBlogs,
  showUserBlog,
  storeUserBlog,
  modifyUserBlog,
  removeUserBlog,
} from '../controllers/blogController.js';

const blogRouter = express.Router();

const WRITERS = ['SUPER_ADMIN', 'DOCTOR', 'HOSPITAL', 'DOCTOR_STAFF', 'HOSPITAL_STAFF'] as const;

blogRouter.get('/', protectedRoute(...WRITERS), listUserBlogs);
blogRouter.get('/:id', protectedRoute(...WRITERS), showUserBlog);
blogRouter.post('/', protectedRoute('SUPER_ADMIN', 'DOCTOR', 'HOSPITAL'), storeUserBlog);
blogRouter.put('/:id', protectedRoute('SUPER_ADMIN', 'DOCTOR', 'HOSPITAL'), modifyUserBlog);
blogRouter.delete('/:id', protectedRoute('SUPER_ADMIN', 'DOCTOR', 'HOSPITAL'), removeUserBlog);

export default blogRouter;
