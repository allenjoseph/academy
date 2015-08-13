var React = require('react');

module.exports = React.createClass({

    displayName: 'CoursePageInfo',

    render: function(){
        return(
            <div className="row pt1">
                <div className="medium-6 columns">
                    <h1>{ this.props.course.name }</h1>
                    <h5 className="subheader">{ this.props.profesor.name + ' ' + this.props.profesor.lastname }</h5>
                    <p>
                        <span className="label secondary">{ this.props.figures.studentsEnrolled } alumnos inscritos</span>
                        <span className="label success">{ this.props.figures.studentsOnline } enlinea</span>
                    </p>
                </div>
                <div className="medium-6 columns">
                    <ul className="no-bullet">
                        <li>{ this.props.figures.exams } examenes disponibles.</li>
                        <li>{ this.props.figures.homeworks } trabajos encargados disponibles.</li>
                        <li>{ this.props.figures.meetings } reuniones de estudio programadas.</li>
                        <li>{ this.props.figures.aid } solicitudes de ayuda pendientes.</li>
                        <li>{ this.props.figures.discussions } preguntas hechas.</li>
                    </ul>
                </div>
            </div>
        );
    }
});
