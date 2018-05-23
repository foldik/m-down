const linkProcessor = require( './link-processor' );

exports.processParagraphs = function ( paragraphs ) {
  let resultParagraphs = [];
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    let index = 0;
    let resultParagraph = [];
    while ( index < paragraph.length ) {
      if ( paragraph[ index ].value === '[' ) {
        const result = linkProcessor.tryProcessLink( paragraph, index );
        if ( result.match ) {
          resultParagraph.push( result.element );
          index = result.newIndex;
          continue;
        }
      }
      resultParagraph.push( paragraph[ index ] );
      index++;
    }
    resultParagraphs.push( resultParagraph );
  }
  return resultParagraphs;
}
