var React = require('react'),
    CoursePageInfo = require('./coursePageInfo'),
    academyCourse = window.ACADEMY.backbone.model.instances.academyCourse;

var CoursePageBox = React.createClass({

    displayName: 'CoursePageBox',

    render: function(){
        return(
            <div>
                <CoursePageInfo course={academyCourse.course}
                                profesor={academyCourse.profesor}
                                figures={academyCourse.figures}/>
            </div>
        );
    }
});

var $coursePageBox = document.getElementById('coursePageBox');
if (!!$coursePageBox){
    React.render(<CoursePageBox />, $coursePageBox);
}
