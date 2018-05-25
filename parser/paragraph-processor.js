const listProcessor = require( './list-processor' );
const imageProcessor = require( './image-processor' );
const inlineTextProcessor = require( './inline-text-processor' );

exports.processParagraph = function ( paragraph ) {
  if ( paragraph[ 0 ].type === 'hyphen' ) {
    return listProcessor.process( paragraph );
  }

  if ( paragraph[ 0 ].type === 'exclamation_mark' ) {
    const imageResult = imageProcessor.tryProcess( paragraph );
    if ( imageResult.match ) {
      return imageResult.element;
    }
  }

  return {
    type: 'p',
    items: inlineTextProcessor.process( paragraph )
  };
}
