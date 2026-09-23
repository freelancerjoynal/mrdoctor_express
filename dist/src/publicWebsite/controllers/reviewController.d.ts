import type { Request, Response } from 'express';
export declare const postReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listDoctorReviews: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showDoctorSpotlight: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showDoctorRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listHospitalReviews: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showHospitalRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=reviewController.d.ts.map