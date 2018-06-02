const tokenizer = require( '../tokenize/tokenizer' );
const inlineTextProcessor = require( '../inline/inline-text-processor' );

exports.process = function ( block ) {
  if ( !block.startsWith('> ') ) {
    return {
      match: false
    };
  }
  const content = inlineTextProcessor.process( tokenizer.tokenize( block.replace('> ', '') ) );
  return {
    match: true,
    block: {
      type: 'blockquote',
      content: content
    }
  };
}
