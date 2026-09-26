import { type Division, type District } from "../../lib/areas.js";
import { type DoctorSpeciality } from "../../lib/doctorSpeciality.js";
import { type UpdateFn } from "./session.js";
/** Page size for the post-category doctor cards. */
export declare const DOCTOR_CARD_PAGE = 5;
/** more_doctors tap -> next page of cards. */
export declare const MORE_DOCTORS_ID = "more_doctors";
export type LocationKind = "DOCTOR" | "HOSPITAL";
export declare const LOCATION_TEXTS: {
    ASK_DIVISION: (kind: LocationKind) => "📍 আপনি কোন বিভাগে হসপিটাল খুঁজছেন? তালিকা থেকে বিভাগ বেছে নিন 👇" | "📍 আপনি কোন বিভাগে ডাক্তার দেখাতে চান? তালিকা থেকে বিভাগ বেছে নিন 👇";
    ASK_DISTRICT: (kind: LocationKind, division: string) => string;
    ASK_THANA: (district: string) => string;
    ASK_SPECIALITY: string;
    INVALID_PICK: string;
    NO_DOCTORS_THANA: (thana: string, district?: string, division?: string) => string;
    SUGGEST_ASK_PROBLEM: string;
    SUGGEST_THINKING: string;
    SUGGEST_FAILED: string;
    NO_DOCTORS_DIVISION: (spec: string, division: string, district?: string, thana?: string) => string;
};
/** Location path in division -> district -> thana order (big to small). */
export declare function formatLocationPath(division?: string, district?: string, thana?: string): string;
/** "Can't figure out the right doctor?" row -> problem-based AI suggest. */
export declare const SUGGEST_SPEC_ID = "spec_suggest";
export declare function findDivision(name: string): Division | null;
export declare function matchDivision(rawText: string, buttonId: string): Division | null;
export declare function sendDivisionPrompt(to: string, kind: LocationKind): Promise<void>;
export declare function matchDistrict(division: Division, rawText: string, buttonId: string): District | null;
export declare function sendDistrictPrompt(to: string, kind: LocationKind, division: Division): Promise<void>;
export declare function matchThana(district: District, rawText: string, buttonId: string): string | null;
export declare function sendThanaPrompt(to: string, district: District): Promise<void>;
/** Master speciality with live availability in one thana. */
export interface AvailableSpec {
    /** Index in DOCTOR_SPECIALITIES (row ids stay spec_<idx>). */
    idx: number;
    bn: string;
    en: string;
    /** Approved doctors with a chamber in this thana. */
    doctors: number;
}
/**
 * Master-list specialities that actually have a chamber in this thana
 * (single groupBy — one cheap query). Sorted by doctor count, most first.
 */
export declare function fetchAvailableSpecs(thana: string, district: string): Promise<AvailableSpec[]>;
export declare function matchSpeciality(rawText: string, buttonId: string, allowed?: Pick<AvailableSpec, "bn" | "en">[] | null): DoctorSpeciality | null;
export declare function sendSpecialityPrompt(to: string, specs?: AvailableSpec[] | null): Promise<void>;
/** One doctor row for the post-category cards. */
export interface LocationDoctorCard {
    username: string;
    name: string;
    degree: string | null;
    speciality: string | null;
    chamberName: string | null;
    bannerCardImage: string | null;
}
/**
 * Approved doctors of one speciality with a chamber in this thana
 * (by name, paged) — the pool behind the Contact cards.
 */
export declare function fetchLocationDoctors(thana: string, district: string, specialityBn: string, take?: number, skip?: number): Promise<LocationDoctorCard[]>;
/** Total pool size behind the cards (drives the see-more button). */
export declare function countLocationDoctors(thana: string, district: string, specialityBn: string): Promise<number>;
export declare function buildLocationDoctorCard(d: LocationDoctorCard): string;
/** "See more" button when further doctors remain past the shown cards. */
export declare function sendSeeMoreButton(to: string, remaining: number): Promise<void>;
/**
 * Banner-image cards, each with a Contact button (connect_<username>).
 * Tapping joins that doctor's booking flow via the global connect handler.
 */
export declare function sendDoctorCards(to: string, doctors: LocationDoctorCard[]): Promise<void>;
/**
 * Back-resend for ASK_SPECIALITY: recomputes availability when the resumed
 * session lost it, restarts at division when even the thana is gone.
 */
export declare function resendSpecialityPrompt(to: string, kind: LocationKind, data: any): Promise<void>;
/** Where one speciality is available: district -> doctor count. */
export interface DistrictAvailability {
    district: string;
    doctors: number;
}
/** Where one speciality is available: thana -> doctor count. */
export interface ThanaAvailability {
    thana: string;
    doctors: number;
}
/** Distinct approved doctors of one speciality, grouped by their chamber district. */
export declare function fetchAvailabilityByDistrict(division: string, specialityBn: string): Promise<DistrictAvailability[]>;
/** Distinct approved doctors of one speciality, grouped by their chamber thana. */
export declare function fetchAvailabilityByThana(division: string, district: string, specialityBn: string): Promise<ThanaAvailability[]>;
/** Alt-district list: where in this division the speciality IS available. */
export declare function sendAltDistrictPrompt(to: string, specBn: string, thana: string, division: string, alts: DistrictAvailability[], district?: string): Promise<void>;
/** Alt-thana list inside the picked district. */
export declare function sendAltThanaPrompt(to: string, specBn: string, district: string, alts: ThanaAvailability[]): Promise<void>;
export type FindFlow = "FIND_DOCTOR_FLOW" | "FIND_HOSPITAL_FLOW";
/**
 * Shared post-category advance (manual pick + AI suggest, both flows):
 * ack -> doctor cards here, or the alternate-location path when this
 * thana has none (districts in this division -> thanas there -> cards).
 */
export declare function advancePickedSpeciality(args: {
    flow: FindFlow;
    kind: LocationKind;
    phoneNumber: string;
    data: any;
    bn: string;
    en: string;
    /** Optional line before the ack (e.g. "AI picked this for your problem"). */
    lead?: string;
    updateSession: UpdateFn;
    track: (step: string, data: any) => Promise<void>;
}): Promise<void>;
/** Match a tap/number/name against an offered alt-district list. */
export declare function matchAltDistrict(alts: DistrictAvailability[], rawText: string, buttonId: string): DistrictAvailability | null;
/** Match a tap/number/name against an offered alt-thana list. */
export declare function matchAltThana(alts: ThanaAvailability[], rawText: string, buttonId: string): ThanaAvailability | null;
/**
 * Shared ASK_ALT_DISTRICT step: picked district -> thana availability list.
 */
export declare function handleAltDistrict(args: {
    flow: FindFlow;
    kind: LocationKind;
    phoneNumber: string;
    rawText: string;
    buttonId: string;
    data: any;
    updateSession: UpdateFn;
    track: (step: string, data: any) => Promise<void>;
}): Promise<void>;
/**
 * Shared ASK_ALT_THANA step: picked thana -> refresh availability -> cards.
 */
export declare function handleAltThana(args: {
    flow: FindFlow;
    kind: LocationKind;
    phoneNumber: string;
    rawText: string;
    buttonId: string;
    data: any;
    updateSession: UpdateFn;
    track: (step: string, data: any) => Promise<void>;
}): Promise<void>;
/** Terminal ack after thana + category are picked (division -> district -> thana order). */
export declare function buildLocationDoneMessage(data: {
    thana?: string;
    district?: string;
    division?: string;
    department?: string;
}): string;
//# sourceMappingURL=locationSelect.d.ts.map