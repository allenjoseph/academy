(function(){
    var courses = Backbone.Collection.extend({
        model : Models.Course
    });
    window.Collections.Courses = courses;
})();
