(function(){
    var course = Backbone.Model.extend();
    window.Models.Course = course;

    var discussion = Backbone.Model.extend({
        urlRoot : '/discussion'
    });
    window.Models.Discussion = discussion;

    var comment = Backbone.Model.extend({
        urlRoot : '/comment'
    });
    window.Models.Comment = comment;

    var attachment = Backbone.Model.extend();
    window.Models.Attachment = attachment;
})();
