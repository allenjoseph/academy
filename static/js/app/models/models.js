(function(_Model){

    _Model.course = Backbone.Model.extend();

    _Model.discussion = Backbone.Model.extend({
        urlRoot : '/discussion'
    });

    _Model.comment = Backbone.Model.extend({
        urlRoot : '/comment'
    });

    _Model.exam = Backbone.Model.extend({
        urlRoot : '/exam'
    });

    _Model.attachment = Backbone.Model.extend();

})(window.ACADEMY.backbone.model.constructors);
