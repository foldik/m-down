#!/usr/bin/env node

const fs = require( 'fs' );
const mParser = require( './parser/m-parser' );
const mRenderer = require( './renderer/html-renderer' );
const argv = require( 'minimist' )( process.argv.slice( 2 ) );

if ( !argv.inDir || !argv.outDir ) {
  console.log( 'You must give the input directory and the output directory like:\r\n\r\n\tm-down --inDir=content --outDir=dist' );
  process.exit( -1 );
}

console.log( `Input directory: ${argv.inDir}` );
console.log( `Output directory: ${argv.outDir}` );

if ( fs.existsSync( argv.outDir ) ) {
  console.log( `Clean ${argv.outDir} directory` );
  fs.rmdirSync( argv.outDir );
}
fs.mkdirSync( argv.outDir );

function copyDirectory( dir ) {
  const files = fs.readdirSync( dir );
  files.forEach( function ( file ) {
    const currentFile = dir + '/' + file;
    const resultDirectory = argv.outDir + '/' + currentFile.replace( argv.inDir + '/', '' );
    if ( fs.statSync( currentFile ).isDirectory() && !fs.existsSync( resultDirectory ) ) {
      fs.mkdirSync( resultDirectory );
      console.log( resultDirectory );
      copyDirectory( currentFile );
    }
  } );
};

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

function processMarkdownFiles( dir ) {
  const files = fs.readdirSync( dir );
  files.forEach( function ( file ) {
    const currentFile = dir + '/' + file;
    if ( fs.statSync( currentFile ).isDirectory() ) {
      processMarkdownFiles( currentFile );
    } else if ( fs.statSync( currentFile ).isFile() ) {
      if ( currentFile.endsWith( '.md' ) ) {
        const resultFile = argv.outDir + '/' + currentFile.replace( argv.inDir + '/', '' ).replace( '.md', '.html' );
        toHtml( currentFile, resultFile );
      } else {
        const resultFile = argv.outDir + '/' + currentFile.replace( argv.inDir + '/', '' );
        fs.copyFile( currentFile, resultFile, function ( err ) {
          if ( err ) throw err;
          console.log( `Copied ${currentFile} to ${resultFile}` );
        } );
      }
    }
  } );
};

console.log( `Copy folder structure into ${argv.outDir} directory` );
copyDirectory( argv.inDir );
processMarkdownFiles( argv.inDir );
