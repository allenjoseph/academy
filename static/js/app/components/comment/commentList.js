var React = require('react');
var $ = require('jquery');
var constans = require('../../commons/constans');
var Collection = require('../../collections/collections');
var comments = new Collection.Comments();
var Mixins = require('../commons/mixins');
var Utilities = require('../../commons/utilities');

module.exports = React.createClass({
    displayName: 'CommentList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function(){
        comments.fetch({
            data: $.param({
                discussion: this.props.discussionId
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
                            { comment.student.photo ? <img src={constans.STATIC + comment.student.photo} className="cicle" /> : '' }
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
                        !comments.length
                        ? <div className="watermark">
                            <p><i className="fa fa-commenting-o fa-10x"></i></p>
                            <p>Sin comentarios, sé el primero en comentar!</p>
                        </div>
                        : this.getComments()
                    }
                </div>
            </div>
        );
    }
});
