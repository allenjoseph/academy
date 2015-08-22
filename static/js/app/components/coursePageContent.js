var React = require('react'),
    academyCourse = window.ACADEMY.backbone.model.instances.academyCourse;

module.exports = React.createClass({

    displayName: 'CoursePageContent',

    getInitialState: function(){
        return {
            figures:[
                {
                    title: 'Exámenes',
                    label: 'Compartir exámen',
                    icon: 'fa-camera',
                    action: this.openModalExam
                },
                {
                    title: 'Trabajos',
                    label: 'Compartir trabajo',
                    icon: 'fa-file-text'
                },
                {
                    title: 'Reuniones programadas',
                    label: 'Asistir',
                    icon: 'fa-users'
                },
                {
                    title: 'Pendientes de ayuda',
                    label: 'Ayudar',
                    icon: 'fa-child'
                },
                {
                    title: 'Preguntas',
                    label: 'Preguntar',
                    icon: 'fa-question'
                }
            ]
        }
    },

    openModalExam: function(e){
        debugger;
        window.dispatchEvent(new CustomEvent('openModalExam', { detail: academyCourse }));
    },

    getFigures: function(){
        var cont = 0;
        return this.state.figures.map(function(figure){
            return (
                <div className="row" key={++cont}>
                    <div className="large-12 columns">
                        <div className="box pts pln prn">
                            <header>
                                <h2>{figure.title}</h2>
                                <a className="circle-button-right red" title={figure.label} onClick={figure.action}>
                                    <i className={'fa ' + figure.icon}></i>
                                </a>
                            </header>
                            <p>Sin registros</p>
                        </div>
                    </div>
                </div>
            );
        });
    },

    render: function(){
        return(
            <div>
                {this.getFigures()}
            </div>
        );
    }
});
