export declare const Role: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly ADMIN_MANAGER: "ADMIN_MANAGER";
    readonly DOCTOR: "DOCTOR";
    readonly DOCTOR_STAFF: "DOCTOR_STAFF";
    readonly BUSINESS_OWNER: "BUSINESS_OWNER";
    readonly HOSPITAL_STAFF: "HOSPITAL_STAFF";
    readonly HOSPITAL: "HOSPITAL";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const DoctorStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly SUSPENDED: "SUSPENDED";
    readonly REFUSED: "REFUSED";
};
export type DoctorStatus = (typeof DoctorStatus)[keyof typeof DoctorStatus];
export declare const Gender: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const HospitalStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly SUSPENDED: "SUSPENDED";
    readonly REFUSED: "REFUSED";
};
export type HospitalStatus = (typeof HospitalStatus)[keyof typeof HospitalStatus];
export declare const DayOfWeek: {
    readonly SATURDAY: "SATURDAY";
    readonly SUNDAY: "SUNDAY";
    readonly MONDAY: "MONDAY";
    readonly TUESDAY: "TUESDAY";
    readonly WEDNESDAY: "WEDNESDAY";
    readonly THURSDAY: "THURSDAY";
    readonly FRIDAY: "FRIDAY";
};
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];
export declare const BlogAuthorType: {
    readonly DOCTOR: "DOCTOR";
    readonly HOSPITAL: "HOSPITAL";
    readonly SUPER_ADMIN: "SUPER_ADMIN";
};
export type BlogAuthorType = (typeof BlogAuthorType)[keyof typeof BlogAuthorType];
export declare const BlogStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];
export declare const ReviewStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
export declare const JoinRequestType: {
    readonly DOCTOR: "DOCTOR";
    readonly HOSPITAL: "HOSPITAL";
};
export type JoinRequestType = (typeof JoinRequestType)[keyof typeof JoinRequestType];
export declare const JoinRequestStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type JoinRequestStatus = (typeof JoinRequestStatus)[keyof typeof JoinRequestStatus];
export declare const BookingType: {
    readonly ONLINE: "ONLINE";
    readonly OFFLINE: "OFFLINE";
};
export type BookingType = (typeof BookingType)[keyof typeof BookingType];
export declare const PaymentStatus: {
    readonly SUCCESS: "SUCCESS";
    readonly FAILED: "FAILED";
    readonly PENDING: "PENDING";
    readonly CANCELLED: "CANCELLED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const SeoPageType: {
    readonly GLOBAL: "GLOBAL";
    readonly LOCATION: "LOCATION";
    readonly DOCTOR: "DOCTOR";
    readonly HOSPITAL: "HOSPITAL";
};
export type SeoPageType = (typeof SeoPageType)[keyof typeof SeoPageType];
//# sourceMappingURL=enums.d.ts.map