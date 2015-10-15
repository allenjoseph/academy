var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Course',

    openModalExam: function(e){
        window.dispatchEvent(new CustomEvent('openModalExam', { detail: this.props.academyCourse }));
    },

    render: function() {
        var course = this.props.academyCourse.course,
            href = '/course/'+ course.slug;
        return (
            <li>
                <div className="course-wrapper"/>
                <div className="course-content">
                    <div>
                        <h3 className="text-center">
                            <a className="course-name" href={href}>{course.name}</a>
                        </h3>
                        <div>
                            <div>
                                <div className="row-shape one"/>
                                <div className="row-content">
                                    { this.props.figures.students } Alumnos
                                </div>
                            </div>
                            <div>
                                <div className="row-shape two"/>
                                <div className="row-content">
                                    { this.props.figures.homeworks } Trabajos
                                </div>
                            </div>
                            <div>
                                <div className="row-shape three"/>
                                <div className="row-content">
                                    { this.props.figures.exams } Examenes
                                </div>
                            </div>
                            <div className="row-separator"/>
                            <div className="row-links">
                                <div className="link-icon" title="Solicitar Ayuda"><i className="fa fa-child fa-fw"></i></div>
                                <div className="link-icon" title="Iniciar Reunion"><i className="fa fa-users fa-fw"></i></div>
                                <div className="link-icon" title="Agregar Examen" onClick={this.openModalExam}>
                                    <i className="fa fa-camera fa-fw"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});
