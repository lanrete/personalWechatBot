const { onScan, onMessage, onLogin, onError } = require("./triggerFunctions");
const { Wechaty } = require("wechaty");

status = {
  topic: "default topic"
};
const bot = new Wechaty();

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("message", onMessage);
bot.on("error", onError);
bot.start();
