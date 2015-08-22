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

    sendSubmit: function(event){
        event.preventDefault();
        var self = this;

        var discussion = new Discussion();
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
        return(
            <div className="row">
                <div className="small-12 columns">
                    <span className="input-add-discussion">
                        <i className="fa fa-pencil"/>
                        <input type="text" value={this.state.question}
                            onChange={this.changeDiscussion}/>
                        <a className="circle-button-right red" onClick={this.sendSubmit}>
                            <i className="fa fa-question"/>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
});
