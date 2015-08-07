
window.ACADEMY = window.ACADEMY || {};
window.ACADEMY.utilities = require('./utilities');

window.ACADEMY.utilities.namespace('constans');
window.ACADEMY.utilities.namespace('backbone.model.constructors');
window.ACADEMY.utilities.namespace('backbone.model.instances');
window.ACADEMY.utilities.namespace('backbone.collection.constructors');
window.ACADEMY.utilities.namespace('backbone.collection.instances');
window.ACADEMY.utilities.namespace('backbone.router.constructors');
window.ACADEMY.utilities.namespace('backbone.router.instances');

window.ACADEMY.backbone.model.constructors = require('./models/models');
window.ACADEMY.backbone.collection.constructors = require('./collections/collections');
window.ACADEMY.backbone.router.constructors = require('./routers/main');

window.ACADEMY.socket = io.connect('http://127.0.0.1:3000');
window.ACADEMY.socket.on('newExam', function(data){
    window.dispatchEvent(new CustomEvent('showNotification', { detail: data }));
});
window.ACADEMY.socket.on('newDiscussion', function(data){
    window.dispatchEvent(new CustomEvent('showNotification', { detail: data.notification }));
    window.ACADEMY.backbone.collection.instances.discussions.add(data.discussion);
});

/*---------------------------------------------------------*/
window.Views = {};
window.app = {};
window.app.views = {};
window.template = function(id){
    return _.template( $( '#' + id ).html() );
};

/*---------------------------------------------------------*/

/* Objects prototype extensions */
if(!String.prototype.trim){
    (function(){
        String.prototype.trim = function(){
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
        };
    })();
}

/* Dependencies configurations */
moment.locale('es');
