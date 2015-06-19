(function(){

    window.ACADEMY = window.ACADEMY || {};

    function namespace(route){
        if( typeof route !== 'string'  || !route.length) return;

        var parts = route.split('.'),
            parent = window.ACADEMY;
        if (parts[0] === 'ACADEMY'){
            parts = parts.slice(1);
        }
        for (var i = 0, len = parts.length; i < len; i++) {
            if (typeof parent[parts[i]] === 'undefined'){
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    namespace('backbone.model.constructors');
    namespace('backbone.model.instances');
    namespace('backbone.collection.constructors');
    namespace('backbone.collection.instances');
    namespace('backbone.router.constructors');
    namespace('backbone.router.instances');

    var utilities = namespace('utilities');
    utilities.namespace = namespace;

    window.Views = {};
    window.app = {};
    window.app.views = {};

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

