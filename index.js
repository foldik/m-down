const fs = require( 'fs' );
const mParser = require( './parser/m-parser' );
const mRenderer = require( './renderer/html-renderer' );

console.time( 'read-file' );
fs.readFile( './test-data/proba.md', 'utf-8', function ( err, data ) {
  if ( err ) throw err;
  console.timeEnd( 'read-file' );

  console.time( 'parse' );
  const parsed = mParser.parse( data );
  console.timeEnd( 'parse' );

  console.time( 'render' );
  const html = mRenderer.render( parsed );
  console.timeEnd( 'render' );

  fs.readFile( './template.html', 'utf-8', function ( err, data ) {
    if ( err ) throw err;
    fs.writeFile( './result.html', data.replace( 'CONTENT', html ), 'utf-8', function ( err, data ) {
      if ( err ) throw err;
    } );
  } );

} );
