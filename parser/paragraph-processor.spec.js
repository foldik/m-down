const {
  expect
} = require( 'chai' );
const paragraphProcessor = require( './paragraph-processor' );

describe( 'Paragraph processor', function () {

  it( 'Process link', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'squarebracket',
        value: '['
      },
      {
        type: 'text',
        value: 'LINK_NAME'
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
        value: 'LINK'
      },
      {
        type: 'bracket',
        value: ')'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'link',
        value: 'LINK_NAME',
        link: 'LINK'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'If link not closed handle as text', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'squarebracket',
        value: '['
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'squarebracket',
        value: ']'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'squarebracket',
        value: '['
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'squarebracket',
        value: ']'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'Process italic using *', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'italic',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'Process italic using _', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'italic',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'If italic not closed handle as text', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'Process strong using **', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'asterix',
        value: '*'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'strong',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'Process strong using __', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'strong',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );

  it( 'If strong not closed handle as text', function () {
    const result = paragraphProcessor.processParagraphs( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );

    expect( result ).to.eql( [ [
      {
        type: 'text',
        value: 'A'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'underscore',
        value: '_'
      },
      {
        type: 'text',
        value: 'TEXT'
      },
      {
        type: 'text',
        value: 'B'
      }
    ] ] );
  } );
} );
