var React = require('react'),
    Exam = window.ACADEMY.backbone.model.constructors.exam;

module.exports = React.createClass({
    displayName: 'ExamForm',

    getInitialState: function(){
        this.initialData = {
            course: '',
            description: '',
            files: [],
            placeholder: 'Que examen es, Práctica, Parcial, Final... ?'
        };
        this.examModel = new Exam(this.initialData);
        return this.examModel.toJSON();
    },

    componentDidMount: function(){
        window.addEventListener('clearModalExam', this.cleanModel);
    },

    componentWillUnmount: function(){
        window.removeEventListener('clearModalExam', this.cleanModel);
    },

    cleanModel: function(){
        this.examModel.set(this.initialData);
        this.setState(this.initialData);
    },

    changeDescription: function(e){
        var nextState = {},
            key = e.target.getAttribute('name');

        nextState[key] = e.target.value;

        this.examModel.set(nextState);

        this.setState(nextState);
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
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns">
                        <div className="row collapse">
                            <div className="small-10 columns">
                                <input type="text" name="description" value={this.state.description} onChange={this.changeDescription} placeholder={this.state.placeholder}/>
                            </div>
                            <div className="small-2 columns">
                                <a id="btn-share-exam" className="button yellow postfix">Compartir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
