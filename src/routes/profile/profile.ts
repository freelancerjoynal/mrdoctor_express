import express from 'express';
import { protectedRoute } from '../../middleware/authMiddleware.js';

const profileRouter = express.Router();

// এখানে আপনার প্রয়োজনমতো রোলগুলো (যেমন: 'BUSINESS_OWNER', 'SUPER_ADMIN', 'DOCTOR' ইত্যাদি) পাস করে দিতে হবে
profileRouter.get('/', protectedRoute('BUSINESS_OWNER', 'SUPER_ADMIN', 'DOCTOR'), (req: any, res) => {
  // Accessing user data attached by the protectedRoute middleware
  res.json({ 
    message: 'Protected data accessed successfully', 
    user: req.user 
  });
});

export default profileRouter;