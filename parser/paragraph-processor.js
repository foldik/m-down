const inlineTextProcessor = require( './inline-text-processor' );
const listProcessor = require( './list-processor' );

exports.processParagraphs = function ( paragraphs ) {
  let resultParagraphs = [];
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    if ( paragraph[ 0 ].type === 'hyphen' ) {
      resultParagraphs.push( listProcessor.process( paragraph ) );
    } else {
      resultParagraphs.push( inlineTextProcessor.process( paragraph ) );
    }

  }
  return resultParagraphs;
}
