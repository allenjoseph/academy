var React = require('react/addons');
var Discussion = require('./discussion');
var Mixins = require('../commons/mixins');
var Collection = require('../../collections/collections');
var discussions = new Collection.Discussions;

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
            if(!discussion.attributes.academyCourse){
                return(
                    <Discussion key={discussion.cid} discussion={discussion.attributes}/>
                );
            }
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
