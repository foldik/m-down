const inlineTextProcessor = require( './inline-text-processor' );

exports.processParagraphs = function ( paragraphs ) {
  let resultParagraphs = [];
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];

    if (paragraph[0].type === 'hyphen') {

    } else {
      resultParagraphs.push( inlineTextProcessor.process( paragraph ) );
    }

  }
  return resultParagraphs;
}
