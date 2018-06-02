const codeProcessor = require( './code-processor' );
const listProcessor = require( './list-processor' );
const headerProcessor = require( './header-processor' );
const imageProcessor = require( './image-processor' );
const blockquoteProcessor = require( './blockquote-processor' );
const paragraphProcessor = require( './paragraph-processor' );

const processors = [
  codeProcessor,
  listProcessor,
  headerProcessor,
  imageProcessor,
  blockquoteProcessor,
  paragraphProcessor
];

exports.process = function ( block ) {
  for ( let i = 0; i < processors.length; i++ ) {
    let result = processors[ i ].process( block );
    if ( result.match ) {
      return result.block;
    }
  }
  throw new Error( 'Unrecognised block' );
}
