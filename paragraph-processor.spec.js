const {
  expect
} = require('chai');
const paragraphProcessor = require('./paragraph-processor');

describe('Paragraph processor module ', function() {

  it('Process link', function() {
    const result = paragraphProcessor.processParagraphs([[
      { type: 'text', value: 'A'},
      { type: 'squarebracket', value: '['},
      { type: 'text', value: ' LINK_NAME '},
      { type: 'squarebracket', value: ']'},
      { type: 'bracket', value: '('},
      { type: 'text', value: 'LINK'},
      { type: 'bracket', value: ')'},
      { type: 'text', value: 'D'}
    ]]);

    expect(result).to.eql([[
        { type: 'text', value: 'A' },
        { type: 'link', name: 'LINK_NAME', link: 'LINK' },
        { type: 'text', value: 'B' }
    ]]);
  });
})
