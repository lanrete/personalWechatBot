const qrTerm = require("qrcode-terminal");
const {Message, Wechaty} = require("wechaty")
// import qrTerm from "qrcode-terminal";
// import {Message, Wechaty} from "wechaty";

const bot = new Wechaty();

function onScan(qrcode, status) {
    qrTerm.generate(qrcode, {small: true})
}


function onLogin(user) {
    console.log(`${user} login`)
}


function onLogout(user) {
    console.log(`${user} login`)
}


async function onMessage(message) {
    console.log(`RECV: ${message}`);

    if (message.type() !== Message.Type.Text) {
        const file = await message.toFileBox();
        const name = file.name;
        console.log(`Saving file to ${name}`);
        file.toFile(name);
    }
}


function onError(e) {
    console.error(e)
}

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", onMessage);
bot.on("error", onError);
bot.start()