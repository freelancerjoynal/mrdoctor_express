import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
import type { Response } from 'express';
export declare const showContactMessages: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const runContactStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=contactAdminController.d.ts.map