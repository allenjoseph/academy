(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

window.ACADEMY = window.ACADEMY || {};
window.ACADEMY.utilities = require('./utilities');

window.ACADEMY.utilities.namespace('constans');
window.ACADEMY.utilities.namespace('backbone.model.constructors');
window.ACADEMY.utilities.namespace('backbone.model.instances');
window.ACADEMY.utilities.namespace('backbone.collection.constructors');
window.ACADEMY.utilities.namespace('backbone.collection.instances');

window.ACADEMY.constans.HOST='http://127.0.0.1:8000';
window.ACADEMY.constans.SOCKET='http://127.0.0.1:3333';

window.ACADEMY.backbone.model.constructors = require('./models/models');
window.ACADEMY.backbone.collection.constructors = require('./collections/collections');

window.ACADEMY.socket = io.connect(window.ACADEMY.constans.SOCKET);
window.ACADEMY.socket.on('newExam', function(data){
    window.dispatchEvent(new CustomEvent('showNotification', { detail: data }));
});
window.ACADEMY.socket.on('newDiscussion', function(data){
    window.dispatchEvent(new CustomEvent('showNotification', { detail: data.notification }));
    window.ACADEMY.backbone.collection.instances.discussions.add(data.discussion);
});
window.ACADEMY.socket.on('addComment', function(data){
    window.dispatchEvent(new CustomEvent('updateCommentsCount', { detail: data }));
});

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

},{"./collections/collections":2,"./models/models":3,"./utilities":5}],2:[function(require,module,exports){
var _model = require('../models/models');

module.exports = {

    Courses: Backbone.Collection.extend({
        model: _model.Course,
        url: '/courses'
    }),

    Discussions: Backbone.Collection.extend({
        model: _model.Discussion,
        url: '/discussions',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    Comments: Backbone.Collection.extend({
        model: _model.Comment,
        url: '/comments',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    Attachments: Backbone.Collection.extend({
        model: _model.Attachment
    }),

    Exams: Backbone.Collection.extend({
        model: _model.Exam,
        url: '/exams'
    }),

    Homeworks: Backbone.Collection.extend({
        model: _model.Homework,
        url: '/homeworks'
    }),

    Meetings: Backbone.Collection.extend({
        model: _model.Meeting,
        url: '/meetings'
    }),

    Aids: Backbone.Collection.extend({
        model: _model.Aid,
        url: '/aids'
    })

};

},{"../models/models":3}],3:[function(require,module,exports){
module.exports = {

    Course: Backbone.Model.extend(),

    Discussion: Backbone.Model.extend({
        urlRoot: '/discussions'
    }),

    Comment: Backbone.Model.extend({
        urlRoot: '/comments'
    }),

    Exam: Backbone.Model.extend({
        urlRoot: '/exams'
    }),

    Homework: Backbone.Model.extend({
        urlRoot: '/homeworks'
    }),

    Meeting: Backbone.Model.extend({
        urlRoot: '/meetings'
    }),

    Aid: Backbone.Model.extend({
        urlRoot: '/aids'
    }),

    Attachment: Backbone.Model.extend()
};

},{}],4:[function(require,module,exports){
var _Collection = window.ACADEMY.backbone.collection.constructors,
    _collection = window.ACADEMY.backbone.collection.instances;

var Router = Backbone.Router.extend({

    routes : {
        'home': 'home',
        'course': 'course',
        '*otherRoute': 'default'
    },

    initialize : function(){
        //..
    },

    home : function(){
        this.navigate('');
        _collection.courses = new _Collection.Courses();
        _collection.discussions = new _Collection.Discussions();
        _collection.comments = new _Collection.Comments();
    },

    course : function(){
        this.navigate('');
        _collection.exams = new _Collection.Exams();
        _collection.discussions = new _Collection.Discussions();
        _collection.homeworks = new _Collection.Homeworks();
        _collection.meetings = new _Collection.Meetings();
        _collection.aids = new _Collection.Aids();
    },

    default : function(otherRoute){
        this.navigate('');
    }
});

window.ACADEMY.router = new Router();

Backbone.history.start({pushState: true, root: window.location.pathname});

},{}],5:[function(require,module,exports){
module.exports = {
    namespace: function(route){
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
    },
    timeFromNow: function(date){
        if(window.moment){
            return moment(date).fromNow();
        }
        return date;
    },
    largeDate: function(date){
        if(window.moment){
            return moment(date).format('LL');
        }
        return date;
    },
    day: function(date){
        if(window.moment){
            return moment(date).format('DD');
        }
        return date;
    },
    largeMonth: function(date){
        if(window.moment){
            return moment(date).format('MMM');
        }
        return date;
    }

};

},{}]},{},[1,5,3,2,4]);
