exports.render = function ( paragraph ) {
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
