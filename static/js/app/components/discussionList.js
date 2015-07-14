var React = require('react/addons');
var Discussion = require('./discussion');
var Mixins = require('./mixins');

module.exports = React.createClass({
    displayName: 'DiscussionList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function(){
        this.props.discussions.fetch();
    },

    getBackboneModels: function(){
        return [this.props.discussions];
    },

    render: function(){
        var discussionNodes = this.props.discussions.map(function (discussion){
            return(
                <Discussion key={discussion.cid}
                    question={discussion.attributes.question}
                    student={discussion.attributes.student}
                    comments={discussion.attributes.comments}
                    dateCreation={discussion.attributes.dateCreation}/>
            );
        });
        return(
            <div className="row">
                <div className="large-12 columns">
                    <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-2">
                        {discussionNodes}
                    </ul>
                </div>
            </div>
        );
    }
});
