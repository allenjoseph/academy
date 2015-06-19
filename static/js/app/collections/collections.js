var models = require('../models/models');

module.exports = {

    courses: Backbone.Collection.extend({
        model : models.course,
        url: 'courses/?format=json'
    }),

    discussions: Backbone.Collection.extend({
        model : models.discussion
    }),

    comments: Backbone.Collection.extend({
        model : models.comment
    }),

    attachments: Backbone.Collection.extend({
        model : models.attachment
    })

};
