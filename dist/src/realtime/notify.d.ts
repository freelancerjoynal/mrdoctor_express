export interface AppointmentScope {
    doctorId?: string | null;
    hospitalId?: string | null;
    /** Fallback: hospital resolved from the chamber when hospitalId is absent. */
    chamberId?: string | null;
}
/**
 * Push an `appointments` event to the doctor channel, the hospital channel
 * (direct id, or resolved via chamber) and the global channel — so the
 * doctor panel, the hospital desk and super-admin all refresh their
 * lists, counters, cash cards and collection boxes.
 */
export declare function notifyAppointments(scope: AppointmentScope): void;
/** Push a `live` event (serial board moved) to the doctor + global channels. */
export declare function notifyLive(doctorId: string | null | undefined): void;
//# sourceMappingURL=notify.d.ts.map