var React = require('react/addons'),
    Models = require('../../models/models');

module.exports = React.createClass({
    displayName: 'CommentForm',

    getInitialState: function(){
        return {
            comment: '',
            counter: 150,
            confirm: false
        }
    },

    clear: function(){
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
            e.preventDefault();
            this.validateComment();
        }
    },

    validateComment: function(){
        if(!this.state.comment) return;
        if(!this.state.confirm){
            var newState = React.addons.update(this.state, {
                confirm: { $set: true }
            });
            this.setState(newState);
            return;
        }
        this.sendSubmit();
    },

    sendSubmit: function(){
        var self = this;
        //creo un modelo Commentario
        var comment = new Models.Comment();
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
                self.clear();
            },
            error : function(){
            }
        });
    },

    render: function(){
        var buttonClass = 'button tiny in',
            buttonText = 'Comentar';

        if(this.state.confirm){
            buttonClass += ' confirm';
            buttonText = 'Confirmar';
        }

        return(
            <div className="comment-footer">
                <div className="row">
                    <div className="small-12 columns">
                        <span className="disclaimer left">Presione enter para enviar.</span>
                        <span className="counter right">{this.state.counter}</span>
                        <div className="button-inner">
                            <textarea ref="comment" className="textarea"
                                maxLength={150} value={this.state.comment}
                                onChange={this.changeComment} onKeyPress={this.onKeyPress}></textarea>
                            <button className={buttonClass} onClick={this.validateComment}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
