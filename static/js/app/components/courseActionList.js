var React = require('react');

module.exports = React.createClass({

    displayName: 'CourseActionList',

    render: function(){
        return(
            <div className="row">
                <div className="medium-2 medium-offset-1 columns text-center">
                    <a className="cicle-icon-link pink" title="Compartir exámen">
                        <i className="fa fa-camera fa-fw"></i>
                    </a>
                </div>
                <div className="medium-2 columns text-center">
                    <a className="cicle-icon-link orange" title="Compartir trabajo encargado">
                        <i className="fa fa-file-text fa-fw"></i>
                    </a>
                </div>
                <div className="medium-2 columns text-center">
                    <a className="cicle-icon-link lime" title="Iniciar reunión de estudio">
                        <i className="fa fa-users fa-fw"></i>
                    </a>
                </div>
                <div className="medium-2 columns text-center">
                    <a className="cicle-icon-link cyan" title="Solicitar ayuda">
                        <i className="fa fa-child fa-fw"></i>
                    </a>
                </div>
                <div className="medium-2 columns end text-center">
                    <a className="cicle-icon-link brown" title="Preguntar en el curso">
                        <i className="fa fa-question-circle fa-fw"></i>
                    </a>
                </div>
            </div>
        );
    }
});
