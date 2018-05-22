const tokenizer = require('./tokenizer');
const paragraphSeparator = require('./paragraph-separator');

exports.parse = function(text) {
  const chars = tokenizer.tokenize(text);
  const paragraphs = paragraphSeparator.getParagraphs(chars);
}
