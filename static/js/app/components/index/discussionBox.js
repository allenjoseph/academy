var React = require('react/addons');
var DiscussionList = require('./discussionList');
var DiscussionForm = require('./discussionForm');

var DiscussionBox = React.createClass({
    displayName: 'DiscussionBox',

    render: function(){
        return(
            <div className="row">
                <DiscussionForm />
                <DiscussionList />
            </div>
        );
    }
});

var $discussionBox = document.getElementById('discussionBox');
if(!!$discussionBox){
    React.render(<DiscussionBox />, $discussionBox);
}
