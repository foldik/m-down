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
    .map( line => {
      return {
        depth: line.indexOf( '-' ),
        content: line.trim().replace( '-', '' ).trim()
      };
    } )
    .map( line => {
      return {
        depth: line.depth,
        tokens: tokenizer.tokenize( line.content )
      };
    } )
    .map( line => {
      return {
        depth: line.depth,
        content: inlineTextProcessor.process( line.tokens )
      };
    } );

  return {
    match: true,
    block: {
      type: 'list',
      items: lines
    }
  };
}
