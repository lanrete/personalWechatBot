const moment = require("moment");

/**
 *
 * @param {String} messageString
 */
function processRemind(messageString) {
  messageString = messageString.replace("!remind ", "");
  let tokens = messageString.split(" ");
  let timespan = tokens[0];
  tokens.shift();
  let actualMessage = tokens.join(" ");
  actualMessage = `Remind you to [${actualMessage}] as ordered [${timespan}] ago.`;

  let returnMessage = `Cannot parse${timespan}`;
  let isSuccess = false;
  let numberPart;
  let remindTime;

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

  let retObj = {
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
  let tokens = messageString.split(" ");
  if (!(tokens.length === 1)) {
    tokens.shift();
  }
  let newTheme = tokens.join(" ");
  let returnMessage = `Changing topic to ${newTheme}`;
  status["theme"] = newTheme;
  return { returnMessage: returnMessage };
}

module.exports = {
  processRemind: processRemind,
  processTopic: processTopic
};
