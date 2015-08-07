var React = require('react/addons'),
    Discussion = window.ACADEMY.backbone.model.constructors.discussion,
    discussions = window.ACADEMY.backbone.collection.instances.discussions;

module.exports = React.createClass({
    displayName: 'DiscussionForm',

    getInitialState: function(){
        return {
            question: ''
        }
    },

    changeDiscussion: function(e){
        var newState = React.addons.update(this.state, {
            question: { $set: e.target.value }
        });
        this.setState(newState);
    },

    sendSubmit: function(){
        var self = this;

        var discussion = new Discussion();
        discussion.set('question', this.state.question);
        discussion.save(null,{
            success : function(discussion){
                //aniado la nueva discusion a la coleccion
                //discussions.add(discussion);
                //limpio el input para aniadir discussion
                self.cancelSubmit();
                //muestro alerta satisfactoria
                window.ACADEMY.socket.emit('newDiscussion',{
                    notification: {
                        level:'success',
                        title:'Se agregó nueva pregunta!',
                        message: '<strong class="text-uppercase">'+ discussion.attributes.question +'</strong>'
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
        return(
            <div className="row">
                <div className="large-12 columns">
                    <div className="row border-bottom-dark">
                        <div className="small-8 columns">
                            <div className="row">
                                <div className="small-12 medium-3 columns menu-link">
                                    <h3><a id="btn-new-discussion">NUEVA</a></h3>
                                </div>
                                <div className="small-12 medium-3 columns end menu-link">
                                    <h3><a id="btn-search-discussion">BUSCAR</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="form-add-discussion" className="row border-bottom-dark">
                        <div className="small-12 columns">
                            <div className="row collapse">
                                <div className="small-10 columns">
                                    <input id="input-question-discussion" type="text" value={this.state.question} onChange={this.changeDiscussion} placeholder="Escribe tu pregunta aquí."/>
                                </div>
                                <div className="small-2 columns">
                                    <a id="btn-send-discussion" className="button yellow postfix" onClick={this.sendSubmit}>Enviar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
