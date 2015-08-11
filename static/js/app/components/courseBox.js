var React = require('react/addons'),
    CourseList = require('./courseList'),
    courses = window.ACADEMY.backbone.collection.instances.courses;

var CourseBox = React.createClass({
    displayName : 'CourseBox',

    render : function(){
        return (
            <div>
                <CourseList courses={courses} />
            </div>
        );
    }
});

var $courseBox = document.getElementById('courseBox');
if (!!$courseBox){
    React.render(<CourseBox />, $courseBox);
}
