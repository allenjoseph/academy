var React = require('react/addons'),
    constans = require('../../commons/constans'),
    Utilities = require('../../commons/utilities');

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
                <div className="discussion" onClick={this.openComments}>
                    <div className="row">
                        <div className="small-12 columns">
                            <h3>
                                {this.props.discussion.question}
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <span className="left">
                                <figure title={this.props.discussion.student.name + ' ' + this.props.discussion.student.lastname}>
                                    { this.props.discussion.student.photo ? <img src={constans.STATIC + this.props.discussion.student.photo} /> : '' }
                                    <span>{this.props.discussion.student.name + ' ' + this.props.discussion.student.lastname}</span>
                                </figure>
                            </span>
                            <span className="right">
                                <strong>
                                    { this.state.comments }
                                </strong>
                                <strong> comentarios</strong>
                            </span>
                            <span className="right">
                                { Utilities.timeFromNow(this.props.discussion.dateCreation) }
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});
