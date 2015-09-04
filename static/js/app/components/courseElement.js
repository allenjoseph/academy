var React = require('react'),
    Utilities = window.ACADEMY.utilities;

module.exports = React.createClass({
    displayName: 'CourseElement',

    exams: function(){
        var exam = this.props.properties;
        return(
            <div className="row simple-row">
                <div className="medium-1 columns">
                    <strong>{Utilities.day(exam.dateCreation)}</strong>
                    <small>{Utilities.largeMonth(exam.dateCreation)}</small>
                </div>
                <div className="medium-10 columns">
                    {exam.description}
                </div>
                <div className="medium-1 columns">
                    <strong>{exam.files} files</strong>
                </div>
            </div>
        );
    },

    render: function(){
        if(this.hasOwnProperty(this.props.collection)){
            return this[this.props.collection]();
        }else{
            return(
                <div>{this.props.properties}</div>
            );
        }
    }
});
