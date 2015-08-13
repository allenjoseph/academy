var React = require('react'),
    CoursePageInfo = require('./coursePageInfo'),
    CourseActionList = require('./courseActionList'),
    academyCourse = window.ACADEMY.backbone.model.instances.academyCourse;

var CoursePageBox = React.createClass({

    displayName: 'CoursePageBox',

    render: function(){
        return(
            <div>
                <CoursePageInfo course={academyCourse.course}
                                profesor={academyCourse.profesor}
                                figures={academyCourse.figures}/>
                <CourseActionList/>
            </div>
        );
    }
});

var $coursePageBox = document.getElementById('coursePageBox');
if (!!$coursePageBox){
    React.render(<CoursePageBox />, $coursePageBox);
}
