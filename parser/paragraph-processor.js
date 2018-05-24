const listProcessor = require( './list-processor' );
const inlineTextProcessor = require( './inline-text-processor' );

exports.processParagraph = function ( paragraph ) {
  if ( paragraph[ 0 ].type === 'hyphen' ) {
    return listProcessor.process( paragraph );
  } else {
    return {
      type: 'p',
      items: inlineTextProcessor.process( paragraph )
    };
  }
}
