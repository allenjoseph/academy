var React = require('react');
var URL_STACTIC = window.ACADEMY.constans.URL_STACTIC;
var comments = window.ACADEMY.backbone.collection.instances.comments;
var Mixins = require('./mixins');
var Utilities = window.ACADEMY.utilities;

module.exports = React.createClass({
    displayName: 'CommentList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function(){
        comments.fetch({
            data: $.param({
                format : 'json',
                id: this.props.discussionId
            })
        });
    },

    getBackboneModels: function(){
        return [comments];
    },

    getComments: function(){
        return comments.map(function (item){
            var comment = item.attributes;
            return(
                <div className="row comment-entry" key={item.cid}>
                    <div className="comment-entry-figure">
                        <figure title={comment.student.name + ' ' + comment.student.lastname}>
                            { comment.student.photo ? <img src={URL_STACTIC + comment.student.photo} className="cicle" /> : '' }
                        </figure>
                    </div>
                    <div className="comment-entry-text">
                        <span>{comment.comment}</span>
                        <small>{ Utilities.timeFromNow(comment.dateCreation) }</small>
                    </div>
                </div>
            );
        });
    },

    render: function(){
        return(
            <div className="comment-body">
                <div className="comment-list">
                    {
                        !comments.length ? <span>Sin comentarios</span> :
                            this.getComments()
                    }
                </div>
            </div>
        );
    }
});
