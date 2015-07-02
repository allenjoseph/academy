var React = require('react'),
    Fileupload = require('./fileupload'),
    Exam = window.ACADEMY.backbone.model.constructors.exam;

module.exports = React.createClass({
    displayName: 'ExamForm',

    getInitialState: function(){
        return {
            course: '',
            description: '',
            files: [],
            placeholder: 'Que examen es, Práctica, Parcial, Final... ?'
        };
    },

    componentDidMount: function(){
        window.addEventListener('clearModalExam', this.cleanModel);
    },

    componentWillUnmount: function(){
        window.removeEventListener('clearModalExam', this.cleanModel);
    },

    componentDidUpdate: function(){
        if(this.props.isOpen){
            React.findDOMNode(this.refs.description).focus();
        }
    },

    cleanModel: function(){
        this.setState(this.getInitialState());
    },

    changeDescription: function(e){
        var nextState = {},
            key = e.target.getAttribute('name');

        nextState[key] = e.target.value;
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
                        <Fileupload />
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns">
                        <div className="row collapse">
                            <div className="small-10 columns">
                                <input type="text" ref="description" name="description" value={this.state.description} onChange={this.changeDescription} placeholder={this.state.placeholder}/>
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
