var React = require('react'),
    Utilities = require('../commons/utilities');

module.exports = React.createClass({
    displayName: 'CourseElement',

    exams: function(){
        var exam = this.props.properties;
        return(
            <div className="row simple-row" key={exam.cid}>
                <div className="medium-1 columns">
                    <strong>{Utilities.day(exam.dateCreation)}</strong>
                    <span> {Utilities.largeMonth(exam.dateCreation)}</span>
                </div>
                <div className="medium-10 columns">
                    {exam.description}
                </div>
                <div className="medium-1 columns text-right">
                    <strong>{exam.files} files</strong>
                </div>
            </div>
        );
    },

    discussions: function(){
        var discussion = this.props.properties;
        return(
            <div className="row simple-row" key={discussion.cid}>
                <div className="medium-1 columns">
                    <strong>{Utilities.day(discussion.dateCreation)}</strong>
                    <span> {Utilities.largeMonth(discussion.dateCreation)}</span>
                </div>
                <div className="medium-9 columns">
                    {discussion.question}
                </div>
                <div className="medium-2 columns text-right">
                    <strong>{discussion.comments} comments</strong>
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
