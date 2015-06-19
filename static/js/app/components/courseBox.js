var React = require('react');
var CourseList = require('./courseList');

var CourseBox = React.createClass({
    displayName : 'CourseBox',

    getInitialState : function(){
        return {
            data : [
                { name : 'Uno'},
                { name : 'Dos'},
                { name : 'Tres'}
            ]
        };
    },

    render : function(){
        return (
            <div>
                <CourseList courses={this.state.data}/>
            </div>
        );
    }
});

React.render(
  <CourseBox />,
  document.getElementById('content-react')
);
