const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function sendDiscordNotification(message: string) {
  if (!DISCORD_WEBHOOK_URL) return;

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });
  } catch (error) {
    console.error("Discord webhook error:", error);
  }
}
