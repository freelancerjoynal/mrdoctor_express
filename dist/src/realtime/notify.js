// Mutation → push glue. Every helper is best-effort and never throws:
// a realtime hiccup must never fail a booking write.
import { prisma } from '../lib/prisma.js';
import { publish, doctorChannel, hospitalChannel, GLOBAL_CHANNEL } from './events.js';
/**
 * Push an `appointments` event to the doctor channel, the hospital channel
 * (direct id, or resolved via chamber) and the global channel — so the
 * doctor panel, the hospital desk and super-admin all refresh their
 * lists, counters, cash cards and collection boxes.
 */
export function notifyAppointments(scope) {
    void (async () => {
        try {
            let hospitalId = scope.hospitalId ?? null;
            if (!hospitalId && scope.chamberId) {
                const chamber = await prisma.chamber.findUnique({
                    where: { id: scope.chamberId },
                    select: { hospitalId: true },
                });
                hospitalId = chamber?.hospitalId ?? null;
            }
            publish([
                scope.doctorId ? doctorChannel(scope.doctorId) : null,
                hospitalId ? hospitalChannel(hospitalId) : null,
                GLOBAL_CHANNEL,
            ], 'appointments');
        }
        catch {
            /* push is best-effort — the write already succeeded */
        }
    })();
}
/** Push a `live` event (serial board moved) to the doctor + global channels. */
export function notifyLive(doctorId) {
    try {
        if (!doctorId)
            return;
        publish([doctorChannel(doctorId), GLOBAL_CHANNEL], 'live');
    }
    catch {
        /* best-effort */
    }
}
//# sourceMappingURL=notify.js.map