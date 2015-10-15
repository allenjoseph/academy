var React = require('react'),
    CoursePageInfo = require('./coursePageInfo'),
    CourseElementList = require('./courseElementList'),
    academyCourse = window.ACADEMY.models.academyCourse;

var CoursePageBox = React.createClass({

    displayName: 'CoursePageBox',

    getInitialState: function(){
        return {
            sections:[
                {
                    title: 'Exámenes',
                    label: 'Compartir exámen',
                    icon: 'fa-camera',
                    collection: 'Exams',
                    action: this.openModalExam
                },
                {
                    title: 'Trabajos',
                    label: 'Compartir trabajo',
                    icon: 'fa-file-text',
                    collection: 'Homeworks'
                },
                {
                    title: 'Reuniones programadas',
                    label: 'Asistir',
                    icon: 'fa-users',
                    collection: 'Meetings'
                },
                {
                    title: 'Pendientes de ayuda',
                    label: 'Ayudar',
                    icon: 'fa-child',
                    collection: 'Aids'
                },
                {
                    title: 'Preguntas',
                    label: 'Preguntar',
                    icon: 'fa-question',
                    collection: 'Discussions',
                    action: this.openModalDiscussion
                }
            ]
        }
    },

    openModalExam: function(e){
        window.dispatchEvent(new CustomEvent(
            'openModalExam',
            { detail: academyCourse }
        ));
    },

    openModalDiscussion: function(e){
        window.dispatchEvent(new CustomEvent(
            'openModalDiscussion',
            { detail: academyCourse }
        ));
    },

    getSections: function(){
        var cont = 0;
        return this.state.sections.map(function(section){
            return (
                <div className="row box mvn pbn" key={++cont}>
                    <div className="large-12 columns">
                        <header>
                            <h2>{section.title}
                                <a onClick={section.action}>
                                    <i className="fa fa-plus"></i>
                                </a>
                            </h2>
                        </header>
                        <CourseElementList
                            collection={section.collection}
                            academyCourse={academyCourse.id} />
                    </div>
                </div>
            );
        }, this);
    },

    render: function(){
        return(
            <div className="large-12 columns">
                <CoursePageInfo
                    course={academyCourse.course}
                    profesor={academyCourse.profesor}
                    figures={academyCourse.figures}/>
                {this.getSections()}
            </div>
        );
    }
});

var $coursePageBox = document.getElementById('coursePageBox');
if ($coursePageBox){
    React.render(<CoursePageBox />, $coursePageBox);
}
