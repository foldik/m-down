const tokenizer = require( '../tokenize/tokenizer' );
const inlineTextProcessor = require( '../inline/inline-text-processor' );

exports.process = function ( block ) {
  if ( !block.startsWith( '-' ) ) {
    return {
      match: false
    };
  }
  let paragraph = tokenizer.tokenize( block );
  let lines = [];
  let index = 0;
  let line = [];
  while ( paragraph.length > index ) {
    if ( paragraph[ index ].value === '\n' ) {
      lines.push( inlineTextProcessor.process( line ) );
      line = [];
    } else {
      if ( paragraph[ index ].type !== 'hyphen' ) {
        line.push( paragraph[ index ] );
      }
    }
    index++;
  }
  lines.push( inlineTextProcessor.process( line ) );

  return {
    match: true,
    block: {
      type: 'list',
      content: lines
    }
  };
}
