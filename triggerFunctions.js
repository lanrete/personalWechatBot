const qrTerm = require("qrcode-terminal");
const {Message} = require("wechaty");
const {processText} = require("./processMessage");

function onScan(qrCode, status) {
  console.log(status);
  qrTerm.generate(qrCode, {small: true});
}

function onLogin(user) {
  console.log(`${user} login`);
}

/**
 *
 * @param {Message} message
 */
function onMessage(message) {
  console.log(`RECV: ${message}`);
  let sender = message.from();

  if (sender.self()) {
    // * Ignore messages from self
    return;
  }

  switch (message.type()) {
    case Message.Type.Text:
      console.log("This is a text");
      processText(message);
      break;
    case Message.Type.Image:
      console.log("This is an image");
      break;
    default:
  }
}

function onError(error) {
  console.log(error)
}

module.exports = {
  onScan: onScan,
  onMessage: onMessage,
  onLogin: onLogin,
  onError: onError
};
