var React = require('react/addons'),
    ExamForm = require('./examForm');

var ExamBox = React.createClass({
    displayName: 'ExamBox',

    getInitialState: function(){
        return {openModalClass: ''};
    },

    componentDidMount: function(){
        window.addEventListener('openModalExam', this.openModalExam);
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalExam', this.openModalExam);
    },

    openModalExam: function(){
        var newState = { openModalClass: 'modal-is-active' };
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
                        <ExamForm isOpen={!!this.state.openModalClass}/>
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
