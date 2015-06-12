(function(){
    var _Collection = window.ACADEMY.backbone.collection.constructors,
        _Model = window.ACADEMY.backbone.model.constructors;

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
})();
