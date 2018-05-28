const tokenizer = require( '../tokenize/tokenizer' );
const inlineTextProcessor = require( '../inline/inline-text-processor' );

function isHeader( text ) {
  return text.startsWith( '# ' ) ||
    text.startsWith( '## ' ) ||
    text.startsWith( '### ' ) ||
    text.startsWith( '#### ' ) ||
    text.startsWith( '##### ' ) ||
    text.startsWith( '###### ' );
}

function preprocessHeader( text ) {
  let headerType = text.startsWith( '# ' ) ? 1 :
    text.startsWith( '## ' ) ? 2 :
    text.startsWith( '### ' ) ? 3 :
    text.startsWith( '#### ' ) ? 4 :
    text.startsWith( '##### ' ) ? 5 : 6;

  return {
    type: 'h' + headerType,
    content: text.substring( headerType )
  };
}

exports.process = function ( block ) {
  if ( !isHeader( block ) ) {
    return {
      match: false
    };
  }
  const header = preprocessHeader( block );
  const content = inlineTextProcessor.process( tokenizer.tokenize( header.content ) );
  return {
    match: true,
    block: {
      type: header.type,
      content: content
    }
  };
}
