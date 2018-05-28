const {
  expect
} = require( 'chai' );
const listProcessor = require( './list-processor' );

describe( 'List processor ', function () {

  it( 'Process list', function () {
    const result = listProcessor.process( '-[LINK_NAME](LINK) hello\n- B' );

    expect( result ).to.eql( {
      match: true,
      item: {
        type: 'list',
        items: [
        [
            {
              type: 'link',
              value: 'LINK_NAME',
              link: 'LINK'
          },
            {
              type: 'text',
              value: ' hello'
          }
        ],
        [
            {
              type: 'text',
              value: ' B'
          }
        ]
      ]
      }
    } );
  } );
} );
