#!/usr/bin/env node

const fs = require( 'fs' );
const fileUtils = require( './utils/file-utils.js' )
const mParser = require( './parser/m-parser' );
const mRenderer = require( './renderer/html-renderer' );
const argv = require( 'minimist' )( process.argv.slice( 2 ) );

function toHtml( inputFile, outputFile ) {
  console.time( `Reading ${inputFile}` );
  fileUtils.readLines( inputFile, {
      encoding: 'utf-8'
    } )
    .then( function ( lines ) {
      console.timeEnd( `Reading ${inputFile}` );
      console.time( `Parsing ${inputFile}` );
      const parsed = mParser.parse( lines );
      console.timeEnd( `Parsing ${inputFile}` );

      console.time( `Rendering ${inputFile}` );
      const html = mRenderer.render( parsed );
      console.timeEnd( `Rendering ${inputFile}` );

      console.time( `Saving ${outputFile}` );
      fs.writeFile( outputFile, html, 'utf-8', function ( err, data ) {
        if ( err ) throw err;
        console.timeEnd( `Saving ${outputFile}` );
      } );
    } )
    .catch( ( err ) => console.error( err.message ) );
}

let inDir = argv.inDir || 'pages';
let outDir = argv.outDir || 'dist';

fileUtils.cleanDirSync( outDir );
fileUtils.copyDirStructureSyc( inDir, outDir, ( resultDir ) => console.log( `Created ${resultDir} directory` ) );
fileUtils.getFilesSync( inDir ).forEach( ( file ) => {
  const sourceFile = inDir + '/' + file;
  if ( file.endsWith( '.md' ) ) {
    const targetFile = outDir + '/' + file.replace( '.md', '.html' );
    toHtml( sourceFile, targetFile );
  } else {
    const targetFile = outDir + '/' + file;
    fs.copyFile( sourceFile, targetFile, function ( err ) {
      if ( err ) throw err;
      console.log( `Copied ${sourceFile} to ${targetFile}` );
    } );
  }
} );
