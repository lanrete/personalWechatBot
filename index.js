import {Wechaty} from "wechaty";

const bot = new Wechaty();


function getQrCode(qrcode, status) {
    return console.log(
        [
            "https://api.qrserver.com/v1/create-qr-code/?data=",
            encodeURIComponent(qrcode),
            "&size=220x220&margin=20"
        ].join("")
    );
}

function logLogin(user) {
    console.log(`User ${user} logged in`);
}

function logMessage(message) {
    console.log(`Message: ${message}`)
}

bot.on("scan", getQrCode);
bot.on("login", logLogin);
bot.on("message", logMessage);
bot.start();