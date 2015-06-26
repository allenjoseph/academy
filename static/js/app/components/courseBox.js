var React = require('react'),
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

React.render(
  <CourseBox />,
  document.getElementById('content-react')
);
