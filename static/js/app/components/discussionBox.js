var React = require('react/addons');
var DiscussionList = require('./discussionList');
var DiscussionForm = require('./discussionForm');
var discussions = window.ACADEMY.backbone.collection.instances.discussions;

var DiscussionBox = React.createClass({
    displayName: 'DiscussionBox',

    render: function(){
        return(
            <div className="row">
                <DiscussionForm />
                <DiscussionList discussions={discussions}/>
            </div>
        );
    }
});

React.render(
    <DiscussionBox />,
    document.getElementById('discussionBox')
);
