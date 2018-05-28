exports.process = function ( block ) {
  if ( !block || !block.hasOwnProperty( 'lang' ) ) {
    return {
      match: false
    };
  }
  return {
    match: true,
    block: block
  };
}
