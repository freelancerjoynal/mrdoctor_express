// src/controllers/business/businessController.ts
import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export const createBusiness = async (req: AuthRequest, res: Response) => {
  try {
    console.log('🔍 ===== START CREATE BUSINESS =====');
    console.log('🔍 Headers:', req.headers);
    console.log('🔍 req.userId:', req.userId);
    console.log('🔍 req.user:', req.user);
    console.log('🔍 Body:', req.body);

    // ✅ Get userId from multiple sources
    const userId = req.userId || (req as any).user?.id || (req as any).user?.userId;
    
    console.log('🔍 Extracted userId:', userId);

    if (!userId) {
      console.log('❌ No userId found!');
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
        debug: { userId: req.userId, user: (req as any).user }
      });
    }

    // ✅ Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    console.log('🔍 User from DB:', user);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const { name, whatsappPhoneNumberId, whatsappAccessToken } = req.body;

    // Validation
    if (!name || !whatsappPhoneNumberId) {
      return res.status(400).json({
        success: false,
        error: 'Name and whatsappPhoneNumberId are required'
      });
    }

    // Check existing business
    const existingBusiness = await prisma.business.findUnique({
      where: { whatsappPhoneNumberId }
    });

    if (existingBusiness) {
      return res.status(409).json({
        success: false,
        error: 'Business with this WhatsApp number already exists'
      });
    }

    // ✅ Create business
    console.log('📝 Creating business...');
    const business = await prisma.business.create({
      data: {
        name,
        whatsappPhoneNumberId,
        whatsappAccessToken: whatsappAccessToken || null,
        userId: userId,
        status: 'PENDING'
      }
    });

    console.log('✅ Business created:', business.id);

    // ✅ Create BusinessUser entry
    try {
      await prisma.businessUser.create({
        data: {
          userId: userId,
          businessId: business.id,
          role: 'BUSINESS_OWNER'
        }
      });
      console.log('✅ BusinessUser created');
    } catch (buError) {
      console.error('❌ BusinessUser creation failed:', buError);
      // Don't fail the whole request
    }

    return res.status(201).json({
      success: true,
      data: business,
      message: 'Business created successfully. Waiting for admin approval.'
    });

  } catch (error) {
    console.error('❌ ERROR:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create business',
      details: error.message,
      stack: error.stack
    });
  }
};