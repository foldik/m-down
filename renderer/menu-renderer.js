exports.render = function ( menuConfig ) {
  let menu = '';
  for ( var i = 0; i < menuConfig.length; i++ ) {
    menu += '<a data-page="' + menuConfig[ i ].link + '">' + menuConfig[ i ].name + '</a>';
  }
  return menu;
}
