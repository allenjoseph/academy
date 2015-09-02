var React = require('react');

module.exports = React.createClass({
    displayName: 'CourseElement',
    render: function(){
        return(
            <div>{this.props.properties}</div>
        );
    }
});
