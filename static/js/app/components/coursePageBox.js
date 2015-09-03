var React = require('react'),
    CoursePageInfo = require('./coursePageInfo'),
    CourseElementList = require('./courseElementList'),
    academyCourse = window.ACADEMY.backbone.model.instances.academyCourse;

var CoursePageBox = React.createClass({

    displayName: 'CoursePageBox',

    getInitialState: function(){
        return {
            sections:[
                {
                    title: 'Exámenes',
                    label: 'Compartir exámen',
                    icon: 'fa-camera',
                    action: this.openModalExam,
                    collection: 'exams',
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
                    collection: 'discussions'
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
                <div className="row box mvn" key={++cont}>
                    <div className="large-12 columns">
                        <header>
                            <h2>{section.title}
                                <a onClick={section.action}>
                                    <i className="fa fa-plus"></i>
                                </a>
                            </h2>
                        </header>
                        <CourseElementList collection={section.collection} academyCourse={academyCourse.id}/>
                    </div>
                </div>
            );
        }, this);
    },

    render: function(){
        return(
            <div className="large-12 columns">
                <CoursePageInfo course={academyCourse.course}
                                profesor={academyCourse.profesor}
                                figures={academyCourse.figures}/>
                {this.getFigures()}
            </div>
        );
    }
});

var $coursePageBox = document.getElementById('coursePageBox');
if (!!$coursePageBox){
    React.render(<CoursePageBox />, $coursePageBox);
}
