var React = require('react/addons'),
    Models = require('../../models/models');

module.exports = React.createClass({
    displayName: 'DiscussionModalForm',

    getInitialState: function(){
        return {
            question: '',
            counter: 150,
            confirm: false
        };
    },

    componentDidUpdate: function(){
        if(this.props.isOpen){
            React.findDOMNode(this.refs.question).focus();
        }
    },

    clear: function(){
        this.setState(this.getInitialState());
    },

    changeQuestion: function(e){
        var newState = React.addons.update(this.state, {
            question: { $set : e.target.value },
            counter: { $set: 150 - e.target.value.length }
        });
        this.setState(newState);
    },

    onKeyPress: function(e){
        if(e.which === 13){
            e.preventDefault();
            this.validateQuestion();
        }
    },

    validateQuestion: function(){
        if(!this.state.question) return;
        if(!this.state.confirm){
            var newState = React.addons.update(this.state, {
                confirm: { $set: true }
            });
            this.setState(newState);
            return;
        }
        this.shareDicussion();
    },

    shareDicussion: function(){
        var course = this.props.academyCourse.course;
        var self = this;

        var discussion = new Models.Discussion();
        discussion.set('question', this.state.question);
        discussion.set('academyCourse', this.props.academyCourse.id);
        discussion.save(null,{
            success : function(discussion, response){
                self.props.close();

                window.ACADEMY.socket.emit('newDiscussion',{
                    notification: {
                        level:'success',
                        title:'Se agregó nueva pregunta en <strong>'+ course.name +'</strong>',
                        message: '<strong class="uppercase">'+ discussion.attributes.question +'</strong>'
                    },
                    discussion: discussion
                });
            },
            error : function(){
                //..
            }
        });
    },

    render: function(){
        var buttonClass = 'button tiny in',
            buttonText = 'Compartir',
            courseName;

        if(this.state.confirm){
            buttonClass += ' confirm';
            buttonText = 'Confirmar';
        }

        if(this.props.academyCourse && this.props.academyCourse.course){
            courseName = this.props.academyCourse.course.name;
        }

        return (
            <div className="exam-wrapper">
                <header className="row">
                    <div className="small-12 columns">
                        <h3 className="modal-title">
                            Que deseas preguntar a otros estudiantes de {courseName}.
                        </h3>
                    </div>
                </header>

                <footer className="row">
                    <div className="small-12 columns">
                        <span className="counter right">{this.state.counter}</span>
                        <div className="button-inner">
                            <textarea ref="question" className="textarea"
                                maxLength={150} value={this.state.question}
                                onChange={this.changeQuestion} onKeyPress={this.onKeyPress}></textarea>
                            <button className={buttonClass} onClick={this.validateQuestion}>{buttonText}</button>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
});
