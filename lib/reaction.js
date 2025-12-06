// index.js
const {
    makeWASocket,
    proto,
    getContentType,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

async function reaction(sock, idch, emoji) {
    try {
        // Ambil pesan terakhir dari channel (WAMessage)
        const msgs = await sock.groupFetchAllParticipating();
        
        // Fetch pesan terakhir dari channel
        let m = await sock.fetchMessagesFromWA(idch, 1);

        if (!m || m.length === 0) return console.log("Tidak ada pesan di channel");

        let lastMsg = m[0];

        await sock.sendMessage(idch, {
            react: {
                text: emoji,
                key: lastMsg.key
            }
        });

        console.log("Reaction terkirim ke channel:", idch);
        return true;

    } catch (err) {
        console.error("Error reaction:", err);
        return false;
    }
}

module.exports = { reaction };