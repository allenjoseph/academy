var React = require('react'),
    CourseSectionBox = require('./courseSectionBox'),
    academyCourse = window.ACADEMY.backbone.model.instances.academyCourse;

module.exports = React.createClass({

    displayName: 'CoursePageContent',

    getInitialState: function(){
        return {
            sections:[
                {
                    title: 'Exámenes',
                    label: 'Compartir exámen',
                    icon: 'fa-camera',
                    action: this.openModalExam,
                    collection: 'exams'
                },
                {
                    title: 'Trabajos',
                    label: 'Compartir trabajo',
                    icon: 'fa-file-text',
                    collection: 'homeworks'
                },
                {
                    title: 'Reuniones programadas',
                    label: 'Asistir',
                    icon: 'fa-users',
                    collection: 'meetings'
                },
                {
                    title: 'Pendientes de ayuda',
                    label: 'Ayudar',
                    icon: 'fa-child',
                    collection: 'aids'
                },
                {
                    title: 'Preguntas',
                    label: 'Preguntar',
                    icon: 'fa-question',
                    collection: 'dicussions'
                }
            ]
        }
    },

    openModalExam: function(e){
        window.dispatchEvent(new CustomEvent('openModalExam', { detail: academyCourse }));
    },

    getFigures: function(){
        var cont = 0;
        return this.state.sections.map(function(section){
            return (
                <div className="row" key={++cont}>
                    <div className="large-12 columns">
                        <div className="box pts pln prn">
                            <header>
                                <h2>{section.title}
                                    <a onClick={section.action}>
                                        <i className="fa fa-plus"></i>
                                    </a>
                                </h2>
                            </header>
                            <CourseSectionBox elementType={section.collection}/>
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
