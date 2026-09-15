// In-memory realtime bus — websocket-style push without polling.
// Mutations publish scoped events; SSE stream handlers forward them to the
// browsers that subscribed to those scopes. Single server process only
// (no pub/sub fan-out — add Redis here if the API ever scales horizontally).
import { EventEmitter } from 'events';

/** Data families a push can invalidate on the client. */
export type RealtimeType = 'appointments' | 'live';

export interface RealtimeEvent {
  types: RealtimeType[];
  at: number;
}

type Listener = (event: RealtimeEvent) => void;

const bus = new EventEmitter();
bus.setMaxListeners(500);

/** Catch-all channel (SUPER_ADMIN scope): every mutation publishes here too. */
export const GLOBAL_CHANNEL = 'global';

/** Per-doctor channel: own doctor, their staff, and the public live board. */
export const doctorChannel = (doctorId: string): string => `doctor:${doctorId}`;

/** Per-hospital channel: the hospital desk (owner + staff). */
export const hospitalChannel = (hospitalId: string): string => `hospital:${hospitalId}`;

/** Push one event to every listed channel (blank ids ignored, deduped). */
export function publish(channels: Array<string | null | undefined>, types: RealtimeType | RealtimeType[]): void {
  const list = [...new Set(channels.filter((c): c is string => !!c && !!c.trim()))];
  if (list.length === 0) return;
  const event: RealtimeEvent = { types: Array.isArray(types) ? types : [types], at: Date.now() };
  for (const channel of list) {
    bus.emit(channel, event);
  }
}

/** Subscribe one connection to channels. Returns the unsubscribe function. */
export function subscribe(channels: string[], listener: Listener): () => void {
  for (const channel of channels) {
    bus.on(channel, listener);
  }
  return () => {
    for (const channel of channels) {
      bus.off(channel, listener);
    }
  };
}
