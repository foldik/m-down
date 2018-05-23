const {
  expect
} = require('chai');
const paragraphSeparator = require('./paragraph-separator');

describe('Paragraph separator module ', function() {

  it('2 Pargraphs', function() {
    const result = paragraphSeparator.getParagraphs([
      { type: 'text', value: 'A'},
      { type: 'bracket', value: '('},
      { type: 'text', value: 'B'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'C'},
      { type: 'text', value: 'D'}
    ]);

    expect(result).to.eql([
      [ { type: 'text', value: 'A' }, { type: 'bracket', value: '(' }, { type: 'text', value: 'B' }],
      [ { type: 'text', value: 'C' }, { type: 'text', value: 'D' }]
    ]);
  });

  it('2 Pargraphs + new line in first paragraph', function() {
    const result = paragraphSeparator.getParagraphs([
      { type: 'text', value: 'A'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'B'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'C'},
      { type: 'text', value: 'D'}
    ]);

    expect(result).to.eql([
      [ { type: 'text', value: 'A' }, { type: 'new_line', value: '\n' }, { type: 'text', value: 'B' }],
      [ { type: 'text', value: 'C' }, { type: 'text', value: 'D' }]
    ]);
  });

  it('2 Pargraphs + new lines before', function() {
    const result = paragraphSeparator.getParagraphs([
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'A'},
      { type: 'bracket', value: '('},
      { type: 'text', value: 'B'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'C'},
      { type: 'text', value: 'D'}
    ]);

    expect(result).to.eql([
      [ { type: 'text', value: 'A' }, { type: 'bracket', value: '(' }, { type: 'text', value: 'B' }],
      [ { type: 'text', value: 'C' }, { type: 'text', value: 'D' }]
    ]);
  });

  it('2 Pargraphs + new lines after', function() {
    const result = paragraphSeparator.getParagraphs([
      { type: 'text', value: 'A'},
      { type: 'bracket', value: '('},
      { type: 'text', value: 'B'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'C'},
      { type: 'text', value: 'D'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'}
    ]);

    expect(result).to.eql([
      [ { type: 'text', value: 'A' }, { type: 'bracket', value: '(' }, { type: 'text', value: 'B' }],
      [ { type: 'text', value: 'C' }, { type: 'text', value: 'D' }]
    ]);
  });

  it('2 Pargraphs + new lines before / after', function() {
    const result = paragraphSeparator.getParagraphs([
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'A'},
      { type: 'bracket', value: '('},
      { type: 'text', value: 'B'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'},
      { type: 'text', value: 'C'},
      { type: 'text', value: 'D'},
      { type: 'new_line', value: '\n'},
      { type: 'new_line', value: '\n'}
    ]);

    expect(result).to.eql([
      [ { type: 'text', value: 'A' }, { type: 'bracket', value: '(' }, { type: 'text', value: 'B' }],
      [ { type: 'text', value: 'C' }, { type: 'text', value: 'D' }]
    ]);
  });
})
