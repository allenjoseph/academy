var React = require('react');
var CommentForm = require('./commentForm');
var CommentList = require('./commentList');
var URL_STACTIC = window.ACADEMY.constans.URL_STACTIC;

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
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalComment', this.openModalComment);
        window.removeEventListener('closeModalComment', this.closeModalComment);
    },

    openModalComment: function(data){
        var newState = React.addons.update(this.state,{
            openModalClass: { $set: 'modal-is-active' },
            discussion: { $set: data.detail }
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
                    <section className="modal modal-comment light-color bg">
                        <a className="modal-close" onClick={this.closeModalComment}></a>
                        <div className="comment-wrapper">
                            <div className="comment-header">
                                <div className="row comment-header-top">
                                    <div className="small-12 columns">
                                        <a>{this.state.discussion.question}</a>
                                    </div>
                                </div>
                                <div className="row comment-header-footer">
                                    <div className="small-12 columns comment-header-footer-content">
                                        <span className="pull-left"><strong>{this.state.discussion.dateCreation}</strong></span>
                                        <span className="pull-right">
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
                                                            <img src={URL_STACTIC + this.state.discussion.student.photo} className="cicle" />
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
                            <CommentForm />
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
