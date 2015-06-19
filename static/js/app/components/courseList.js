var React = require('react');
var Course = require('./course');

var BackboneMixin = {
    componentDidMount: function() {
        // Whenever there may be a change in the Backbone data, trigger a reconcile.
        this.getBackboneModels().forEach(function(model) {
            model.on('add change remove', this.forceUpdate.bind(this, null), this);
        }, this);
    },

    componentWillUnmount: function() {
        // Ensure that we clean up any dangling references when the component is destroyed.
        this.getBackboneModels().forEach(function(model) {
            model.off(null, null, this);
        }, this);
    }
};

module.exports = React.createClass({
    displayName : 'CourseList',

    mixins: [BackboneMixin],

    componentDidMount: function() {
        this.props.courses.fetch();
    },

    getBackboneModels: function(){
        return [this.props.courses];
    },

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
