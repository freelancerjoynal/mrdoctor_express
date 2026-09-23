import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
export declare const getUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=profileController.d.ts.map