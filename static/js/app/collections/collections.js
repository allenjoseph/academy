(function(){
    var courses = Backbone.Collection.extend({
        model : Models.Course
    });
    window.Collections.Courses = courses;

    var discussions = Backbone.Collection.extend({
        model : Models.Discussion,
        url : '/discussions'
    });
    window.Collections.Discussions = discussions;

    var comments = Backbone.Collection.extend({
        model : Models.Comment
    });
    window.Collections.Comments = comments;
})();
