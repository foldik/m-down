const tokenizer = require( '../tokenize/tokenizer' );
const inlineTextProcessor = require( '../inline/inline-text-processor' );

function isValidList( lines ) {
  return lines
    .map( line => line.trim() )
    .every( line => line.startsWith( '-' ) );
}

exports.process = function ( block ) {
  const rawLines = block.split( '\n' );
  if ( !isValidList( rawLines ) ) {
    return {
      match: false
    };
  }

  const lines = rawLines
    .map( line => line.replace( '-', '' ).trim() )
    .map( line => tokenizer.tokenize( line ) )
    .map( tokens => inlineTextProcessor.process( tokens ) );

  return {
    match: true,
    block: {
      type: 'list',
      content: lines
    }
  };
}
