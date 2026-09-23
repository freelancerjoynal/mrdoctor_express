import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more JoinRequests
 * const joinRequests = await prisma.joinRequest.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model JoinRequest
 *
 */
export type JoinRequest = Prisma.JoinRequestModel;
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model SuperAdminProfile
 *
 */
export type SuperAdminProfile = Prisma.SuperAdminProfileModel;
/**
 * Model ChatSession
 *
 */
export type ChatSession = Prisma.ChatSessionModel;
/**
 * Model Doctor
 *
 */
export type Doctor = Prisma.DoctorModel;
/**
 * Model Hospital
 *
 */
export type Hospital = Prisma.HospitalModel;
/**
 * Model CreditLedger
 *
 */
export type CreditLedger = Prisma.CreditLedgerModel;
/**
 * Model Chamber
 *
 */
export type Chamber = Prisma.ChamberModel;
/**
 * Model DoctorSchedule
 *
 */
export type DoctorSchedule = Prisma.DoctorScheduleModel;
/**
 * Model PendingAppointment
 *
 */
export type PendingAppointment = Prisma.PendingAppointmentModel;
/**
 * Model ConfirmedAppointment
 *
 */
export type ConfirmedAppointment = Prisma.ConfirmedAppointmentModel;
/**
 * Model CancelledAppointmentOnline
 *
 */
export type CancelledAppointmentOnline = Prisma.CancelledAppointmentOnlineModel;
/**
 * Model CancelledAppointmentLocal
 *
 */
export type CancelledAppointmentLocal = Prisma.CancelledAppointmentLocalModel;
/**
 * Model ServedAppointment
 *
 */
export type ServedAppointment = Prisma.ServedAppointmentModel;
/**
 * Model HospitalOnlineDay
 *
 */
export type HospitalOnlineDay = Prisma.HospitalOnlineDayModel;
/**
 * Model HospitalPayout
 *
 */
export type HospitalPayout = Prisma.HospitalPayoutModel;
/**
 * Model DoctorInformation
 *
 */
export type DoctorInformation = Prisma.DoctorInformationModel;
/**
 * Model Blog
 *
 */
export type Blog = Prisma.BlogModel;
/**
 * Model LocationPortalSetting
 *
 */
export type LocationPortalSetting = Prisma.LocationPortalSettingModel;
/**
 * Model SeoSetting
 *
 */
export type SeoSetting = Prisma.SeoSettingModel;
/**
 * Model Review
 *
 */
export type Review = Prisma.ReviewModel;
/**
 * Model ContactMessage
 *
 */
export type ContactMessage = Prisma.ContactMessageModel;
//# sourceMappingURL=client.d.ts.map