module.exports = {

    Course: Backbone.Model.extend(),

    Discussion: Backbone.Model.extend({
        urlRoot: '/discussion'
    }),

    Comment: Backbone.Model.extend({
        urlRoot: '/comment'
    }),

    Exam: Backbone.Model.extend({
        urlRoot: '/exams'
    }),

    Homework: Backbone.Model.extend({
        urlRoot: '/homework'
    }),

    Meeting: Backbone.Model.extend({
        urlRoot: '/meeting'
    }),

    Aid: Backbone.Model.extend({
        urlRoot: '/aid'
    }),

    Attachment: Backbone.Model.extend()
};
