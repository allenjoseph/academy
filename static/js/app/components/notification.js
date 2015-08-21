var React = require('react/addons');

var NotificationBox = React.createClass({
    displayName : 'NotificationBox',

    getInitialState: function(){
        return {
            visible: false,
            data: {}
        };
    },

    componentDidMount: function(){
        window.addEventListener('showNotification', this.showNotification);
    },
    componentWillUnmount: function(){
        window.removeEventListener('showNotification', this.showNotification);
    },
    showNotification: function(data){
        this.setState({
            visible: true,
            data: data.detail
        });
    },
    render: function(){
        debugger;
        if(this.state.visible){
            return(
                <div className={this.state.data.level + ' wrapper'}>
                    <span class="title">Se agregó nueva pregunta!</span>
                    <span class="message">
                        <strong>asasasas</strong>
                    </span>
                </div>
            );
        }
        return(
            <div/>
        );
    }
});

React.render(
    <NotificationBox />,
    document.getElementById('notificationBox')
);
