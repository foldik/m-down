const {
  expect
} = require( 'chai' );
const blockSeparator = require( './block-separator' );

describe( 'Block separator ', function () {

  it( '"BLOCK1", "BLOCK2" => "BLOCK1\\nBLOCK2"', function () {
    const result = blockSeparator.findBlocks( [ 'BLOCK1', 'BLOCK2' ] );
    expect( result ).to.eql( [ 'BLOCK1\nBLOCK2' ] );
  } );

  it( '"BLOCK1", "", "BLOCK2" => "BLOCK1, BLOCK2"', function () {
    const result = blockSeparator.findBlocks( [ 'BLOCK1', '', 'BLOCK2' ] );
    expect( result ).to.eql( [ 'BLOCK1', 'BLOCK2' ] );
  } );

  it( '"", "BLOCK1", "", "BLOCK2", "" => "BLOCK1", "BLOCK2"', function () {
    const result = blockSeparator.findBlocks( [ '', 'BLOCK1', '', 'BLOCK2', '' ] );
    expect( result ).to.eql( [ 'BLOCK1', 'BLOCK2' ] );
  } );

  it( '"", "   ", "" => []', function () {
    const result = blockSeparator.findBlocks( [ '', '   ', '' ] );
    expect( result ).to.eql( [] );
  } );

  it( '"BLOCK1", "```LANG", "CODE1", "", "", "CODE2", "```", "BLOCK2" => ["BLOCK1", { type: code, lang: LANG, code: CODE1\\n\\n\\nCODE2 }, "BLOCK2"]', function () {
    const result = blockSeparator.findBlocks( [ 'BLOCK1', '```LANG', 'CODE1', '', '', 'CODE2', '```', 'BLOCK2' ] );
    expect( result ).to.eql( [
      'BLOCK1',
      {
        type: 'code',
        lang: 'LANG',
        code: 'CODE1\n\n\nCODE2'
      },
      'BLOCK2'
    ] );
  } );

} )
