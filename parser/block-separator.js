exports.findBlocks = function ( text ) {
  let blocks = [];
  let block = '';
  let index = 0;
  while ( index < text.length ) {
    if ( text.charAt( index ) === '`' && block.length === 0 ) {
      let tmpIndex = index + 3;
      let lang = '';
      while ( text.charAt( tmpIndex ) !== '\r' && text.charAt( tmpIndex ) !== '\n' ) {
        lang += text.charAt( tmpIndex );
        tmpIndex++;
      }
      let code = '';
      while ( tmpIndex < text.length && text.charAt( tmpIndex ) !== '`' ) {
        code += text.charAt( tmpIndex );
        tmpIndex++;
      }
      index = tmpIndex + 3;
      blocks.push( {
        type: 'code',
        lang: lang,
        code: code.trim()
      } );

    } else if ( text.charAt( index ) === '\r' || text.charAt( index ) === '\n' ) {
      let newLineCounter = 0;
      let tmpIndex = index;
      while ( tmpIndex < text.length && ( text.charAt( tmpIndex ) === '\r' || text.charAt( tmpIndex ) === '\n' ) ) {
        if ( text.charAt( tmpIndex ) === '\n' ) {
          newLineCounter++;
        }
        tmpIndex++;
      }
      index = tmpIndex;
      if ( block.trim().length > 0 && index < text.length ) {
        if ( newLineCounter > 1 ) {
          blocks.push( block );
          block = '';
        } else {
          block += '\n';
        }
      }
    } else {
      block += text.charAt( index );
      index++;
    }
  }
  if ( block.trim().length > 0 ) {
    blocks.push( block );
  }
  return blocks;
}
