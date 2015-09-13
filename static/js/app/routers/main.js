var _Collection = window.ACADEMY.backbone.collection.constructors,
    _collection = window.ACADEMY.backbone.collection.instances;

var Router = Backbone.Router.extend({

    routes: {
        'home': 'home',
        'course': 'course',
        '*otherRoute': 'default'
    },

    home: () => {
        this.navigate('');
        _collection.courses = new _Collection.Courses();
        _collection.discussions = new _Collection.Discussions();
        _collection.comments = new _Collection.Comments();
    },

    course: () => {
        this.navigate('');
        _collection.exams = new _Collection.Exams();
        _collection.discussions = new _Collection.Discussions();
        _collection.homeworks = new _Collection.Homeworks();
        _collection.meetings = new _Collection.Meetings();
        _collection.aids = new _Collection.Aids();
    },

    default: (otherRoute) => this.navigate('')
});

window.ACADEMY.router = new Router();

Backbone.history.start({pushState: true, root: window.location.pathname});
