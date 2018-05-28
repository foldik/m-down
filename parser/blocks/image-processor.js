const tokenizer = require( '../tokenize/tokenizer' );

function hasType( paragraph, index, type ) {
  return index < paragraph.length && paragraph[ index ].type === type;
}

function hasValue( paragraph, index, value ) {
  return index < paragraph.length && paragraph[ index ].value === value;
}

exports.process = function ( block ) {
  if ( !block.startsWith( '!' ) ) {
    return {
      match: false
    };
  }
  let paragraph = tokenizer.tokenize( block );
  let index = 1;
  let isImage = false;
  let name = '';
  let link = '';
  if ( hasValue( paragraph, index, '[' ) ) {
    index++;
    if ( hasType( paragraph, index, 'text' ) ) {
      name = paragraph[ index ].value;
      index++;
      if ( hasValue( paragraph, index, ']' ) ) {
        index++;
        if ( hasValue( paragraph, index, '(' ) ) {
          index++;
          if ( hasType( paragraph, index, 'text' ) ) {
            link = paragraph[ index ].value;
            index++;
            if ( hasValue( paragraph, index, ')' ) ) {
              index++;
              isImage = true;
            }
          }
        }
      }
    }
  }
  if ( isImage ) {
    return {
      match: true,
      block: {
        type: 'img',
        alt: name,
        link: link
      }
    };
  } else {
    return {
      match: false
    };
  }
}
