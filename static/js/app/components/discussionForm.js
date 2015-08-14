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
        if (event.charCode !== 13) return true;

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
            <div id="form-add-discussion" className="row pt2 pb1">
                <div className="small-12 columns">
                    <span className="icon-inner-input">
                        <i className="fa fa-question"></i>
                    </span>
                    <input className="input-dark"
                        type="text" value={this.state.question}
                        onChange={this.changeDiscussion} onKeyPress={this.sendSubmit}/>
                </div>
            </div>
        );
    }
});
