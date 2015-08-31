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
//window.ACADEMY.socket = io.connect('http://socket.allenjoseph.pe');//dev for c9.io
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
var models = require('../models/models');

module.exports = {

    courses: Backbone.Collection.extend({
        model : models.course,
        url: 'courses/?format=json'
    }),

    discussions: Backbone.Collection.extend({
        model : models.discussion,
        url: 'discussions/?format=json',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    comments: Backbone.Collection.extend({
        model : models.comment,
        url: 'comments',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    attachments: Backbone.Collection.extend({
        model : models.attachment
    })

};

},{"../models/models":3}],3:[function(require,module,exports){
module.exports = {

    course: Backbone.Model.extend(),

    discussion: Backbone.Model.extend({
        urlRoot : '/discussion'
    }),

    comment: Backbone.Model.extend({
        urlRoot : '/comment'
    }),

    exam: Backbone.Model.extend({
        urlRoot : '/exams'
    }),

    attachment: Backbone.Model.extend()
};

},{}],4:[function(require,module,exports){
var _Model = window.ACADEMY.backbone.model.constructors,
    _Collection = window.ACADEMY.backbone.collection.constructors,
    _collection = window.ACADEMY.backbone.collection.instances;

var Router = Backbone.Router.extend({

    routes : {
        'home': 'home',
        'course': 'course',
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

    course : function(){
        this.navigate('');
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
    }

};

},{}]},{},[1,5,3,2,4]);
