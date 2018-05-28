const {
  expect
} = require( 'chai' );
const listProcessor = require( './list-processor' );

describe( 'List processor ', function () {

  it( 'Process valid list', function () {
    const result = listProcessor.process( '- [LINK-NAME](LINK) hello\n- B' );

    expect( result ).to.eql( {
      match: true,
      block: {
        type: 'list',
        content: [
        [
            {
              type: 'link',
              link: 'LINK',
              value: 'LINK-NAME'
          },
            {
              type: 'text',
              value: ' hello'
          }
        ],
        [
            {
              type: 'text',
              value: 'B'
          }
        ]
      ]
      }
    } );
  } );

  it( 'Not match if lines not start with hyphen', function () {
    const result = listProcessor.process( '- [LINK-NAME](LINK) hello\nB' );

    expect( result ).to.eql( {
      match: false
    } );
  } );
} );
