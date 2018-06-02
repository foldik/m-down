exports.canRender = function ( block ) {
  return block.type === 'img';
}

exports.render = function ( block ) {
  return '<div>\n' + '<img src="' + block.link + '" alt="' + block.alt + '"></img>' + '</div>\n';
}
