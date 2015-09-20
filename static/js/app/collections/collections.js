var Backbone = require('backbone'),
    Model = require('../models/models');

module.exports = {

    Courses: Backbone.Collection.extend({
        model: Model.Course,
        url: '/courses'
    }),

    Discussions: Backbone.Collection.extend({
        model: Model.Discussion,
        url: '/discussions',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    Comments: Backbone.Collection.extend({
        model: Model.Comment,
        url: '/comments',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    Attachments: Backbone.Collection.extend({
        model: Model.Attachment
    }),

    Exams: Backbone.Collection.extend({
        model: Model.Exam,
        url: '/exams'
    }),

    Homeworks: Backbone.Collection.extend({
        model: Model.Homework,
        url: '/homeworks'
    }),

    Meetings: Backbone.Collection.extend({
        model: Model.Meeting,
        url: '/meetings'
    }),

    Aids: Backbone.Collection.extend({
        model: Model.Aid,
        url: '/aids'
    })
};
