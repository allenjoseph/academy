var React = require('react/addons'),
    ExamForm = require('./examForm');

var ExamBox = React.createClass({
    displayName: 'ExamBox',

    getInitialState: function(){
        return {openModalClass: '', courseAcademy: {}};
    },

    componentDidMount: function(){
        window.addEventListener('openModalExam', this.openModalExam);
        window.addEventListener('closeModalExam', this.closeModalExam);
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalExam', this.openModalExam);
        window.removeEventListener('closeModalExam', this.closeModalExam);
    },

    openModalExam: function(data){
        var newState = React.addons.update(this.state,{
            openModalClass: { $set: 'modal-is-active' },
            courseAcademy: { $set: data.detail }
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
                    <section className="modal modal-exam">
                        <a className="modal-close" onClick={this.closeModalExam}></a>
                        <ExamForm isOpen={!!this.state.openModalClass} courseAcademy={this.state.courseAcademy} />
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
