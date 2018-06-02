const inlineRenderer = require( './inline-renderer' );

exports.canRender = function ( block ) {
  return block.type === 'list';
}

exports.render = function ( block ) {
  let content = '<div>\n';
  content += '<ul>\n';
  for ( let j = 0; j < block.items.length; j++ ) {
    if ( j > 0 ) {
      const depthDifference = block.items[ j ].depth - block.items[ j - 1 ].depth
      if ( depthDifference === 0 || depthDifference < 0 ) {
        content += '</li>';
      }
      if ( depthDifference > 0 ) {
        content += '<ul>\n';
      } else if ( depthDifference < 0 ) {
        for ( var k = 0; k < Math.abs( depthDifference ); k++ ) {
          content += '\n</ul>\n</li>';
        }
      }
    }
    content += '<li>' + inlineRenderer.render( block.items[ j ].content );
  }
  content += '</li>\n</ul>\n';
  content += '</div>\n';
  return content;
}
