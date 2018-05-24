const tokenizer = require( './tokenizer' );
const blockSeparator = require( './block-separator' );
const paragraphProcessor = require( './paragraph-processor' );

function isHeader( text ) {
  return text.startsWith( '# ' ) ||
    text.startsWith( '## ' ) ||
    text.startsWith( '### ' ) ||
    text.startsWith( '#### ' ) ||
    text.startsWith( '##### ' ) ||
    text.startsWith( '###### ' );
}

function preprocessHeader( text ) {
  let headerType = text.startsWith( '# ' ) ? 1 :
    text.startsWith( '## ' ) ? 2 :
    text.startsWith( '### ' ) ? 3 :
    text.startsWith( '#### ' ) ? 4 :
    text.startsWith( '##### ' ) ? 5 : 6;

  return {
    type: 'h' + headerType,
    value: text.substring( headerType )
  };
}

exports.parse = function ( text ) {
  const blocks = blockSeparator.findBlocks( text );
  const processedParagraphs = [];
  for ( let i = 0; i < blocks.length; i++ ) {
    if ( blocks[ i ].lang ) {
      processedParagraphs.push( {
        type: 'code',
        item: blocks[ i ]
      } );
    } else if ( isHeader( blocks[ i ] ) ) {
      let header = preprocessHeader( blocks[ i ] );
      let result = paragraphProcessor.processParagraph( tokenizer.tokenize( header.value ) );
      result.type = header.type;
      processedParagraphs.push( result );
    } else {
      processedParagraphs.push( paragraphProcessor.processParagraph( tokenizer.tokenize( blocks[ i ] ) ) );
    }
  }
  return processedParagraphs;
}
