/*window.ACADEMY = window.ACADEMY || {};

var Backbone = require('backbone'),
    Collection = require('./collections/collections');

var Router = Backbone.Router.extend({

    routes: {
        'home': 'home',
        'course': 'course',
        '*otherRoute': 'default'
    },

    home() {
        this.navigate('');
        window.ACADEMY.collections = {
            courses: new Collection.Courses(),
            discussions: new Collection.Discussions(),
            comments: new Collection.Comments()
        }
    },

    course() {
        this.navigate('');
        window.ACADEMY.collections = {
            exams: new Collection.Exams(),
            discussions: new Collection.Discussions(),
            homeworks: new Collection.Homeworks(),
            meetings: new Collection.Meetings(),
            aids: new Collection.Aids()
        };
    },

    default(otherRoute) {
        this.navigate('');
    }
});

var router = new Router();
Backbone.history.start({pushState: true, root: window.location.pathname});

if(window.ACADEMY.state){
    debugger;
    router.navigate(window.ACADEMY.state, {trigger: true});
}*/
