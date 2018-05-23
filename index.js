const fs = require( 'fs' );
const mParser = require( './parser/m-parser' );

console.time( 'read-file' );
fs.readFile( './test-data/proba.md', 'utf-8', function ( err, data ) {
  if ( err ) throw err;
  console.timeEnd( 'read-file' );
  console.time( 'process-file' );
  const result = mParser.parse( data );
  console.timeEnd( 'process-file' );
  //console.log( JSON.stringify( result, null, 2 ) );
} )
