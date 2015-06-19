var React = require('react');
var Course = require('./course');

module.exports = React.createClass({
    displayName : 'CourseList',
    render: function() {
        var courseNodes = this.props.courses.map(function (course) {
            return (
                <Course name={course.name} />
            );
        });
        return (
            <ul className="content-courses small-block-grid-1 medium-block-grid-2 large-block-grid-3">
                {courseNodes}
            </ul>
        );
    }
});
