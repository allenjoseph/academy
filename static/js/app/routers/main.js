var _Model = window.ACADEMY.backbone.model.constructors,
    _Collection = window.ACADEMY.backbone.collection.constructors,
    _collection = window.ACADEMY.backbone.collection.instances;

var Router = Backbone.Router.extend({

    routes : {
        'home': 'home',
        'course/:id': 'course',
        '*otherRoute': 'default'
    },

    initialize : function(){
        console.log('init Route');
    },

    home : function(){
        this.navigate('');
        _collection.courses = new _Collection.courses();
        _collection.discussions = new _Collection.discussions();
        _collection.comments = new _Collection.comments();
    },

    course : function(id){
        this.navigate('');
        var cursoModel = new _Model.course(this.model_root);
    },

    default : function(otherRoute){
        this.navigate('');
    }
});

window.ACADEMY.router = new Router();

Backbone.history.start({pushState: true, root: window.location.pathname});
