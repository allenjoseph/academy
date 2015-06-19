module.exports = {

    course: Backbone.Model.extend(),

    discussion: Backbone.Model.extend({
        urlRoot : '/discussion'
    }),

    comment: Backbone.Model.extend({
        urlRoot : '/comment'
    }),

    exam: Backbone.Model.extend({
        urlRoot : '/exam'
    }),

    attachment: Backbone.Model.extend()
};
