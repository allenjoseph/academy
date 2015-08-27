var React = require('react/addons'),
    Fileupload = require('./fileupload'),
    Exam = window.ACADEMY.backbone.model.constructors.exam;

module.exports = React.createClass({
    displayName: 'ExamForm',

    files: [],

    getInitialState: function(){
        return {
            description: '',
            placeholder: 'Que examen es, Práctica, Parcial, Final... ?',
            confirm: false
        };
    },

    componentDidMount: function(){
        window.addEventListener('doneFile', this.doneFile);
        window.addEventListener('cleanExamForm', this.cleanExamForm);
        window.addEventListener('removeFileFromExam', this.removeFile);
    },

    componentWillUnmount: function(){
        window.removeEventListener('doneFile', this.doneFile);
        window.removeEventListener('cleanExamForm', this.cleanExamForm);
        window.removeEventListener('removeFileFromExam', this.removeFile);
    },

    componentDidUpdate: function(){
        if(this.props.isOpen){
            React.findDOMNode(this.refs.description).focus();
        }
    },

    doneFile: function(data){
        if(data.detail && data.detail.id){
            this.files.push(data.detail.id);
        }
    },

    removeFile: function(data){
        if(data && data.detail){//data.detail = fileId
            var pos = this.files.indexOf(data.detail);
            this.files.splice(pos,1);
        }
    },

    cleanExamForm: function(){
        window.dispatchEvent(new Event('resetFileUpload'));
        this.files = [];
        this.setState(this.getInitialState());
    },

    changeDescription: function(e){
        var newState = React.addons.update(this.state, {
            description: {$set : e.target.value}
        });
        this.setState(newState);
    },

    validateExam: function(event){
        if(!this.state.description || !this.files.length) return;
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
        exam.set('files', this.files);
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
                        <Fileupload/>
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
