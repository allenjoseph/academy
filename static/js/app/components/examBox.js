var React = require('react'),
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
        this.setState({openModalClass: 'modal-is-active'});
    },

    closeModalExam: function(){
        this.setState({openModalClass: ''});
        window.dispatchEvent(new Event('clearModalExam'));
    },

    render: function(){
        return (
            <div className={'modal-content ' + this.state.openModalClass}>
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal modal-exam light-color bg">
                        <a className="modal-close" onClick={this.closeModalExam}></a>
                        <ExamForm />
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
