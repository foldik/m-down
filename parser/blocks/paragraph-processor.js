const tokenizer = require( '../tokenize/tokenizer' );
const inlineTextProcessor = require( '../inline/inline-text-processor' );

exports.process = function ( block ) {
  return {
    match: true,
    block: {
      type: 'p',
      content: inlineTextProcessor.process( tokenizer.tokenize( block ) )
    }
  };
}
