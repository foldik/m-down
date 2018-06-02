const inlineRenderer = require( './inline-renderer' );

exports.canRender = function ( block ) {
  return block.type === 'p';
}

exports.render = function ( block ) {
  return '<p>\n' + inlineRenderer.render( block.content ) + '\n</p>\n';
}
