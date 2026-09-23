export type ParsedMessage = {
    name: string;
    number: string;
    text: string;
    buttonId?: string;
    messageId: string;
    timestamp: Date;
    type: string;
    location?: {
        latitude: number;
        longitude: number;
    };
};
export declare function parseWhatsAppMessage(body: any): ParsedMessage[];
//# sourceMappingURL=whatsappParser.d.ts.map