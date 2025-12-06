// index.js
const {
    makeWASocket,
    proto,
    getContentType,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

function toChannelJid(input) {
    // pastikan string
    input = String(input || "");

    // hapus prefix link channel
    input = input.replace(/^https?:\/\/(www\.)?whatsapp\.com\/channel\//i, "");

    // buang angka di belakang (contoh: /999)
    input = input.split("/")[0];

    // jika sudah berbentuk xxx@broadcast → kembalikan
    if (input.includes("@")) return input;

    // jika belum → tambahkan @broadcast
    return input + "@broadcast";
}

async function reaction(sock, idch, emoji) {
    try {
        // convert link → JID
        const target = toChannelJid(idch);

        console.log("Target JID:", target, "type:", typeof target);

        // harus string
        if (typeof target !== "string") {
            throw new Error("JID bukan string");
        }

        // ambil pesan terakhir (Baileys)
        const res = await sock.fetchMessagesFromWA(target, 1);

        if (!res || res.length === 0) {
            console.log("Channel belum punya pesan");
            return false;
        }

        const last = res[0];

        // kirim reaction
        await sock.sendMessage(target, {
            react: {
                text: emoji,
                key: last.key
            }
        });

        console.log("Reaction berhasil dikirim!");
        return true;

    } catch (e) {
        console.error("ERROR DI FUNCTION REACTION:", e);
        return false;
    }
}

module.exports = { reaction };