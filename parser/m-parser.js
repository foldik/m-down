const tokenizer = require( './tokenizer' );
const blockSeparator = require( './block-separator' );
const paragraphProcessor = require( './paragraph-processor' );

exports.parse = function ( text ) {
  const blocks = blockSeparator.findBlocks( text );
  const processedParagraphs = [];
  for ( let i = 0; i < blocks.length; i++ ) {
    if ( !blocks[ i ].lang ) {
      processedParagraphs.push( paragraphProcessor.processParagraph( tokenizer.tokenize( blocks[ i ] ) ) );
    } else {
      processedParagraphs.push( {
        type: 'code',
        item: blocks[ i ]
      } );
    }
  }
  return processedParagraphs;
}
