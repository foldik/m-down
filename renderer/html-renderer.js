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

function isHeader( type ) {
  return type === 'h1' ||
    type === 'h2' ||
    type === 'h3' ||
    type === 'h4' ||
    type === 'h5' ||
    type === 'h6';
}

exports.render = function ( paragraphs ) {
  let content = '';
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    if ( paragraph.type === 'code' ) {
      content += '<div>\n';
      if ( paragraph.lang !== '' ) {
        content += '<pre><code class="' + paragraph.lang + '">' + paragraph.code + ' </code></pre>';
      } else {
        content += '<pre><code>' + paragraph.code + ' </code></pre>';
      }
      content += '</div>\n';
    } else if ( paragraph.type === 'list' ) {
      content += '<div>\n';
      content += '<ul>\n';
      for ( let j = 0; j < paragraph.content.length; j++ ) {
        content += '<li>' + renderInlineItems( paragraph.content[ j ] ) + '</li>';
      }
      content += '\n</ul>\n';
      content += '</div>\n';
    } else if ( isHeader( paragraph.type ) ) {
      content += '<' + paragraph.type + '>\n';
      content += renderInlineItems( paragraph.content );
      content += '\n</' + paragraph.type + '>\n';
    } else if ( paragraph.type === 'img' ) {
      content += '<div>\n';
      content += '<img src="' + paragraph.link + '" alt="' + paragraph.alt + '"></img>';
      content += '</div>\n';
    } else if ( paragraph.type === 'p' ) {
      content += '<p>\n';
      content += renderInlineItems( paragraph.content );
      content += '\n</p>\n';
    }
  }
  return content;
}
