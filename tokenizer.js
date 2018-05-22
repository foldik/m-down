function element(type, value) {
  return {
    type: type,
    value: value
  };
}

function tryFindNumberOfNewLines(text, index) {
  let tmpIndex = index;
  let offset = 0;
  let size = 0;
  while (tmpIndex < text.length && text.charAt(tmpIndex) === '\n' || text.charAt(tmpIndex) === '\r') {
    if (text.charAt(tmpIndex) === '\n') {
      size++;
    }
    offset++;
    tmpIndex++;
  }

  return {
    size: size,
    offset: offset
  };
}

function tryFindCodeBlock(text, index) {
  let tmpIndex = index;
  let offset = 0;
  while (tmpIndex < text.length && text.charAt(tmpIndex) === '`') {
    offset++;
    tmpIndex++;
  }

  if (offset < 3) {
    return {
      match: false
    };
  }

  let lang = '';
  while (tmpIndex < text.length && text.charAt(tmpIndex) !== '\n' && text.charAt(tmpIndex) !== '\r') {
    lang += text.charAt(tmpIndex);
    offset++;
    tmpIndex++;
  }

  offset += tryFindNumberOfNewLines(text, tmpIndex).offset;

  let code = '';
  while (tmpIndex < text.length && text.charAt(tmpIndex) !== '`') {
    code += text.charAt(tmpIndex);
    offset++;
    tmpIndex++;
  }

  while (tmpIndex < text.length && text.charAt(tmpIndex) === '`') {
    offset++;
    tmpIndex++;
  }

  return {
    match: true,
    value: code.trim(),
    lang: lang,
    offset: offset - 1
  };
}

function tryFindInlineCodeBlock(text, index) {
  let tmpIndex = index;
  let offset = 0;
  while (tmpIndex < text.length && text.charAt(tmpIndex) === '`') {
    offset++;
    tmpIndex++;
  }

  if (offset > 1) {
    return {
      match: false
    };
  }

  let code = '';
  while (tmpIndex < text.length && text.charAt(tmpIndex) !== '`') {
    code += text.charAt(tmpIndex);
    offset++;
    tmpIndex++;
  }

  while (tmpIndex < text.length && text.charAt(tmpIndex) === '`') {
    offset++;
    tmpIndex++;
  }

  return {
    match: true,
    value: code.trim(),
    offset: offset
  };
}

exports.tokenize = function(text) {
  const specialCharacters = new Map();
  specialCharacters.set('[', 'squarebracket');
  specialCharacters.set(']', 'squarebracket');
  specialCharacters.set('(', 'bracket');
  specialCharacters.set(')', 'bracket');
  specialCharacters.set('*', 'asterix');
  specialCharacters.set('_', 'underscore');
  specialCharacters.set('`', 'inline_code');
  specialCharacters.set('!', 'exclamation_mark');

  const result = [];
  let index = 0;
  while (index < text.length) {
    const newLines = tryFindNumberOfNewLines(text, index);

    if (newLines.size > 0) {
      for (var i = 0; i < newLines.size; i++) {
        result.push(element('new_line', '\n'));
      }
      index += newLines.offset;
    }

    if (text.charAt(index) === '`') {
      const codeResult = tryFindCodeBlock(text, index);
      if (codeResult.match === true) {
        result.push({
          type: 'code',
          value: codeResult.value,
          lang: codeResult.lang
        });
        index += codeResult.offset;
        continue;
      }
    }

    if (text.charAt(index) === '`') {
      const codeResult = tryFindInlineCodeBlock(text, index);
      if (codeResult.match === true) {
        result.push({
          type: 'inline_code',
          value: codeResult.value
        });
        index += codeResult.offset;
        continue;
      }
    }

    if (specialCharacters.has(text.charAt(index))) {
      const type = specialCharacters.get(text.charAt(index));
      result.push(element(type, text.charAt(index)));
      index++;
    } else {
      let value = '';
      while (index < text.length && !specialCharacters.has(text.charAt(index)) && tryFindNumberOfNewLines(text, index).size === 0) {
        value += text.charAt(index);
        index++;
      }
      if (value !== '') {
        result.push(element('text', value));
      }
    }
  }

  return result;
}
