var React = require('react'),
    Growl = require("./Growl/growl.react");/*https://github.com/Moosylvania/react-growl*/

var NotificationBox = React.createClass({
    displayName : 'NotificationBox',
    growler: null,
    componentDidMount: function(){
        window.addEventListener('showNotification', this.showNotification);

        Growl.setMaxToShow(5);
        this.growler = this.refs.growler;
    },
    componentWillUnmount: function(){
        window.removeEventListener('showNotification', this.showNotification);
    },
    showNotification: function(data){
        this.growler.addNotification(data.detail);
    },
    render: function(){
        return(
            <div className="notification-wrapper">
                <Growl ref="growler"></Growl>
            </div>
        );
    }
});

React.render(
    <NotificationBox />,
    document.getElementById('notificationBox')
);
