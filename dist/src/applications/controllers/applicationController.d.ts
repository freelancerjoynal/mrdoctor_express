import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
export declare const submitDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const submitHospital: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listAll: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const pendingCount: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const approve: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const reject: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createDoctorDirect: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createHospitalDirect: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=applicationController.d.ts.map