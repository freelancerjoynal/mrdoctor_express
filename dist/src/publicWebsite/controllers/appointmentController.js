import { createAppointment, getAppointmentOptions, getSerialLiveBoard } from '../services/appointmentService.js';
export const showAppointmentOptions = async (req, res) => {
    try {
        const options = await getAppointmentOptions(req.params.username);
        return res.json({ backend: 'publicWebsite', data: options });
    }
    catch (error) {
        if (error?.message === 'DOCTOR_NOT_FOUND')
            return res.status(404).json({ error: 'Doctor not found' });
        return res.status(500).json({ error: 'Failed to load appointment options' });
    }
};
export const showSerialLiveBoard = async (req, res) => {
    try {
        const board = await getSerialLiveBoard(req.params.username);
        return res.json({ backend: 'publicWebsite', data: board });
    }
    catch (error) {
        if (error?.message === 'DOCTOR_NOT_FOUND')
            return res.status(404).json({ error: 'Doctor not found' });
        return res.status(500).json({ error: 'Failed to load live serial' });
    }
};
export const postAppointment = async (req, res) => {
    try {
        const result = await createAppointment(req.body ?? {});
        return res.status(201).json({ backend: 'publicWebsite', data: result, message: result.message });
    }
    catch (error) {
        const msg = error?.message ?? 'UNKNOWN';
        if (msg === 'DOCTOR_NOT_FOUND')
            return res.status(404).json({ error: 'Doctor not found' });
        if (msg === 'INVALID_NAME')
            return res.status(400).json({ error: 'রোগীর নাম দিন (কমপক্ষে ৩ অক্ষর)।' });
        if (msg === 'INVALID_PATIENT_TYPE')
            return res.status(400).json({ error: 'রোগীর ধরন বেছে নিন (নতুন / পুরনো)।' });
        if (msg === 'INVALID_PHONE')
            return res.status(400).json({ error: 'সঠিক মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।' });
        if (msg === 'INVALID_PROBLEM')
            return res.status(400).json({ error: 'সমস্যাটি একটু বিস্তারিত লিখুন (কমপক্ষে ৩ অক্ষর)।' });
        if (msg === 'INVALID_AGE')
            return res.status(400).json({ error: 'বয়স সংখ্যায় লিখুন (যেমন: ৩৫)।' });
        if (msg === 'INVALID_WEIGHT')
            return res.status(400).json({ error: 'ওজন সংখ্যায় লিখুন (যেমন: ৬৫)।' });
        if (msg === 'INVALID_CHAMBER')
            return res.status(400).json({ error: 'সঠিক চেম্বার বেছে নিন।' });
        if (msg === 'CHAMBER_REQUIRED')
            return res.status(400).json({ error: 'কোন চেম্বারে দেখাতে চান বেছে নিন।' });
        if (msg === 'NO_CHAMBER')
            return res.status(400).json({ error: 'এই ডাক্তারের কোনো চেম্বার পাওয়া যায়নি।' });
        if (msg === 'INVALID_DATE')
            return res.status(400).json({ error: 'সঠিক তারিখ বেছে নিন।' });
        if (msg === 'CLOSED_DAY')
            return res.status(400).json({ error: 'ওই দিন চেম্বার বন্ধ থাকে — চালু দিন বেছে নিন।' });
        return res.status(500).json({ error: 'অনুরোধ জমা দেওয়া যায়নি। আবার চেষ্টা করুন।' });
    }
};
//# sourceMappingURL=appointmentController.js.map