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
