(function(){
    window.Models = {};
    window.Collections = {};
    window.Views = {};
    window.Routers = {};

    window.app = {};
    window.app.collections = {};
    window.app.views = {};
    window.app.routers = {};

    window.template = function(id){
        return _.template( $( '#' + id ).html() );
    };
})();

