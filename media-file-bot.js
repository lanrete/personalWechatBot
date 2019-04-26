const qrTerm = require("qrcode-terminal");
const { Message, Wechaty } = require("wechaty");
const fs = require("fs");
const schedule = require("node-schedule");
const moment = require("moment");

// import qrTerm from "qrcode-terminal";
// import {Message, Wechaty} from "wechaty";

const bot = new Wechaty();

function onScan(qrcode, status) {
  qrTerm.generate(qrcode, { small: true });
}

function onLogin(user) {
  console.log(`${user} login`);
}

function onLogout(user) {
  console.log(`${user} login`);
}

async function onMessage(message) {
  console.log(`RECV: ${message}`);

  if (message.from().self()) {
    // * Ignore all the messages send from self (in the reply process)
    return;
  }

  if (message.type() === Message.Type.Text) {
    var text = message.text();
    if (!text.startsWith("!")) {
      // * Ignore all messages not starting with !
      return;
    }
    if (text.startsWith("!")) {
      // * Text starts with ! meaning a change in the topic
      topic = text.slice(1);
      console.log(`Changing topic to ${topic}`);
      message.say(`转化主题为${topic}`);
      // fs.mkdirSync('~/bao/test', {recursive: true});
    }
  }

  if (message.type() !== Message.Type.Text) {
    const file = await message.toFileBox();
    const name = file.name;
    console.log(`Saving file to ${name}`);
    file.toFile(name);
  }
}

function onError(e) {
  console.error(e);
}

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", onMessage);
bot.on("error", onError);
var topic = "default";
bot.start();
