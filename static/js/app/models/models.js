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
