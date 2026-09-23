/** Data families a push can invalidate on the client. */
export type RealtimeType = 'appointments' | 'live';
export interface RealtimeEvent {
    types: RealtimeType[];
    at: number;
}
type Listener = (event: RealtimeEvent) => void;
/** Catch-all channel (SUPER_ADMIN scope): every mutation publishes here too. */
export declare const GLOBAL_CHANNEL = "global";
/** Per-doctor channel: own doctor, their staff, and the public live board. */
export declare const doctorChannel: (doctorId: string) => string;
/** Per-hospital channel: the hospital desk (owner + staff). */
export declare const hospitalChannel: (hospitalId: string) => string;
/** Push one event to every listed channel (blank ids ignored, deduped). */
export declare function publish(channels: Array<string | null | undefined>, types: RealtimeType | RealtimeType[]): void;
/** Subscribe one connection to channels. Returns the unsubscribe function. */
export declare function subscribe(channels: string[], listener: Listener): () => void;
export {};
//# sourceMappingURL=events.d.ts.map