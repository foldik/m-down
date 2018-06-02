exports.canRender = function ( block ) {
  return block.type === 'code';
}

exports.render = function ( block ) {
  let content = '<div>\n';
  if ( block.lang !== '' ) {
    content += '<pre><code class="' + block.lang + '">' + block.code + ' </code></pre>';
  } else {
    content += '<pre><code>' + block.code + ' </code></pre>';
  }
  content += '</div>\n';
  return content;
}
