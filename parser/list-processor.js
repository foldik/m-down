const inlineTextProcessor = require( './inline-text-processor' );

exports.process = function ( paragraph ) {
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
    type: 'list',
    items: lines
  };
}
