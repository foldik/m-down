const blockSeparator = require( './tokenize/block-separator' );
const blockProcessor = require( './blocks/block-processor' );

exports.parse = function ( lines ) {
  const rawBlocks = blockSeparator.findBlocks( lines );
  const processedBlocks = [];
  for ( let i = 0; i < rawBlocks.length; i++ ) {
    processedBlocks.push( blockProcessor.process( rawBlocks[ i ] ) );
  }
  return processedBlocks;
}
