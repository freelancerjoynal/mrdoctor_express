import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
export declare const listSeo: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showSeo: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const saveSeo: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeSeo: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=seoController.d.ts.map