var React = require('react/addons'),
    ExamForm = require('./examForm');

var ExamBox = React.createClass({
    displayName: 'ExamBox',

    getInitialState: function(){
        return {openModalClass: '', courseAcademy: {}};
    },

    componentDidMount: function(){
        window.addEventListener('openModalExam', this.openModalExam);
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalExam', this.openModalExam);
    },

    openModalExam: function(data){
        var newState = React.addons.update(this.state,{
            openModalClass: { $set: 'modal-is-active' },
            courseAcademy: { $set: data.detail }
        });
        this.setState(newState);
    },

    close: function(){
        this.refs.examForm.clear();
        this.setState(this.getInitialState());
    },

    cancel: function(){
        this.refs.examForm.removeFiles();
        this.close();
    },

    render: function(){
        return (
            <div className={'modal-content ' + this.state.openModalClass}>
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal modal-exam">
                        <a className="modal-close" onClick={this.cancel}></a>
                        <ExamForm
                            ref={'examForm'}
                            isOpen={!!this.state.openModalClass}
                            courseAcademy={this.state.courseAcademy}
                            close={this.close}/>
                    </section>
                </div>
            </div>
        );
    }
});

React.render(
  <ExamBox />,
  document.getElementById('examBox')
);
