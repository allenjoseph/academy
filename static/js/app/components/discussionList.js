var React = require('react/addons');
var Discussion = require('./discussion');
var Mixins = require('./mixins');
var discussions = window.ACADEMY.backbone.collection.instances.discussions;

module.exports = React.createClass({
    displayName: 'DiscussionList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function(){
        discussions.fetch();
    },

    getBackboneModels: function(){
        return [discussions];
    },

    render: function(){
        var discussionNodes = discussions.map(function (discussion){
            return(
                <Discussion key={discussion.cid} discussion={discussion.attributes}/>
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
