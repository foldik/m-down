const tokenizer = require( './tokenizer' );
const paragraphSeparator = require( './paragraph-separator' );
const paragraphProcessor = require( './paragraph-processor' );

exports.parse = function ( text ) {
  const chars = tokenizer.tokenize( text );
  const paragraphs = paragraphSeparator.getParagraphs( chars );
  const processedParagraphs = paragraphProcessor.processParagraphs( paragraphs );
  return processedParagraphs;
}
