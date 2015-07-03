var React = require('react/addons');
var DiscussionList = require('./discussionList');
var discussions = window.ACADEMY.backbone.collection.instances.discussions;

var DiscussionBox = React.createClass({
    displayName: 'DiscussionBox',

    render: function(){
        return(
            <div className="large-12 columns">
                <DiscussionList discussions={discussions}/>
            </div>
        );
    }
});

React.render(
    <DiscussionBox />,
    document.getElementById('discussions-react')
);
