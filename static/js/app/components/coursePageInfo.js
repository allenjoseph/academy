var React = require('react'),
    studentFigures = {
        studentsEnrolled: 'Alumnos inscritos.',
        studentsOnline: 'Alumnos en linea.'
    };

module.exports = React.createClass({

    displayName: 'CoursePageInfo',

    getFigures: function(){
        var figures = [];
        for(var key in this.props.figures){

            if( this.props.figures.hasOwnProperty(key) &&
                studentFigures.hasOwnProperty(key)){

                figures.push(
                    <div className="item" key={key}>
                        <span className="figure">{ this.props.figures[key] }</span>
                        studentFigures[key] }</span>
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
                    <h3><a>{ this.props.profesor.name + ' ' + this.props.profesor.lastname }</a></h3>
                </div>
                <div className="medium-6 columns">
                    <div className="box">
                        { this.getFigures() }
                    </div>
                </div>
            </div>
        );
    }
});
