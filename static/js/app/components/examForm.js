var React = require('react/addons'),
    Fileupload = require('./fileupload'),
    Exam = window.ACADEMY.backbone.model.constructors.exam;

module.exports = React.createClass({
    displayName: 'ExamForm',

    getInitialState: function(){
        return {
            course: '',
            description: '',
            placeholder: 'Que examen es, Práctica, Parcial, Final... ?',
            files: []
        };
    },

    componentDidMount: function(){
        window.addEventListener('fileuploaddone', this.addFile);
        window.addEventListener('cleanExamForm', this.cleanExamForm);

        window.addEventListener('removeFileFromExam', this.removeFile);
    },

    componentWillUnmount: function(){
        window.removeEventListener('fileuploaddone', this.addFile);
        window.removeEventListener('cleanExamForm', this.cleanExamForm);
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
        window.dispatchEvent(new Event('fileuploadremoveall'));
        this.setState(this.getInitialState());
    },

    changeDescription: function(e){
        var newState = React.addons.update(this.state, {
            description: {$set : e.target.value}
        });
        this.setState(newState);
    },

    shareExam: function(){
        if(!this.state.files.length) return;

        var exam = new Exam(this.state);
        exam.set('course', this.props.course.id);
        exam.save(null,{
            success : function(exam){
                debugger;
            },
            error : function(){
                debugger;
            }
        });
    },

    render: function(){
        return (
            <div className="exam-wrapper">
                <div className="row">
                    <div className="small-12 columns">
                        <h1>Compartir Examen</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns fileupload-content">
                        <Fileupload />
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns">
                        <div className="row collapse">
                            <div className="small-10 columns">
                                <input type="text" ref="description" value={this.state.description} onChange={this.changeDescription} placeholder={this.state.placeholder}/>
                            </div>
                            <div className="small-2 columns">
                                <a id="btn-share-exam" className="button yellow postfix" onClick={this.shareExam}
                                disabled={!this.state.description || !this.state.files.length}>Compartir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
