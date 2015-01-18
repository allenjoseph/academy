(function(){
    var courses = Backbone.Collection.extend({
        model : Models.Course
    });
    window.Collections.Courses = courses;

    var discussions = Backbone.Collection.extend({
        model : Models.Discussion
    });
    window.Collections.Discussions = discussions;

})();
