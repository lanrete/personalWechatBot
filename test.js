var tools = require("./tools");
var schedule = require("node-schedule");
var moment = require("moment");

var message = tools.remind("1min", "testing");
console.log(message.message);

// TODO Need to change the console log messages, is putting too much information in it
setTimeout(
  _ => console.log(`Reminding about ${message.message}`),
  message.moment.diff(moment())
);
