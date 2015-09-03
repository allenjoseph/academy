var React = require('react'),
    CourseElementList = require('./courseElementList');

module.exports = React.createClass({
    displayName: 'CourseSectionBox',
    render: function(){
        return(
            <div className="row">
                <CourseElementList elementType={this.props.elementType} academyCourse={this.props.academyCourse}/>
            </div>
        );
    }
});
