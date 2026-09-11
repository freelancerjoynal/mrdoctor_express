// Example flow for the publicWebsite module.
// Mirrors src/whatsappChatbot/flows/* structure — fully isolated.
export function homeFlow(): { title: string; links: string[] } {
  return {
    title: 'Public website home flow',
    links: ['/', '/health'],
  };
}
