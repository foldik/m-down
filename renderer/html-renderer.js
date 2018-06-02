const headerRenderer = require( './header-renderer' );
const paragraphRenderer = require( './paragraph-renderer' );
const listRenderer = require( './list-renderer' );
const codeRenderer = require( './code-renderer' );
const blockquoteRenderer = require( './blockquote-renderer' );
const imageRenderer = require( './image-renderer' );

const renderers = [
  headerRenderer,
  paragraphRenderer,
  listRenderer,
  codeRenderer,
  blockquoteRenderer,
  imageRenderer
];

exports.render = function ( paragraphs ) {
  let content = '';
  for ( var i = 0; i < paragraphs.length; i++ ) {
    let paragraph = paragraphs[ i ];
    let renderer = renderers.find( ( element ) => element.canRender( paragraph ) );
    if ( renderer ) {
      content += renderer.render( paragraph )
    } else {
      throw new Error( 'Not found error for block: ' + JSON.stringify( paragraph, null, 2 ) );
    }
  }
  return content;
}
