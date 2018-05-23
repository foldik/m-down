const tokenizer = require( './tokenizer' );
const blockSeparator = require( './block-separator' );
const paragraphProcessor = require( './paragraph-processor' );

exports.parse = function ( text ) {
  const blocks = blockSeparator.findBlocks( text );
  const tokenizedBlocks = [];
  for ( let i = 0; i < blocks.length; i++ ) {
    if ( !blocks[ i ].lang ) {
      tokenizedBlocks.push( tokenizer.tokenize( blocks[ i ] ) );
    } else {
      tokenizedBlocks.push( [ blocks[ i ] ] );
    }
  }
  const processedParagraphs = paragraphProcessor.processParagraphs( tokenizedBlocks );
  return processedParagraphs;
}
