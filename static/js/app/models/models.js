var Backbone = require('backbone');

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
