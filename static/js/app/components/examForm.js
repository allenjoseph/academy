var React = require('react/addons'),
    Fileupload = require('./fileupload'),
    Exam = window.ACADEMY.backbone.model.constructors.exam;

module.exports = React.createClass({
    displayName: 'ExamForm',

    getInitialState: function(){
        return {
            description: '',
            placeholder: 'Que examen es, Práctica, Parcial, Final... ?',
            files: [],
            confirm: false
        };
    },

    componentDidMount: function(){
        window.addEventListener('addFile', this.addFile);
        window.addEventListener('cleanExamForm', this.cleanExamForm);
        window.addEventListener('removeFileFromExam', this.removeFile);
    },

    componentWillUnmount: function(){
        window.removeEventListener('addFile', this.addFile);
        window.removeEventListener('cleanExamForm', this.cleanExamForm);
        window.removeEventListener('removeFileFromExam', this.removeFile);
    },

    componentDidUpdate: function(){
        if(this.props.isOpen){
            React.findDOMNode(this.refs.description).focus();
        }
    },

    addFile: function(data){
        var newState = React.addons.update(this.state,{
            files: {$push:[data.detail.id]}
        });
        this.setState(newState);
    },

    removeFile: function(data){
        if(data.detail){
            var pos = this.state.files.indexOf(data.detail);
            var newState = React.addons.update(this.state,{
                files: { $splice: [[pos,1]] }
            });
            this.setState(newState);
        }
    },

    cleanExamForm: function(){
        window.dispatchEvent(new Event('resetFileUpload'));
        this.setState(this.getInitialState());
    },

    changeDescription: function(e){
        var newState = React.addons.update(this.state, {
            description: {$set : e.target.value}
        });
        this.setState(newState);
    },

    validateExam: function(event){
        if(!this.state.description || !this.state.files.length) return;
        if(!this.state.confirm){
            var newState = React.addons.update(this.state, {
                confirm: { $set: true }
            });
            this.setState(newState);
            return;
        }
        this.shareExam();
    },

    shareExam: function(){
        var course = this.props.courseAcademy.course;
        var self = this;

        var exam = new Exam(this.state);
        exam.set('courseAcademy', this.props.courseAcademy.id);
        exam.save(null,{
            success : function(exam, response){
                window.dispatchEvent(new Event('closeModalExam'));
                window.ACADEMY.socket.emit('addExam',{
                    level:'success',
                    title:'Nuevo Examen Subido!',
                    message: 'puedes verlo en <strong>'+ course.name +'</strong>'
                });
            },
            error : function(){
                debugger;
            }
        });
    },

    render: function(){
        var buttonClass = 'button tiny in',
            buttonText = 'Compartir';

        if(this.state.confirm){
            buttonClass += ' confirm';
            buttonText = 'Confirmar';
        }
        return (
            <div className="exam-wrapper">
                <header className="row">
                    <div className="small-12 columns">
                        <h3 className="modal-title">Compartir Examen</h3>
                    </div>
                </header>
                <article className="row">
                    <div className="small-12 columns fileupload-content">
                        <Fileupload />
                    </div>
                </article>
                <footer className="row">
                    <div className="small-12 columns ptn">
                        <div className="button-inner">
                            <input type="text" className="input" ref="description" value={this.state.description}
                            onChange={this.changeDescription} placeholder={this.state.placeholder}/>
                            <button className={buttonClass} onClick={this.validateExam}>{buttonText}</button>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
});
