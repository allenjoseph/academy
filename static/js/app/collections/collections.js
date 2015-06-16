(function(_Collection, _Model){

    _Collection.courses = Backbone.Collection.extend({
        model : _Model.course
    });

    _Collection.discussions = Backbone.Collection.extend({
        model : _Model.discussion
    });

    _Collection.comments = Backbone.Collection.extend({
        model : _Model.comment
    });

    _Collection.attachments = Backbone.Collection.extend({
        model : _Model.attachment
    });

})( window.ACADEMY.backbone.collection.constructors,
    window.ACADEMY.backbone.model.constructors);
