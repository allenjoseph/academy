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
                    <div className="figures" key={key}>
                        <span className="name">{ this.state.figures[key] }</span>
                        <span className="separator"/>
                        <span className="counter color info bg light-color">{ this.props.figures[key] }</span>
                    </div>
                );
            }
        }
        return figures;
    },

    render: function(){
        return(
            <div className="row mtn">
                <div className="medium-6 columns">
                    <h1>{ this.props.course.name }</h1>
                    <a>{ this.props.profesor.name + ' ' + this.props.profesor.lastname }</a>
                    <div className="hide">
                        <span className="label secondary">{ this.props.figures.studentsEnrolled } alumnos inscritos</span>
                        <span className="label success">{ this.props.figures.studentsOnline } enlinea</span>
                    </div>
                </div>
                <div className="medium-6 columns">
                    <div className="box">
                        <div>
                            { this.getFigures() }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
