var React = require('react/addons');

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

    render: function(){
        return(
            <div className="comment-footer">
                <span className="disclaimer">Presione enter para enviar.</span>
                <span id="counter-characters" className="counter">{this.state.counter}</span>
                <textarea id="add-comment-textarea" className="comment-textarea" ref="comment"
                    maxLength={150} value={this.state.comment} disabled={this.state.enterPressed}
                    onChange={this.changeComment} onKeyPress={this.onKeyPress}></textarea>
                {
                    !this.state.enterPressed ? '' :
                        <div id="buttons-confirm-comment" className="comment-footer-confirm">
                            <button id="button-add-comment" className="button tiny yellow mr1">Enviar Comentario</button>
                            <button id="button-cancel-comment" className="button tiny secondary" onClick={this.cancelSubmit}>Cancelar</button>
                        </div>
                }
            </div>
        );
    }
});
