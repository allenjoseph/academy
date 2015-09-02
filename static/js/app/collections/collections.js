var _model = require('../models/models');

module.exports = {

    Courses: Backbone.Collection.extend({
        model: _model.Course,
        url: 'courses/?format=json'
    }),

    Discussions: Backbone.Collection.extend({
        model: _model.Discussion,
        url: 'discussions/?format=json',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    Comments: Backbone.Collection.extend({
        model: _model.Comment,
        url: 'comments',
        comparator: function(model){
            return -model.get('id');
        }
    }),

    Attachments: Backbone.Collection.extend({
        model: _model.Attachment
    }),

    Exams: Backbone.Collection.extend({
        model: _model.Exam,
        url: 'exams'
    }),

    Homeworks: Backbone.Collection.extend({
        model: _model.Homework,
        url: 'homeworks'
    }),

    Meetings: Backbone.Collection.extend({
        model: _model.Meeting,
        url: 'meetings'
    }),

    Aids: Backbone.Collection.extend({
        model: _model.Aid,
        url: 'aids'
    })

};
