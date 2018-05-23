exports.render = function ( paragraphs ) {
  let content = '';
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    content += '<div>\n';
    for ( var j = 0; j < paragraph.length; j++ ) {
      let item = paragraph[ j ];
      if ( item.type === 'code' ) {
        if ( item.lang !== '' ) {
          content += '<pre><code class="' + item.lang + '">' + item.value + ' </code></pre>';
        } else {
          content += '<pre><code>' + item.value + ' </code></pre>';
        }
      } else if ( item.type === 'inline_code' ) {
        content += '<code>' + item.value + '</code>';
      } else if ( item.type === 'link' ) {
        content += '<a href="' + item.link + '">' + item.value + '</a>';
      } else {
        content += '<span>' + item.value + '</span>';
      }
    }
    content += '\n</div>\n';
  }
  return content;
}
