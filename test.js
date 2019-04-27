var tools = require("./tools");
var moment = require("moment");

var message = tools.parseRemindText("!remind me 2min 吃饭")

setTimeout(
  _ => console.log(message.reminder),
  message.moment.diff(moment())
);
