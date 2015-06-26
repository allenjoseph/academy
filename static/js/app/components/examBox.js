var React = require('react'),
    ExamForm = require('./examForm'),
    Exam = window.ACADEMY.backbone.model.constructors.exam;

var ExamBox = React.createClass({
    displayName: 'ExamBox',

    getInitialState: function(){
        var exam = new Exam();
        exam.set('course', '');
        exam.set('description', '');
        exam.set('files', []);
        return { examModel: exam }
    },

    render: function(){
        return (
            <div className="modal">
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal-exam light-color bg">
                        <button className="modal-close"></button>
                        <ExamForm examModel={this.state.examModel}/>
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
