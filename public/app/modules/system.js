define([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone",

  // Modules
  "modules/helpers",
  
  // Plugins
],

function( namespace, $, Backbone, Helpers ){
  
  var System = namespace.module(),
      app = namespace.app,
      common_init = function( options ){
        this.model.on( "change", function( ){ this.render() }, this );
      },
      common_serialize = function(){ 
        return { board: this.model.toJSON() } 
      },
      common_render = function( manage ){
        return manage( this ).render();
      };
      
  System.Views.Header = Backbone.View.extend({
    template: 'system/header',
    initialize: common_init,
    serialize: common_serialize
  });
  
  System.Views.Nav = Backbone.View.extend({
    template: 'system/nav',
    className: 'well sidebar-nav',
    initialize: common_init,
    serialize: common_serialize,
    events: { "click a": "click_handler" },
    click_handler: function(e){
      e.preventDefault();
      //this is wrong, fix it
      var id = e.target.dataset.listid
      app.router.navigate( 'list/'+id, { trigger: true })
    }
  });

  // This will fetch the template and render it.
  System.Views.Error = Backbone.View.extend({
    template: 'system/error',
    initialize: common_init,
    serialize: common_serialize
  });

  return System;
});
