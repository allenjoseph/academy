var React = require('react/addons');
var URL_STACTIC = window.ACADEMY.constans.URL_STACTIC;
var Utilities = window.ACADEMY.utilities;

module.exports = React.createClass({
    displayName: 'Discussion',

    getInitialState: function(){
        return {
            comments : 0
        };
    },

    componentDidMount: function(){
        window.addEventListener('updateCommentsCount', this.updateCommentsCount);
        if(this.props.discussion.comments){
            this.setState({ comments: this.props.discussion.comments });
        }
    },

    componentWilUnmount: function(){
        window.removeEventListener('updateCommentsCount', this.updateCommentsCount);
    },

    updateCommentsCount: function(data){
        if(data.detail.discussionId !== this.props.discussion.id) return;
        this.setState({ comments: this.state.comments + 1 });
    },

    openComments: function(){
        var discussion = this.props.discussion;
        if(this.state.comments > discussion.comments){
            discussion.comments = this.state.comments;
        }
        window.dispatchEvent(new CustomEvent('openModalComment',{ detail : discussion }));
    },

    render: function(){
        return(
            <li>
                <div className="panel discussion box-shadow-light">
                    <div className="row">
                        <div className="small-12 columns">
                            <p>
                                <a className="discussion-question" onClick={this.openComments}>
                                {this.props.discussion.question}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <span className="pull-left">
                                <figure title={this.props.discussion.student.name + ' ' + this.props.discussion.student.lastname}>
                                    { this.props.discussion.student.photo ? <img src={URL_STACTIC + this.props.discussion.student.photo} className="cicle" /> : '' }
                                    <span>{this.props.discussion.student.name} {this.props.discussion.student.lastname}</span>
                                </figure>
                            </span>
                            <span className="pull-right">
                                <strong id="discussion-counter-comments">
                                    { this.state.comments }
                                </strong>
                                <strong> comentarios</strong>
                            </span>
                            <span className="pull-right">{ Utilities.timeFromNow(this.props.discussion.dateCreation) }</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});
