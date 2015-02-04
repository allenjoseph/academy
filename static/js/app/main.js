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

    if(!String.prototype.trim){
        (function(){
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function(){
                return this.replace(rtrim,'');
            };
        })();
    }

    moment.locale('es');
})();

