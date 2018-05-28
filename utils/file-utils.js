const fs = require( 'fs' );
const readline = require( 'readline' );

exports.copyDirStructureSyc = function ( sourceDir, targetDir, afterCopyCallback ) {
  function copyDirectory( dir ) {
    const files = fs.readdirSync( dir );
    files.forEach( function ( file ) {
      const currentFile = dir + '/' + file;
      const resultDirectory = targetDir + '/' + currentFile.replace( sourceDir + '/', '' );
      if ( fs.statSync( currentFile ).isDirectory() && !fs.existsSync( resultDirectory ) ) {
        fs.mkdirSync( resultDirectory );
        afterCopyCallback( resultDirectory );
        copyDirectory( currentFile );
      }
    } );
  };

  copyDirectory( sourceDir );
};

exports.getFilesSync = function ( directory ) {
  function getFilesRecursive( dir, fileSet ) {
    const files = fs.readdirSync( dir );
    files.forEach( function ( file ) {
      const currentFile = dir + '/' + file;
      const relativeName = currentFile.replace( directory + '/', '' );
      const fileStat = fs.statSync( currentFile );
      if ( fileStat.isDirectory() ) {
        getFilesRecursive( currentFile, fileSet );
      } else if ( fileStat.isFile() ) {
        fileSet.add( relativeName );
      }
    } );
  };

  const fileSet = new Set();
  getFilesRecursive( directory, fileSet );
  return fileSet;
};

exports.readLines = function ( file, options ) {
  return new Promise( function ( resolve, reject ) {
    const fileStream = fs.createReadStream( file, options );
    fileStream.on( 'error', reject );
    const lineReader = readline.createInterface( {
      input: fileStream
    } );
    const lines = [];
    lineReader.on( 'line', ( line ) => lines.push( line ) );
    lineReader.on( 'close', () => resolve( lines ) );
  } );
};
