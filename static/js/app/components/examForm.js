var React = require('react/addons'),
    Fileupload = require('./fileupload'),
    Exam = window.ACADEMY.backbone.model.constructors.Exam;

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

    componentDidUpdate: function(){
        if(this.props.isOpen){
            React.findDOMNode(this.refs.description).focus();
        }
    },

    addFileId: function(fileId){
        if(fileId){
            this.files.push(fileId);
        }
    },

    removeFileId: function(fileId){
        if(fileId){
            var pos = this.files.indexOf(fileId);
            this.files.splice(pos,1);
        }
    },

    clear: function(){
        this.refs.fileupload.offEvents();

        this.files = [];
        this.setState(this.getInitialState());
    },

    removeFiles: function(){
        this.refs.fileupload.removeFiles();
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
        var course = this.props.academyCourse.course;
        var self = this;

        var exam = new Exam(this.state);
        exam.set('academyCourse', this.props.academyCourse.id);
        exam.set('files', this.files);
        exam.save(null,{
            success : function(exam, response){
                self.props.close();

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
                        <h3 className="modal-title text-uppercase">Compartir Examen</h3>
                    </div>
                </header>
                <article className="row">
                    <div className="small-12 columns fileupload-content">
                        <Fileupload ref={'fileupload'}
                            removeFileId={ this.removeFileId }
                            addFileId={ this.addFileId }/>
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
