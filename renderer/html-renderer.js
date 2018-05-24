function renderInlineItems( paragraph ) {
  let content = '';
  for ( var j = 0; j < paragraph.length; j++ ) {
    let item = paragraph[ j ];
    if ( item.type === 'inline_code' ) {
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
  return content;
}

exports.render = function ( paragraphs ) {
  let content = '';
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    content += '<div>\n';
    if ( paragraph.length === 1 && paragraph[ 0 ].type === 'code' ) {
      if ( paragraph[ 0 ].lang !== '' ) {
        content += '<pre><code class="' + paragraph[ 0 ].lang + '">' + paragraph[ 0 ].code + ' </code></pre>';
      } else {
        content += '<pre><code>' + paragraph[ 0 ].code + ' </code></pre>';
      }
    } else if ( paragraph.type === 'list' ) {
      content += '<ul>\n';
      for ( let j = 0; j < paragraph.lines.length; j++ ) {
        content += '<li>' + renderInlineItems( paragraph.lines[ j ] ) + '</li>';
      }
      content += '\n</ul>\n';
    } else {
      content += renderInlineItems( paragraph );
    }
    content += '\n</div>\n';
  }
  return content;
}
