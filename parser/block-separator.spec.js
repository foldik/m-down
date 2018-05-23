const {
  expect
} = require( 'chai' );
const blockSeparator = require( './block-separator' );

describe( 'Block separator ', function () {

  it( '"BLOCK1\\r\\n\\r\\nBLOCK2" => "BLOCK1", "BLOCK2"', function () {
    const result = blockSeparator.findBlocks( 'BLOCK1\r\n\r\nBLOCK2' );
    expect( result ).to.eql( [ 'BLOCK1', 'BLOCK2' ] );
  } );

  it( '"BLOCK1\\n\\nBLOCK2" => "BLOCK1", "BLOCK2"', function () {
    const result = blockSeparator.findBlocks( 'BLOCK1\n\nBLOCK2' );
    expect( result ).to.eql( [ 'BLOCK1', 'BLOCK2' ] );
  } );

  it( '"BLOCK1\\nBLOCK2" => BLOCK1\\nBLOCK2', function () {
    const result = blockSeparator.findBlocks( 'BLOCK1\nBLOCK2' );
    expect( result ).to.eql( [ 'BLOCK1\nBLOCK2' ] );
  } );

  it( '"\\r\\nBLOCK1\\r\\n\\r\\nBLOCK2\\r\\n" => "BLOCK1", "BLOCK2"', function () {
    const result = blockSeparator.findBlocks( '\r\nBLOCK1\r\n\r\nBLOCK2\r\n' );
    expect( result ).to.eql( [ 'BLOCK1', 'BLOCK2' ] );
  } );

  it( '"\\r\\n\\r\\n    \\r\\n\\r\\n" => []', function () {
    const result = blockSeparator.findBlocks( '\r\n\r\n    \r\n\r\n' );
    expect( result ).to.eql( [] );
  } );

  it( '"BLOCK1\\r\\n\\r\\n```LANG CODE1\\r\\n\\r\\nCODE2```\\r\\n\\r\\nBLOCK2" => ["BLOCK1", { type: code, lang: LANG, code: CODE1\\r\\n\\r\\nCODE2 }, "BLOCK2"]', function () {
    const result = blockSeparator.findBlocks( 'BLOCK1\r\n\r\n```LANG\nCODE1\r\n\r\nCODE2\n```\r\n\r\nBLOCK2' );
    expect( result ).to.eql( [
      'BLOCK1',
      {
        type: 'code',
        lang: 'LANG',
        code: 'CODE1\r\n\r\nCODE2'
      },
      'BLOCK2'
    ] );
  } );

} )
