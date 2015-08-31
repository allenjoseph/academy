var React = require('react');
var CommentForm = require('./commentForm');
var CommentList = require('./commentList');
var constans = window.ACADEMY.constans;
var Utilities = window.ACADEMY.utilities;
var comments = window.ACADEMY.backbone.collection.instances.comments;

var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState: function(){
        return {
            openModalClass: '',
            discussion: {}
        };
    },

    componentDidMount: function(){
        window.addEventListener('openModalComment', this.openModalComment);
        window.addEventListener('closeModalComment', this.closeModalComment);
        window.addEventListener('updateCommentsCount', this.updateCommentsCount);
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalComment', this.openModalComment);
        window.removeEventListener('closeModalComment', this.closeModalComment);
        window.removeEventListener('updateCommentsCount', this.updateCommentsCount);
    },

    openModalComment: function(data){
        var newState = React.addons.update(this.state,{
            openModalClass: { $set: 'modal-is-active' },
            discussion: { $set: data.detail }
        });
        this.setState(newState);
    },

    updateCommentsCount: function(data){
        if(data.detail.discussionId !== this.state.discussion.id) return;
        comments.add(data.detail.comment);
        var newState = React.addons.update(this.state,{
            discussion: { comments : { $set: comments.length } }
        });
        this.setState(newState);
    },

    closeModalComment: function(){
        window.dispatchEvent(new Event('cleanCommentForm'));
        this.setState(this.getInitialState());
    },

    render: function(){
        return(
            <div className={'modal-content ' + this.state.openModalClass}>
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal modal-comment">
                        <a className="modal-close" onClick={this.closeModalComment}></a>
                        <div className="comment-wrapper">
                            <div className="comment-header">
                                <div className="row comment-header-top">
                                    <div className="small-12 columns">
                                        <h3 className="modal-title">{this.state.discussion.question}</h3>
                                    </div>
                                </div>
                                <div className="row comment-header-footer">
                                    <div className="small-12 columns">
                                        <span className="left">
                                            <strong>{ Utilities.largeDate(this.state.discussion.dateCreation) }</strong>
                                        </span>
                                        <span className="right">
                                            <strong id="counter-comments">
                                                {this.state.discussion.comments || 0}
                                            </strong>
                                            <strong> comentarios</strong></span>
                                        <span>
                                        {
                                            !this.state.discussion.student ? '' :
                                                <figure title={this.state.discussion.student.name + ' ' + this.state.discussion.student.lastname}>
                                                    {
                                                        !this.state.discussion.student.photo ? '' :
                                                            <img src={constans.STATIC + this.state.discussion.student.photo} className="cicle" />
                                                    }
                                                </figure>
                                        }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {
                                !this.state.discussion.id ? '' :
                                    <CommentList discussionId={this.state.discussion.id}/>
                            }
                            <CommentForm discussionId={this.state.discussion.id}/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

React.render(
    <CommentBox />,
    document.getElementById('commentBox')
);
