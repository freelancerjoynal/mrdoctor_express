// Dynamic BulkSMS gateway lib (bulksmsbd.net/api/smsapi format:
// api_key + senderid + number (comma-separated) + message).
// Config comes from env — never hardcode credentials here:
//   SMS_GATEWAY_URL, SMS_GATEWAY_API_KEY, SMS_GATEWAY_SENDER_ID
//
// Usage:
//   import { sendSms } from '../../lib/sms.js';
//   const res = await sendSms({ to: '01XXXXXXXXX', message: '...' });
//   const res = await sendSms([{ to, message }, ...]); // bulk, max 100 per call
export interface SmsMessage {
  /** Any common BD format: 01XXXXXXXXX, +8801XXXXXXXXX or 8801XXXXXXXXX. */
  to: string;
  message: string;
}

export interface SmsResult {
  sent: number;
  /** Raw gateway response body (JSON string or text). */
  response: string;
}

const BULK_LIMIT = 100;

/** Normalize any common BD mobile format to 8801XXXXXXXXX. Throws INVALID_PHONE. */
export function normalizeBdPhone(raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('INVALID_PHONE');
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('880')) {
    // already international — keep
  } else if (digits.startsWith('0')) {
    digits = '880' + digits.slice(1);
  } else if (digits.length === 10 && digits.startsWith('1')) {
    digits = '880' + digits;
  }
  if (!/^8801[3-9]\d{8}$/.test(digits)) throw new Error('INVALID_PHONE');
  return digits;
}

function gatewayConfig(): { url: string; apiKey: string; senderId: string } {
  let url = process.env.SMS_GATEWAY_URL?.trim();
  const apiKey = process.env.SMS_GATEWAY_API_KEY?.trim();
  const senderId = process.env.SMS_GATEWAY_SENDER_ID?.trim();
  if (!url || !apiKey || !senderId) throw new Error('SMS_NOT_CONFIGURED');
  // This lib speaks the `smsapi` format (number + message). If the env URL
  // still points at `smsapimany`, switch it — that endpoint rejects this payload.
  if (url.includes('smsapimany')) {
    const fixed = url.replace('smsapimany', 'smsapi');
    console.log(`[SMS] URL uses smsapimany — switching to ${fixed}`);
    url = fixed;
  }
  return { url, apiKey, senderId };
}

/**
 * Send one or many SMS via the configured gateway (`smsapi` format:
 * api_key + senderid + number (comma-separated) + message).
 * Messages with identical text go in one call; different texts need one
 * call each since `smsapi` carries a single message per request.
 * Throws INVALID_PHONE (bad number), SMS_NOT_CONFIGURED (env missing)
 * or SMS_SEND_FAILED (network/gateway error — gateway sends
 * response_code 202 only on real success).
 */
export async function sendSms(input: SmsMessage | SmsMessage[]): Promise<SmsResult> {
  const list = (Array.isArray(input) ? input : [input]).slice(0, BULK_LIMIT);
  if (list.length === 0) throw new Error('INVALID_PHONE');

  const normalized = list.map((m) => {
    if (!m || typeof m.message !== 'string' || m.message.trim().length === 0) {
      throw new Error('INVALID_MESSAGE');
    }
    return { to: normalizeBdPhone(m.to), message: m.message.trim() };
  });

  // Group recipients by identical message text.
  const groups = new Map<string, string[]>();
  for (const m of normalized) {
    const arr = groups.get(m.message) ?? [];
    arr.push(m.to);
    groups.set(m.message, arr);
  }

  const { url, apiKey, senderId } = gatewayConfig();

  // Console trace (never logs the api key).
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    /* keep raw url */
  }

  let sent = 0;
  let lastResponse = '';
  for (const [message, recipients] of groups) {
    const numbers = recipients.join(',');
    console.log(`[SMS] sending to=${numbers} via ${host} sender="${senderId}" chars=${message.length}`);

    const body = new URLSearchParams();
    body.append('api_key', apiKey);
    body.append('senderid', senderId);
    body.append('number', numbers);
    body.append('message', message);

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
    } catch (error: any) {
      console.error(`[SMS] network error to=${numbers}:`, error?.message ?? error);
      throw new Error('SMS_SEND_FAILED');
    }
    const responseText = await res.text().catch(() => '');
    lastResponse = responseText;
    console.log(`[SMS] gateway http=${res.status} response=${responseText.slice(0, 500)}`);

    // BulkSMS BD signals real success with response_code 202 only —
    // HTTP 200 with any other code (e.g. 1003) means NOT sent.
    let ok = false;
    try {
      const json = JSON.parse(responseText) as { response_code?: number; error_message?: string };
      ok = json.response_code === 202;
      if (!ok) console.error(`[SMS] gateway refused to=${numbers}:`, json.error_message ?? responseText.slice(0, 200));
    } catch {
      console.error(`[SMS] gateway non-JSON response to=${numbers}`);
    }
    if (!res.ok || !ok) throw new Error('SMS_SEND_FAILED');
    sent += recipients.length;
  }
  return { sent, response: lastResponse };
}
