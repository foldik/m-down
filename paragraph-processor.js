function hasType( paragraph, index, type ) {
  return index < paragraph.length && paragraph[ index ].type === type;
}

function hasValue( paragraph, index, value ) {
  return index < paragraph.length && paragraph[ index ].value === value;
}

exports.processParagraphs = function ( paragraphs ) {
  let resultParagraphs = [];
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    let index = 0;
    while ( index < paragraph.length ) {
      if ( paragraph[ index ].value === '[' ) {
        let tmpIndex = index + 1;
        let isLink = false;
        let name = '';
        let link = '';
        if ( hasType( paragraph, tmpIndex, 'text' ) ) {
          name = paragraph[ index ].value;
          tmpIndex++;
          if ( hasValue( paragraph, tmpIndex, ']' ) ) {
            tmpIndex++;
            if ( hasValue( paragraph, tmpIndex, '(' ) ) {
              tmpIndex++;
              if ( hasType( paragraph, tmpIndex, 'text' ) ) {
                tmpIndex++;
              }
            }
          }
        }
      }
    }
  }
}
