var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'CommentForm',

    getInitialState: function(){
        return {
            enterPressed: false,
            comment: ''
        }
    },

    changeComment: function(e){
        var newState = React.addons.update(this.state, {
            comment: { $set: e.target.value }
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

    render: function(){
        return(
            <div className="comment-footer">
                <span className="disclaimer">Presione enter para enviar.</span>
                <span id="counter-characters" className="counter">150</span>
                <textarea id="add-comment-textarea" className="comment-textarea" maxlength={150} value={this.state.comment} onChange={this.changeComment} disabled={this.state.enterPressed} onKeyPress={this.onKeyPress}></textarea>
                {
                    !this.state.enterPressed ? '' :
                        <div id="buttons-confirm-comment" className="comment-footer-confirm">
                            <button id="button-add-comment" className="button tiny yellow mr1">Enviar Comentario</button>
                            <button id="button-cancel-comment" className="button tiny secondary">Cancelar</button>
                        </div>
                }
            </div>
        );
    }
});
