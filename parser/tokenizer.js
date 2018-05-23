function element( type, value ) {
  return {
    type: type,
    value: value
  };
}

function tryFindInlineCodeBlock( text, index ) {
  let tmpIndex = index;
  let offset = 0;
  while ( tmpIndex < text.length && text.charAt( tmpIndex ) === '`' ) {
    offset++;
    tmpIndex++;
  }

  if ( offset > 1 ) {
    return {
      match: false
    };
  }

  let code = '';
  while ( tmpIndex < text.length && text.charAt( tmpIndex ) !== '`' ) {
    code += text.charAt( tmpIndex );
    offset++;
    tmpIndex++;
  }

  while ( tmpIndex < text.length && text.charAt( tmpIndex ) === '`' ) {
    offset++;
    tmpIndex++;
  }

  return {
    match: true,
    value: code.trim(),
    offset: offset
  };
}

exports.tokenize = function ( text ) {
  const specialCharacters = new Map();
  specialCharacters.set( '[', 'squarebracket' );
  specialCharacters.set( ']', 'squarebracket' );
  specialCharacters.set( '(', 'bracket' );
  specialCharacters.set( ')', 'bracket' );
  specialCharacters.set( '*', 'asterix' );
  specialCharacters.set( '_', 'underscore' );
  specialCharacters.set( '`', 'inline_code' );
  specialCharacters.set( '!', 'exclamation_mark' );

  const result = [];
  let index = 0;
  while ( index < text.length ) {

    if ( text.charAt( index ) === '\n' ) {
      result.push( element( 'new_line', '\n' ) );
      index++;
    }

    if ( text.charAt( index ) === '-' ) {
      if ( index === 0 ) {
        result.push( element( 'hyphen', '-' ) );
        index++;
        continue;
      } else {
        let tmpIndex = index - 1;
        let isHypen = true;
        while ( tmpIndex > -1 && text.charAt( tmpIndex ) !== '\n' && isHypen ) {
          if ( text.charAt( tmpIndex ) !== ' ' ) {
            isHypen = false;
          }
          tmpIndex--;
        }
        if ( isHypen ) {
          result.push( element( 'hyphen', '-' ) );
          index++;
          continue;
        }
      }
    }

    if ( text.charAt( index ) === '`' ) {
      const codeResult = tryFindInlineCodeBlock( text, index );
      if ( codeResult.match === true ) {
        result.push( {
          type: 'inline_code',
          value: codeResult.value
        } );
        index += codeResult.offset;
        continue;
      }
    }

    if ( specialCharacters.has( text.charAt( index ) ) ) {
      const type = specialCharacters.get( text.charAt( index ) );
      result.push( element( type, text.charAt( index ) ) );
      index++;
    } else {
      let value = '';
      let hyphenReachedInNewLine = false;
      while ( index < text.length && !specialCharacters.has( text.charAt( index ) ) && text.charAt( index ) !== '\n' && !hyphenReachedInNewLine ) {
        if ( value.trim().length === 0 && text.charAt( index ) === '-' ) {
          hyphenReachedInNewLine = true;
        }
        if ( !hyphenReachedInNewLine ) {
          value += text.charAt( index );
          index++;
        }
      }
      if ( value !== '' ) {
        result.push( element( 'text', value ) );
      }
    }
  }

  return result;
}
