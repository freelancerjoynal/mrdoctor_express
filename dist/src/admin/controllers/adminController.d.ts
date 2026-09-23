import type { AuthenticatedRequest } from '../../authentication/middleware/authMiddleware.js';
import type { Response } from 'express';
export declare const showAdminOverview: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showLocationOptions: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showDirectory: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showDoctorOverview: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showHospitalOverview: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listLocationSettings: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showLocationSetting: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const saveLocationSetting: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=adminController.d.ts.map