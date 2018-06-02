const inlineRenderer = require( './inline-renderer' );

exports.canRender = function ( block ) {
  const type = block.type;
  return type === 'h1' ||
    type === 'h2' ||
    type === 'h3' ||
    type === 'h4' ||
    type === 'h5' ||
    type === 'h6';
}

exports.render = function ( block ) {
  return '<' + block.type + '>\n' + inlineRenderer.render( block.content ) + '\n</' + block.type + '>\n';
}
