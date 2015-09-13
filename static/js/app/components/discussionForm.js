var React = require('react/addons'),
    Discussion = window.ACADEMY.backbone.model.constructors.Discussion,
    discussions = window.ACADEMY.backbone.collection.instances.discussions;

module.exports = React.createClass({
    displayName: 'DiscussionForm',

    getInitialState: function(){
        return {
            question: '',
            confirm: false
        };
    },

    changeDiscussion: function(e){
        var newState = React.addons.update(this.state, {
            question: { $set: e.target.value }
        });
        this.setState(newState);
    },

    validateQuestion: function(event){
        event.preventDefault();
        if(!this.state.question) return;
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
        var self = this,
            discussion = new Discussion();

        discussion.set('question', this.state.question);
        discussion.save(null,{
            success : function(discussion){
                //limpio el input para aniadir discussion
                self.cancelSubmit();
                //muestro alerta satisfactoria
                //y agrego la nueva discusion a la coleccion
                window.ACADEMY.socket.emit('newDiscussion',{
                    notification: {
                        level:'success',
                        title:'Se agregó nueva pregunta!',
                        message: '<strong class="uppercase">'+ discussion.attributes.question +'</strong>'
                    },
                    discussion: discussion
                });

            },
            error : function(){

            }
        });
    },

    cancelSubmit: function(){
        this.setState(this.getInitialState());
    },

    render: function(){
        var buttonClass = 'button tiny in',
            buttonText = 'Preguntar';

        if(this.state.confirm){
            buttonClass += ' confirm';
            buttonText = 'Confirmar';
        }

        return(
            <div className="row">
                <div className="small-12 columns">
                    <span className="input-add-discussion button-inner">
                        <input type="text" className="input" value={this.state.question}
                            onChange={this.changeDiscussion}
                            placeholder="Que deseas preguntar a otros estudiantes."/>
                        <button className={buttonClass} onClick={this.validateQuestion}>{buttonText}</button>
                    </span>
                </div>
            </div>
        );
    }
});
