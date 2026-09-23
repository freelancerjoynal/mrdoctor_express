import { getSerialLiveStatus, startSerialLive, stopSerialLive, heartbeatLive, skipCurrentSerial, recallSerial, startLiveBreak, endLiveBreak } from '../services/serialLiveService.js';
function callerOf(req) {
    return { userId: req.user.userId, role: req.user.role };
}
function handleError(res, error, fallback) {
    const code = error?.message;
    if (code === 'FORBIDDEN')
        return res.status(403).json({ error: 'Access denied' });
    if (code === 'NO_DOCTOR_PROFILE')
        return res.status(404).json({ error: 'No doctor linked to this account' });
    if (code === 'NO_LIVE')
        return res.status(400).json({ error: 'লাইভ চালু নেই।' });
    if (code === 'NO_CURRENT')
        return res.status(400).json({ error: 'স্কিপ করার মতো সিরিয়াল নেই।' });
    if (code === 'NO_NEXT_SERIAL')
        return res.status(400).json({ error: 'এটাই শেষ সিরিয়াল — স্কিপ করা যাবে না।' });
    if (code === 'INVALID_BREAK')
        return res.status(400).json({ error: 'বিরতির সময় ১–১৮০ মিনিটের মধ্যে দিন।' });
    if (code === 'NO_APPOINTMENTS')
        return res.status(400).json({ error: 'আজকের কোনো অ্যাপয়েন্টমেন্ট নেই — লাইভ চালু করার মতো সিরিয়াল নেই।' });
    return res.status(500).json({ error: fallback });
}
export const showSerialLiveStatus = async (req, res) => {
    try {
        const data = await getSerialLiveStatus(callerOf(req));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'Failed to load live status');
    }
};
export const runSerialLiveStart = async (req, res) => {
    try {
        const data = await startSerialLive(callerOf(req));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'Failed to start live serial');
    }
};
export const runSerialLiveStop = async (req, res) => {
    try {
        const data = await stopSerialLive(callerOf(req));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'Failed to stop live serial');
    }
};
// POST /api/users/serial-live/heartbeat — dashboard presence ping while live is ON.
export const runSerialLiveHeartbeat = async (req, res) => {
    try {
        const data = await heartbeatLive(callerOf(req));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'Failed to heartbeat live serial');
    }
};
export const runSerialLiveSkip = async (req, res) => {
    try {
        const data = await skipCurrentSerial(callerOf(req));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'Failed to skip serial');
    }
};
export const runSerialLiveRecall = async (req, res) => {
    try {
        const data = await recallSerial(callerOf(req), req.body?.serial);
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        if (error?.message === 'RECALL_COOLDOWN') {
            const d = (error.detail ?? {});
            const mins = typeof d.remainingMs === 'number' ? Math.max(1, Math.ceil(d.remainingMs / 60000)) : 20;
            const who = typeof d.patientName === 'string' && d.patientName.trim() ? d.patientName.trim() : 'রোগী';
            const serial = typeof d.serial === 'number' ? d.serial : '?';
            return res.status(400).json({
                error: `⏳ ${who} তার সিরিয়াল (${serial}) মিস করেছেন — শাস্তি হিসেবে আরো ${mins} মিনিট পর বোর্ডে আনা যাবে।`,
            });
        }
        if (error?.message === 'NOT_IN_QUEUE')
            return res.status(404).json({ error: 'এই সিরিয়াল আজকের তালিকায় নেই (সেবা হয়ে গেছে বা ভুল নম্বর)।' });
        if (error?.message === 'NOT_MISSED')
            return res.status(400).json({ error: 'এই সিরিয়াল মিস করেনি — বোর্ডে বা সামনে আছে।' });
        if (error?.message === 'INVALID_SERIAL')
            return res.status(400).json({ error: 'সঠিক সিরিয়াল নম্বর দিন।' });
        return handleError(res, error, 'Failed to recall serial');
    }
};
export const runLiveBreakStart = async (req, res) => {
    try {
        const body = (req.body ?? {});
        const data = await startLiveBreak(callerOf(req), body.reason, body.minutes);
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'বিরতি চালু করা যায়নি।');
    }
};
export const runLiveBreakEnd = async (req, res) => {
    try {
        const data = await endLiveBreak(callerOf(req));
        return res.json({ backend: 'usersBackend', data });
    }
    catch (error) {
        return handleError(res, error, 'বিরতি শেষ করা যায়নি।');
    }
};
//# sourceMappingURL=serialLiveController.js.map