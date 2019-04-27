var moment = require("moment");

/**
 *
 * @param {String} messageString
 */
function processRemind(messageString) {
  messageString = messageString.replace("!remind ", "");
  var tokens = messageString.split(" ");
  var timespan = tokens[0];
  tokens.shift();
  var actualMessage = tokens.join(" ");

  var returnMessage = `Cannot parse${timespan}`;
  var isSuccess = false;

  if (timespan.includes("min")) {
    var numberPart = Number(timespan.replace("min", ""));
    var remindTime = moment().add(numberPart, "minutes");
    returnMessage = `Will remind you about [${actualMessage}] at ${remindTime.format(
      "DD-MMM HH:mm"
    )}`;
    isSuccess = true;
  }
  if (timespan.includes("hour")) {
    var numberPart = Number(timespan.replace("hour", ""));
    var remindTime = moment().add(numberPart, "hour");
    returnMessage = `Will remind you about [${actualMessage}] at ${remindTime.format(
      "DD-MMM HH:mm"
    )}`;
    isSuccess = true;
  }

  var retObj = {
    returnMessage: returnMessage,
    isSuccess: isSuccess
  };
  if (isSuccess) {
    retObj["remindTime"] = remindTime;
    retObj["remindMessage"] = actualMessage;
  }

  return retObj;
}

module.exports = {
  processRemind: processRemind
};
