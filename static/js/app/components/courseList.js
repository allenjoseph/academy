var React = require('react');
var Course = require('./course');
var Mixins = require('./mixins');

module.exports = React.createClass({
    displayName : 'CourseList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function() {
        this.props.courses.fetch();
    },

    getBackboneModels: function(){
        return [this.props.courses];
    },

    render: function() {

        var courseNodes = this.props.courses.map(function (course) {
            return (
                <Course key={course.cid} course={course.toJSON().course} onAddExam={this.props.onAddExam}/>
            );
        }, this);

        return (
            <ul className="content-courses small-block-grid-1 medium-block-grid-2 large-block-grid-3">
                {courseNodes}
            </ul>
        );
    }
});
