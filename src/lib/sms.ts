import axios from 'axios';

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

    console.log('SMS sent successfully:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      recipient: number,
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