const {
  expect
} = require( 'chai' );
const tokenizer = require( './tokenizer' );

describe( 'Tokenizer module ', function () {

  it( 'Simple text.', function () {
    const result = tokenizer.tokenize( 'Simple text.' );
    expect( result ).to.eql( [ {
      type: 'text',
      value: 'Simple text.'
    } ] );
  } );

  it( 'Text + [image](/image.md)', function () {
    const result = tokenizer.tokenize( 'Text + [image](/image.md) and text.' );
    expect( result ).to.eql( [ {
        type: 'text',
        value: 'Text + '
      },
      {
        type: 'squarebracket',
        value: '['
      },
      {
        type: 'text',
        value: 'image'
      },
      {
        type: 'squarebracket',
        value: ']'
      },
      {
        type: 'bracket',
        value: '('
      },
      {
        type: 'text',
        value: '/image.md'
      },
      {
        type: 'bracket',
        value: ')'
      },
      {
        type: 'text',
        value: ' and text.'
      }
    ] );
  } );

  it( '*italic*', function () {
    const result = tokenizer.tokenize( '*italic*' );
    expect( result ).to.eql( [ {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'text',
        value: 'italic'
      },
      {
        type: 'asterix',
        value: '*'
      }
    ] );
  } );

  it( '_italic_', function () {
    const result = tokenizer.tokenize( '_italic_' );
    expect( result ).to.eql( [ {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'italic'
      },
      {
        type: 'underscore',
        value: '_'
      }
    ] );
  } );

  it( 'value `code()` value2', function () {
    const result = tokenizer.tokenize( 'value `code()` value2' );
    expect( result ).to.eql( [ {
        type: 'text',
        value: 'value '
      },
      {
        type: 'inline_code',
        value: 'code()'
      },
      {
        type: 'text',
        value: ' value2'
      }
    ] );
  } );

  it( '`code()`', function () {
    const result = tokenizer.tokenize( '`code()`' );
    expect( result ).to.eql( [ {
      type: 'inline_code',
      value: 'code()'
    } ] );
  } );

  it( '!value', function () {
    const result = tokenizer.tokenize( '!value' );
    expect( result ).to.eql( [ {
        type: 'exclamation_mark',
        value: '!'
      },
      {
        type: 'text',
        value: 'value'
      }
    ] );
  } );

  it( 'value + new_line + new_line', function () {
    const result = tokenizer.tokenize( 'value\n\n' );
    expect( result ).to.eql( [ {
        type: 'text',
        value: 'value'
      },
      {
        type: 'new_line',
        value: '\n'
      },
      {
        type: 'new_line',
        value: '\n'
      }
    ] );
  } );

  it( 'value + new_line + new_line with \\r\\n', function () {
    const result = tokenizer.tokenize( 'value\r\n\r\n' );
    expect( result ).to.eql( [ {
        type: 'text',
        value: 'value'
      },
      {
        type: 'new_line',
        value: '\n'
      },
      {
        type: 'new_line',
        value: '\n'
      }
    ] );
  } );

  it( 'hyphen recognised as first character', function () {
    const result = tokenizer.tokenize( '-' );
    expect( result ).to.eql( [ {
        type: 'hyphen',
        value: '-'
      }
    ] );
  } );

  it( 'hyphen recognised as first character in new line', function () {
    const result = tokenizer.tokenize( 'TEXT\n-TEXT2' );
    expect( result ).to.eql( [
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'new_line',
        value: '\n'
      },
      {
        type: 'hyphen',
        value: '-'
      },
      {
        type: 'text',
        value: 'TEXT2'
      }
    ] );
  } );

  it( 'hyphen recognised in new line when space is before ', function () {
    const result = tokenizer.tokenize( 'TEXT\n  -' );
    expect( result ).to.eql( [
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'new_line',
        value: '\n'
      },
      {
        type: 'text',
        value: '  '
      },
      {
        type: 'hyphen',
        value: '-'
      }
    ] );
  } );

  it( 'should not recognise hyphen in text', function () {
    const result = tokenizer.tokenize( 'TEXT-TEXT2' );
    expect( result ).to.eql( [
      {
        type: 'text',
        value: 'TEXT-TEXT2'
      }
    ] );
  } );
} )
