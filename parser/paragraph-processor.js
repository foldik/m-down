const inlineTextProcessor = require( './inline-text-processor' );

exports.processParagraphs = function ( paragraphs ) {
  let resultParagraphs = [];
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];

    

    resultParagraphs.push( inlineTextProcessor.process( paragraph ) );
  }
  return resultParagraphs;
}
