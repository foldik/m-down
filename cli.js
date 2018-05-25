#!/usr/bin/env node

const fs = require( 'fs' );
const fileUtils = require( './utils/file-utils.js' )
const mParser = require( './parser/m-parser' );
const mRenderer = require( './renderer/html-renderer' );
const argv = require( 'minimist' )( process.argv.slice( 2 ) );

function toHtml( inputFile, outputFile ) {
  console.time( `Reading ${inputFile}` );
  fs.readFile( inputFile, 'utf-8', function ( err, data ) {
    if ( err ) throw err;
    console.timeEnd( `Reading ${inputFile}` );

    console.time( `Parsing ${inputFile}` );
    const parsed = mParser.parse( data );
    console.timeEnd( `Parsing ${inputFile}` );

    console.time( `Rendering ${inputFile}` );
    const html = mRenderer.render( parsed );
    console.timeEnd( `Rendering ${inputFile}` );

    console.time( `Saving ${outputFile}` );
    fs.readFile( './template.html', 'utf-8', function ( err, data ) {
      if ( err ) throw err;
      fs.writeFile( outputFile, data.replace( 'CONTENT', html ), 'utf-8', function ( err, data ) {
        if ( err ) throw err;
        console.timeEnd( `Saving ${outputFile}` );
      } );
    } );
  } );
}

if ( !argv.inDir || !argv.outDir ) {
  console.log( 'You must give the input directory and the output directory like:\r\n\r\n\tm-down --inDir=content --outDir=dist' );
  console.log( 'Args: ' + JSON.stringify( argv ) );
  process.exit( -1 );
}

if ( fs.existsSync( argv.outDir ) ) {
  console.log( `Clean ${argv.outDir} directory` );
  fs.rmdirSync( argv.outDir );
}
fs.mkdirSync( argv.outDir );

fileUtils.copyDirStructureSyc( argv.inDir, argv.outDir, ( resultDir ) => console.log( `Created ${resultDir} directory` ) );
const inputFiles = fileUtils.getFilesSync( argv.inDir );
inputFiles.forEach( ( file ) => {
  const sourceFile = argv.inDir + '/' + file;
  if ( file.endsWith( '.md' ) ) {
    const targetFile = argv.outDir + '/' + file.replace( '.md', '.html' );
    toHtml( sourceFile, targetFile );
  } else {
    const targetFile = argv.outDir + '/' + file;
    fs.copyFile( sourceFile, targetFile, function ( err ) {
      if ( err ) throw err;
      console.log( `Copied ${sourceFile} to ${targetFile}` );
    } );
  }
} );
