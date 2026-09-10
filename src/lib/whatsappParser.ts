type ParsedMessage = {
    name: string;
    number: string;
    text: string;
    buttonId?: string;
    messageId: string;
    timestamp: Date;
    type: string;
    location?: { latitude: number; longitude: number };
};

export function parseWhatsAppMessage(body: any): ParsedMessage[] {
    const results: ParsedMessage[] = [];

    if (body.object !== 'whatsapp_business_account') return results;

    body.entry?.forEach((entry: any) => {
        entry.changes?.forEach((change: any) => {
            if (change.field !== 'messages') return;

            const value = change.value;

            if (value.messages) {
                value.messages.forEach((msg: any, index: number) => {
                    const contact = value.contacts?.[index];

                    // টেক্সট, বাটন রিপ্লাই বা ইন্টারেক্টিভ বাটন থেকে টেক্সট বের করার লজিক
                    let extractedText = msg.text?.body || "";
                    let extractedButtonId = "";

                    if (msg.type === "button") {
                        extractedText = msg.button?.text || "";
                        extractedButtonId = msg.button?.payload || "";
                    } else if (msg.type === "interactive") {
                        extractedText = msg.interactive?.button_reply?.title || msg.interactive?.list_reply?.title || "";
                        extractedButtonId =
                            msg.interactive?.button_reply?.id || msg.interactive?.list_reply?.id || "";
                    }

                    // লোকেশন ডেটা ধরার লজিক
                    let locationData = undefined;
                    if (msg.type === "location" && msg.location) {
                        locationData = {
                            latitude: msg.location.latitude,
                            longitude: msg.location.longitude
                        };
                    }

                    results.push({
                        name: contact?.profile?.name || "Unknown",
                        number: msg.from,
                        text: extractedText,
                        buttonId: extractedButtonId || undefined,
                        messageId: msg.id,
                        timestamp: new Date(parseInt(msg.timestamp) * 1000),
                        type: msg.type,
                        location: locationData
                    });
                });
            }
        });
    });

    return results;
}