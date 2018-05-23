function hasType( paragraph, index, type ) {
  return index < paragraph.length && paragraph[ index ].type === type;
}

function hasValue( paragraph, index, value ) {
  return index < paragraph.length && paragraph[ index ].value === value;
}

exports.tryProcess = function ( paragraph, index ) {
  let tmpIndex = index + 1;
  let isItalic = false;
  let value = '';
  if ( hasType( paragraph, tmpIndex, 'text' ) ) {
    value = paragraph[ tmpIndex ].value;
    tmpIndex++;
    if ( hasValue( paragraph, tmpIndex, '*' ) || hasValue( paragraph, tmpIndex, '_' ) ) {
      tmpIndex++;
      isItalic = true;
    }
  }
  if ( isItalic ) {
    return {
      match: true,
      newIndex: tmpIndex,
      element: {
        type: 'italic',
        value: value
      }
    };
  } else {
    return {
      match: false
    };
  }
}
