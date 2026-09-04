type ParsedMessage = {
    name: string;
    number: string;
    text: string;
    messageId: string;
    timestamp: Date;
    type: string;
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

                    results.push({
                        name: contact?.profile?.name || "Unknown",
                        number: msg.from,
                        text: msg.text?.body || "",
                        messageId: msg.id,
                        timestamp: new Date(parseInt(msg.timestamp) * 1000),
                        type: msg.type
                    });
                });
            }
        });
    });

    return results;
}