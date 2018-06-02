const inlineRenderer = require( './inline-renderer' );

exports.canRender = function ( block ) {
  return block.type === 'blockquote';
}

exports.render = function ( block ) {
  return '<blockquote>\n' + inlineRenderer.render( block.content ) + '\n</blockquote>\n';
}
