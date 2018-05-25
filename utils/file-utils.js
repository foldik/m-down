const fs = require( 'fs' );

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
