const {
  expect
} = require('chai');
const listProcessor = require('./list-processor');

describe('List processor ', function() {

  it('Process list', function() {
    const result = listProcessor.process([
      { type: 'hyphen', value: '-' },
      { type: 'squarebracket', value: '[' },
      { type: 'text', value: 'LINK_NAME' },
      { type: 'squarebracket', value: ']' },
      { type: 'bracket', value: '(' },
      { type: 'text', value: 'LINK' },
      { type: 'bracket', value: ')' },
      { type: 'text', value: ' hello' },
      { type: 'new_line', value: '\n' },
      { type: 'hyphen', value: '-' },
      { type: 'text', value: ' B' }
    ]);

    expect(result).to.eql({
      type: 'list',
      lines:[
        [
          { type: 'link', value: 'LINK_NAME', link: 'LINK' },
          { type: 'text', value: ' hello' }
        ],
        [
          { type: 'text', value: ' B' }
        ]
      ]});
  });
});
