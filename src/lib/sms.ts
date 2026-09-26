import axios from 'axios';

/**
 * OTP SMS text in the gateway's REQUIRED template:
 * "Your {Brand/Company Name} OTP is XXXX" (BulkSMSBD docs).
 * Operator/BTRC filters drop OTP-type SMS in any other format or script —
 * so this stays pure ASCII with English digits. Brand via SMS_OTP_BRAND.
 */
export function otpSmsText(otp: string): string {
  const brand = (process.env.SMS_OTP_BRAND ?? 'MrDoctor').trim() || 'MrDoctor';
  return `Your ${brand} OTP is ${otp}`;
}

export async function singleMessage(number: string, message: string) {
  const url = process.env.SMS_GATEWAY_URL || 'http://bulksmsbd.net/api/smsapi';

  const payload = new URLSearchParams({
    api_key: process.env.SMS_GATEWAY_API_KEY ?? '',
    senderid: process.env.SMS_GATEWAY_SENDER_ID ?? '',
    number: number,
    message: message,
  });

  try {
    const response = await axios.post(url, payload.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('SMS Gateway Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(error.response?.data?.message || 'Failed to send SMS');
  }
}