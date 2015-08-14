var React = require('react');

module.exports = React.createClass({

    displayName: 'CoursePageInfo',

    getInitialState: function(){
        return {
            figures:{
                exams: 'Examenes disponibles',
                homeworks: 'Trabajos encargados disponibles',
                meetings: 'Reuniones de estudio programadas',
                aid: 'Solicitudes de ayuda pendientes',
                discussions: 'Preguntas hechas'
            }
        }
    },

    getFigures: function(){
        var figures = [];
        for(var key in this.props.figures){

            if( this.props.figures.hasOwnProperty(key) &&
                this.state.figures.hasOwnProperty(key)){

                figures.push(
                    <li className="figures" key={key}>
                        <span className="name">{ this.state.figures[key] }</span>
                        <span className="separator"/>
                        <span className="counter color info bg light-color">{ this.props.figures[key] }</span>
                    </li>
                );
            }
        }
        return figures;
    },

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
                        { this.getFigures() }
                    </ul>
                </div>
            </div>
        );
    }
});
