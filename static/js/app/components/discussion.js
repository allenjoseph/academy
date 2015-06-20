var React = require('react');
var URL_STACTIC = window.ACADEMY.constans.URL_STACTIC;

module.exports = React.createClass({
    displayName: 'Discussion',
    render: function(){
        return(
            <li>
                <div className="panel shadow radius discussion">
                    <div className="row">
                        <div className="small-12 columns">
                            <p>
                                <a className="discussion-question">
                                {this.props.question}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <span className="pull-left">
                                <figure title={this.props.student.name + ' ' + this.props.student.lastname}>
                                    <img src={URL_STACTIC + this.props.student.photo} className="cicle" />
                                    <span>{this.props.student.name} {this.props.student.lastname}</span>
                                </figure>
                            </span>
                            <span className="pull-right">
                                <strong id="discussion-counter-comments">{this.props.comments}</strong>
                                <strong> comentarios</strong>
                            </span>
                            <span className="pull-right">{this.props.dateCreation}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});
