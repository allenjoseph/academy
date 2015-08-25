var React = require('react/addons'),
    Comment = window.ACADEMY.backbone.model.constructors.comment;

module.exports = React.createClass({
    displayName: 'CommentForm',

    getInitialState: function(){
        return {
            enterPressed: false,
            comment: '',
            counter: 150
        }
    },

    componentDidMount: function(){
        window.addEventListener('cleanCommentForm', this.cleanCommentForm);
    },

    componentWilUnmount: function(){
        window.removeEventListener('cleanCommentForm', this.cleanCommentForm);
    },

    cleanCommentForm: function(){
        this.setState(this.getInitialState());
    },

    changeComment: function(e){
        var newState = React.addons.update(this.state, {
            comment: { $set: e.target.value },
            counter: { $set: 150 - e.target.value.length}
        });
        this.setState(newState);
    },

    onKeyPress: function(e){
        if(e.which === 13){
            newState = React.addons.update(this.state, {
                enterPressed: { $set: true }
            });
            this.setState(newState);
            e.preventDefault();
        }
    },

    cancelSubmit: function(){
        var newState = React.addons.update(this.state, {
            enterPressed: { $set: false }
        });
        this.setState(newState);
    },

    sendSubmit: function(){
        var self = this;
        //creo un modelo Commentario
        var comment = new Comment();
        comment.set('comment', this.state.comment);
        comment.set('discussion', this.props.discussionId);
        //guardo el comentario
        comment.save(null,{
            success : function(comment){
                //agrego el nuevo comentario a la colleccion
                window.ACADEMY.socket.emit('addComment',{
                    discussionId: self.props.discussionId,
                    comment: comment
                });
                self.cleanCommentForm();
            },
            error : function(){
            }
        });
    },

    render: function(){
        return(
            <div className="comment-footer">
                <div className="row">
                    <div className="small-12 columns">
                        <span className="disclaimer left">Presione enter para enviar.</span>
                        <span className="counter right">{this.state.counter}</span>
                        <textarea ref="comment"
                            maxLength={150} value={this.state.comment} disabled={this.state.enterPressed}
                            onChange={this.changeComment} onKeyPress={this.onKeyPress}></textarea>
                        {
                            !this.state.enterPressed ? '' :
                                <div className="comment-footer-confirm">
                                    <button className="button tiny cancel" onClick={this.cancelSubmit}>Cancelar</button>
                                    <button className="button tiny" onClick={this.sendSubmit}>Confirmar</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
});
