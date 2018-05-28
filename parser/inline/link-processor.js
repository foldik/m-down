function hasType( paragraph, index, type ) {
  return index < paragraph.length && paragraph[ index ].type === type;
}

function hasValue( paragraph, index, value ) {
  return index < paragraph.length && paragraph[ index ].value === value;
}

exports.tryProcess = function ( paragraph, index ) {
  let tmpIndex = index + 1;
  let isLink = false;
  let name = '';
  let link = '';
  if ( hasType( paragraph, tmpIndex, 'text' ) ) {
    name = paragraph[ tmpIndex ].value;
    tmpIndex++;
    if ( hasValue( paragraph, tmpIndex, ']' ) ) {
      tmpIndex++;
      if ( hasValue( paragraph, tmpIndex, '(' ) ) {
        tmpIndex++;
        if ( hasType( paragraph, tmpIndex, 'text' ) ) {
          link = paragraph[ tmpIndex ].value;
          tmpIndex++;
          if ( hasValue( paragraph, tmpIndex, ')' ) ) {
            tmpIndex++;
            isLink = true;
          }
        }
      }
    }
  }
  if ( isLink ) {
    return {
      match: true,
      newIndex: tmpIndex,
      element: {
        type: 'link',
        value: name,
        link: link
      }
    };
  } else {
    return {
      match: false
    };
  }
}
