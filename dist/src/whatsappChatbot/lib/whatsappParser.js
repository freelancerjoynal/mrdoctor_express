export function parseWhatsAppMessage(body) {
    const results = [];
    if (body.object !== "whatsapp_business_account")
        return results;
    body.entry?.forEach((entry) => {
        entry.changes?.forEach((change) => {
            if (change.field !== "messages")
                return;
            const value = change.value;
            if (value.messages) {
                value.messages.forEach((msg, index) => {
                    const contact = value.contacts?.[index];
                    let extractedText = msg.text?.body || "";
                    let extractedButtonId = "";
                    if (msg.type === "button") {
                        extractedText = msg.button?.text || "";
                        extractedButtonId = msg.button?.payload || "";
                    }
                    else if (msg.type === "interactive") {
                        extractedText =
                            msg.interactive?.button_reply?.title ||
                                msg.interactive?.list_reply?.title ||
                                "";
                        extractedButtonId =
                            msg.interactive?.button_reply?.id ||
                                msg.interactive?.list_reply?.id ||
                                "";
                    }
                    let locationData = undefined;
                    if (msg.type === "location" && msg.location) {
                        locationData = {
                            latitude: msg.location.latitude,
                            longitude: msg.location.longitude,
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
                        location: locationData,
                    });
                });
            }
        });
    });
    return results;
}
//# sourceMappingURL=whatsappParser.js.map