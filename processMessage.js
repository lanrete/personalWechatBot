const { Message } = require("wechaty");
const { processRemind, processTopic } = require("./textFunctions");
const moment = require("moment");

/**
 *
 * @param {Message} message
 * @returns {Promise<void>}
 */
async function processText(message) {
  // * A dirty patch on the eslint no-usage error on import
  console.log(Message.Type);
  let text = message.text();
  if (!text.startsWith("!")) {
    // * Ignore text message not starting with !
    return;
  }
  switch (text) {
    case (text.match("^!remind") || {}).input: {
      console.log("A reminder message");
      let parseResult = processRemind(text);
      await message.say(parseResult.returnMessage);
      if (parseResult.isSuccess) {
        setTimeout(
          () => message.say(parseResult.remindMessage),
          parseResult.remindTime.diff(moment())
        );
      }
      break;
    }
    case (text.match("^!topic") || {}).input: {
      console.log("A change in topic");
      let parseResult = processTopic(text);
      await message.say(parseResult.returnMessage);
      break;
    }
    default: {
      console.log("Doesn't match anything");
      return;
    }
  }
}

module.exports = {
  processText: processText
};
