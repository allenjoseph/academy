var React = require('react');

module.exports = React.createClass({

    displayName: 'CoursePageInfo',

    getInitialState: function(){
        return {
            figures:{
                studentsEnrolled: 'Alumnos inscritos.',
                studentsOnline: 'Alumnos en linea.'
            }
        }
    },

    getFigures: function(){
        var figures = [];
        for(var key in this.props.figures){

            if( this.props.figures.hasOwnProperty(key) &&
                this.state.figures.hasOwnProperty(key)){

                figures.push(
                    <div className="item" key={key}>
                        <span className="figure">{ this.props.figures[key] }</span>
                        <span className="description">{ this.state.figures[key] }</span>
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
