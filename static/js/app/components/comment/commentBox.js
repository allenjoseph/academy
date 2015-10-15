var React = require('react');
var CommentForm = require('./commentForm');
var CommentList = require('./commentList');
var Utilities = require('../../commons/utilities');
var constans = require('../../commons/constans');
var Collection = require('../../collections/collections');
var comments = new Collection.Comments();

var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState: function(){
        return {
            openModalClass: '',
            discussion: {}
        };
    },

    componentDidMount: function(){
        window.addEventListener('openModalComment', this.open);
        window.addEventListener('updateCommentsCount', this.updateCount);
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalComment', this.open);
        window.removeEventListener('updateCommentsCount', this.updateCount);
    },

    open: function(data){
        var newState = React.addons.update(this.state,{
            openModalClass: { $set: 'modal-is-active' },
            discussion: { $set: data.detail }
        });
        this.setState(newState);
    },

    updateCount: function(data){
        if(data.detail.discussionId !== this.state.discussion.id) return;
        comments.add(data.detail.comment);
        var newState = React.addons.update(this.state,{
            discussion: { comments : { $set: comments.length } }
        });
        this.setState(newState);
    },

    close: function(){
        this.refs.commentForm.clear();
        this.setState(this.getInitialState());
    },

    render: function(){
        return(
            <div className={'modal-content ' + this.state.openModalClass}>
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal modal-comment">
                        <a className="modal-close" onClick={this.close}></a>
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
                            <CommentForm ref={'commentForm'} discussionId={this.state.discussion.id}/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

var $commentBox = document.getElementById('commentBox');
if($commentBox){
    React.render(<CommentBox />, $commentBox);
}
