// In-memory realtime bus — websocket-style push without polling.
// Mutations publish scoped events; SSE stream handlers forward them to the
// browsers that subscribed to those scopes. Single server process only
// (no pub/sub fan-out — add Redis here if the API ever scales horizontally).
import { EventEmitter } from 'events';
const bus = new EventEmitter();
bus.setMaxListeners(500);
/** Catch-all channel (SUPER_ADMIN scope): every mutation publishes here too. */
export const GLOBAL_CHANNEL = 'global';
/** Per-doctor channel: own doctor, their staff, and the public live board. */
export const doctorChannel = (doctorId) => `doctor:${doctorId}`;
/** Per-hospital channel: the hospital desk (owner + staff). */
export const hospitalChannel = (hospitalId) => `hospital:${hospitalId}`;
/** Push one event to every listed channel (blank ids ignored, deduped). */
export function publish(channels, types) {
    const list = [...new Set(channels.filter((c) => !!c && !!c.trim()))];
    if (list.length === 0)
        return;
    const event = { types: Array.isArray(types) ? types : [types], at: Date.now() };
    for (const channel of list) {
        bus.emit(channel, event);
    }
}
/** Subscribe one connection to channels. Returns the unsubscribe function. */
export function subscribe(channels, listener) {
    for (const channel of channels) {
        bus.on(channel, listener);
    }
    return () => {
        for (const channel of channels) {
            bus.off(channel, listener);
        }
    };
}
//# sourceMappingURL=events.js.map