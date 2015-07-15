var React = require('react');
var URL_STACTIC = window.ACADEMY.constans.URL_STACTIC;

var CommentForm = React.createClass({
    render: function(){
        return(
            <div className="comment-footer">
                <span className="disclaimer">Presione enter para enviar.</span>
                <span id="counter-characters" className="counter">150</span>
                <textarea id="add-comment-textarea" className="comment-textarea" maxlength="150"></textarea>
                <div id="buttons-confirm-comment" className="comment-footer-confirm">
                    <button id="button-add-comment" className="button tiny yellow mr1">Enviar Comentario</button>
                    <button id="button-cancel-comment" className="button tiny secondary">Cancelar</button>
                </div>
            </div>
        );
    }
});

var CommentList = React.createClass({
    getInitialState: function(){
        return {comments:[]}
    },
    render: function(){
        var comments = this.state.comments.map(function(comment){
            return(
                <div className="row comment-entry">
                    <div class="comment-entry-figure">
                        <figure title={comment.student.name + ' ' + comment.student.lastname}>
                            { comment.student.photo ? <img src={URL_STACTIC + comment.student.photo} class="cicle" /> : '' }
                        </figure>
                    </div>
                    <div class="comment-entry-text">
                        <span>{comment.comment}</span>
                        <small>{comment.dateCreation}</small>
                    </div>
                </div>
            );
        });
        return(
            <div className="comment-body-wrapper">
                <div id="content-discussion-comments" className="comment-body-content">
                    <span>Cargando Comentarios</span>
                    {comments}
                </div>
            </div>
        );
    }
});

var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState: function(){
        return {
            openModalClass: '',
            discussion: {
                question: '',
                dateCreation: '',
                comments:[]
            },
            student: {
                name: '',
                lastname: '',
                photo:''
            }
        };
    },
    closeModalComment: function(){

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
                                            <strong id="counter-comments">{this.state.discussion.comments.length}</strong>
                                            <strong> comentarios</strong></span>
                                        <span>
                                        <figure title={this.state.student.name + ' ' + this.state.student.lastname}>
                                        { this.state.student.photo ? <img src={URL_STACTIC + this.state.student.photo} className="cicle" /> : '' }
                                        </figure>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <CommentList />
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
