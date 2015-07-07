var React = require('react/addons'),
    ExamForm = require('./examForm');

var ExamBox = React.createClass({
    displayName: 'ExamBox',

    growler:

    getInitialState: function(){
        return {openModalClass: '', course: {}};
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
            course: { $set: data.detail }
        });
        this.setState(newState);
    },

    closeModalExam: function(){
        window.dispatchEvent(new Event('cleanExamForm'));
        this.setState(this.getInitialState());
    },

    render: function(){
        return (
            <div className={'modal-content ' + this.state.openModalClass}>
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal modal-exam light-color bg">
                        <a className="modal-close" onClick={this.closeModalExam}></a>
                        <ExamForm isOpen={!!this.state.openModalClass} course={this.state.course} />
                    </section>
                </div>
            </div>
        );
    }
});

React.render(
  <ExamBox />,
  document.getElementById('modal-exam')
);
