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
  actualMessage = `Remind you to [${actualMessage}] as ordered [${timespan}] ago.`;

  var returnMessage = `Cannot parse${timespan}`;
  var isSuccess = false;
  var numberPart;
  var remindTime;

  if (timespan.includes("min")) {
    numberPart = Number(timespan.replace("min", ""));
    remindTime = moment().add(numberPart, "minutes");
    returnMessage = `Will remind you about [${actualMessage}] at ${remindTime.format(
      "DD-MMM HH:mm"
    )}`;
    isSuccess = true;
  }
  if (timespan.includes("hour")) {
    numberPart = Number(timespan.replace("hour", ""));
    remindTime = moment().add(numberPart, "hour");
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

/**
 *
 * @param {String} messageString
 */
function processTopic(messageString) {
  messageString = messageString.replace("!topic ", "");
  var tokens = messageString.split(" ");
  if (!tokens.length === 1) {
    tokens.shift();
  }
  var newTheme = tokens.join(" ");
  var returnMessage = `Changing topic to ${newTheme}`;
  status["theme"] = newTheme;
  return { returnMessage: returnMessage };
}

module.exports = {
  processRemind: processRemind,
  processTopic: processTopic
};
