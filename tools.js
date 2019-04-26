var moment = require("moment");

/**
 * @param {String} time
 * @param {String} message
 */
function remind(time, message) {
  var messageText = `无法解析${time}`;
  if (time.includes("min")) {
    let number_part = Number(time.replace("min", ""));
    var remindTime = moment().add(number_part, "minutes");
    messageText = 
      `Will remind you about [${message}] at ${remindTime.format("DD-MMM HH:mm")}`
  } else if (time.includes("hour")) {
    let number_part = Number(time.replace("hour", ""));
    var remindTime = moment().add(number_part, "hour");
    messageText = 
      `Will remind you about ${message} at ${remindTime.format("DD-MMM HH:mm")}`
  } 
  return messageText
}


module.exports = {
    remind: remind
};