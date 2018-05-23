exports.render = function ( paragraphs ) {
  let content = '';
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    content += '<div>\n';
    for ( var j = 0; j < paragraph.length; j++ ) {
      let item = paragraph[ j ];
      if ( item.type === 'code' ) {
        if ( item.lang !== '' ) {
          content += '<pre><code class="' + item.lang + '">' + item.code + ' </code></pre>';
        } else {
          content += '<pre><code>' + item.code + ' </code></pre>';
        }
      } else if ( item.type === 'inline_code' ) {
        content += '<code>' + item.value + '</code>';
      } else if ( item.type === 'link' ) {
        content += '<a href="' + item.link + '">' + item.value + '</a>';
      } else if ( item.type === 'italic' ) {
        content += '<span><i>' + item.value + '</i></span>';
      } else if ( item.type === 'strong' ) {
        content += '<span><strong>' + item.value + '</strong></span>';
      } else {
        content += '<span>' + item.value + '</span>';
      }
    }
    content += '\n</div>\n';
  }
  return content;
}
