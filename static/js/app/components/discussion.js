var React = require('react/addons');
var URL_STACTIC = window.ACADEMY.constans.URL_STACTIC;
var Utilities = window.ACADEMY.utilities;

module.exports = React.createClass({
    displayName: 'Discussion',

    openComments: function(){
        window.dispatchEvent(new CustomEvent('openModalComment',{ detail : this.props.discussion }));
    },

    render: function(){
        return(
            <li>
                <div className="panel shadow radius discussion">
                    <div className="row">
                        <div className="small-12 columns">
                            <p>
                                <a className="discussion-question" onClick={this.openComments}>
                                {this.props.discussion.question}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <span className="pull-left">
                                <figure title={this.props.discussion.student.name + ' ' + this.props.discussion.student.lastname}>
                                    { this.props.discussion.student.photo ? <img src={URL_STACTIC + this.props.discussion.student.photo} className="cicle" /> : '' }
                                    <span>{this.props.discussion.student.name} {this.props.discussion.student.lastname}</span>
                                </figure>
                            </span>
                            <span className="pull-right">
                                <strong id="discussion-counter-comments">
                                    {this.props.discussion.comments}
                                </strong>
                                <strong> comentarios</strong>
                            </span>
                            <span className="pull-right">{ Utilities.timeFromNow(this.props.discussion.dateCreation) }</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});
