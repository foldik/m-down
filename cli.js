#!/usr/bin/env node

const fs = require( 'fs' );
const fileUtils = require( './utils/file-utils.js' )
const mParser = require( './parser/m-parser' );
const mRenderer = require( './renderer/html-renderer' );
const menuRenderer = require( './renderer/menu-renderer' );
const argv = require( 'minimist' )( process.argv.slice( 2 ) );

function toHtml( inputFile, outputFile ) {
  console.log( `Reading ${inputFile}` );
  fileUtils.readLines( inputFile, {
      encoding: 'utf-8'
    } )
    .then( function ( lines ) {
      console.log( `Parsing ${inputFile}` );
      const parsed = mParser.parse( lines );

      console.log( `Rendering ${inputFile}` );
      const html = mRenderer.render( parsed );

      console.time( `Saving ${outputFile}` );
      fs.writeFile( outputFile, html, 'utf-8', function ( err ) {
        if ( err ) throw err;
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

if ( fs.existsSync( './menu.json' ) ) {
  fs.readFile( './menu.json', 'utf8', function ( err, data ) {
    if ( err ) throw err;
    const menuContent = menuRenderer.render( JSON.parse( data ) );
    fs.readFile( './index.html', 'utf8', function ( err, data ) {
      if ( err ) throw err;
      const indexContent = data.replace( 'MENU', menuContent );
      fs.writeFile( outDir + '/index.html', indexContent, 'utf-8', function ( err ) {
        if ( err ) throw err;
        console.log( `Saved ${outDir}/index.html` );
      } );
    } );
  } );
}
