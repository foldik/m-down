'use strict';

const main = document.querySelector( '.page' );
const links = document.querySelectorAll( 'a[data-page]' );

links.forEach( function ( e ) {
  e.addEventListener( 'click', function ( event ) {
    event.preventDefault();
    page( '/page' + e.getAttribute( 'data-page' ) );
  } );
} );

page( '/', function ( context ) {
  page( '/page' + links[ 0 ].getAttribute( 'data-page' ) );
} );

page( '/page/:pageName', function ( ctx ) {
  console.log( ctx.params.pageName );
  axios.get( ctx.params.pageName + '.html' )
    .then( function ( response ) {
      main.innerHTML = response.data;
      links.forEach( function ( e ) {
        if ( e.getAttribute( 'data-page' ) === '/' + ctx.params.pageName ) {
          e.classList.add( 'active' );
        } else {
          e.classList.remove( 'active' );
        }
      } );
    } )
    .catch( function ( error ) {
      console.error( error );
      main.innerHTML = '<h1>Page not found</h1>';
    } );
} );

page.start( {
  hashbang: true
} );
