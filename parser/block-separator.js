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

const CODE_BLOCK_MARKER = '```';

function includeBlockIfContentNotEmpty( blocks, content ) {
  if ( content !== '' ) {
    blocks.push( content );
  }
}

exports.findBlocks = function ( lines ) {
  if ( lines.length == 0 ) {
    return [];
  }
  const blocks = [];
  let lineNumber = 0;
  let content = '';
  while ( lineNumber < lines.length ) {
    if ( lines[ lineNumber ].startsWith( CODE_BLOCK_MARKER ) ) {
      includeBlockIfContentNotEmpty( blocks, content );
      content = '';
      const lang = lines[ lineNumber ].replace( CODE_BLOCK_MARKER, '' );
      let code = '';
      lineNumber++;
      while ( lineNumber < lines.length && !lines[ lineNumber ].startsWith( CODE_BLOCK_MARKER ) ) {
        if ( code !== '' ) {
          code += '\n';
        }
        code += lines[ lineNumber ];
        lineNumber++;
      }
      blocks.push( {
        type: 'code',
        lang: lang,
        code: code
      } );
    } else if ( lines[ lineNumber ].trim() === '' ) {
      includeBlockIfContentNotEmpty( blocks, content );
      content = '';
    } else {
      if ( content !== '' ) {
        content += '\n';
      }
      content += lines[ lineNumber ];
    }
    lineNumber++;
  }
  includeBlockIfContentNotEmpty( blocks, content );
  return blocks;
}
