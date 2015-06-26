var React = require('react');

module.exports = React.createClass({
    displayName: 'Course',

    render: function() {
        var href = '/courses/'+ this.props.course.slug;
        return (
            <li>
                <div className="course-wrapper"></div>
                <div className="course-content">
                    <div>
                        <h3 className="text-center">
                            <a className="course-name" href={href}>{this.props.course.name}</a>
                        </h3>
                        <div className="course-rows">
                            <div className="row-one">
                                <div className="row-shape one"></div>
                                <div className="row-content one">
                                    25 Alumnos
                                </div>
                            </div>
                            <div className="row-two">
                                <div className="row-shape two"></div>
                                <div className="row-content two">
                                    10 Trabajos
                                </div>
                            </div>
                            <div className="row-three">
                                <div className="row-shape three"></div>
                                <div className="row-content three">
                                    5 Examenes
                                </div>
                            </div>
                            <div className="row-separator">
                            </div>
                            <div className="row-links">
                                <div className="link-icon" title="Solicitar Ayuda"><i className="fa fa-child fa-fw"></i></div>
                                <div className="link-icon" title="Iniciar Reunion"><i className="fa fa-users fa-fw"></i></div>
                                <div className="link-icon btn-add-exam" title="Agregar Examen" data-remodal-target="modal">
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
