const { Message } = require("wechaty");
const { processRemind } = require("./textFunctions");
const moment = require("moment");

/**
 *
 * @param {Message} message
 */
function processText(message) {
  var text = message.text();
  if (!text.startsWith("!")) {
    // * Ignore text message not starting with !
    return;
  }
  switch (text) {
    case (text.match("^!remind") || {}).input:
      console.log("A reminder message");
      var parseResult = processRemind(text);
      message.say(parseResult.returnMessage);
      if (parseResult.isSuccess) {
        setTimeout(
          _ => message.say(parseResult.remindMessage),
          parseResult.remindTime.diff(moment())
        );
      }
      break;
    default:
      console.log("Doesn't match anything");
      return;
  }
}

module.exports = {
  processText: processText
};