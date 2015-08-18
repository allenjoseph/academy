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
