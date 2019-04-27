var moment = require("moment");

/**
 * @param {String} rawMessage
 */
function parseRemindText(rawMessage) {
  rawMessage = rawMessage.replace("!remind me ", "");
  var tokens = rawMessage.split(" ");
  var time = tokens[0];
  tokens.shift();
  var message = tokens.join(" ");

  var messageText = `无法解析${time}`;
  var isSuccess = false;
  if (time.includes("min")) {
    let number_part = Number(time.replace("min", ""));
    var remindTime = moment().add(number_part, "minutes");
    messageText = `Will remind you about [${message}] at ${remindTime.format(
      "DD-MMM HH:mm"
    )}`;
    isSuccess = true;
  }
  if (time.includes("hour")) {
    let number_part = Number(time.replace("hour", ""));
    var remindTime = moment().add(number_part, "hour");
    messageText = `Will remind you about ${message} at ${remindTime.format(
      "DD-MMM HH:mm"
    )}`;
    isSuccess = true;
  }
  var ret_obj = {
    message: messageText,
    isSuccess: isSuccess
  };
  if (isSuccess) {
    ret_obj["moment"] = remindTime;
    ret_obj["reminder"] = message;
  }
  return ret_obj;
}

module.exports = {
  parseRemindText: parseRemindText
};
