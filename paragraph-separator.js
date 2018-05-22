exports.getParagraphs = function(tokens) {
  if (tokens.length === 0) {
    return [];
  }
  const result = [];
  let block = [];
  let index = 0;
  while (tokens.length > index) {
    let token = tokens[index];
    if (token.type !== 'new_line') {
      block.push(token);
      index++;
    } else {
      let counter = 0;
      while (tokens.length > index && token.type === 'new_line') {
        token = tokens[index];
        counter++;
        index++;
      }
      if (tokens.length > index) {
        counter--;
        index--;
      }
      if (counter > 1 && block.length > 0) {
        result.push(block);
        block = [];
      } else if (counter === 1 && block.length > 0) {
        block.push({
          type: 'new_line',
          value: '\n'
        });
      }
    }
  }
  if (block.length > 0) {
    result.push(block);
  }
  return result;
}
