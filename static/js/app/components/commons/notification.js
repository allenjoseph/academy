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
        var self = this;
        this.setState({
            visible: true,
            data: data.detail
        });
        setTimeout(function(){
            self.closeNotification();
        },3000);
    },
    closeNotification: function(){
        this.setState(this.getInitialState());
    },
    render: function(){
        var content;
        if(this.state.visible){
            content = <div>
                        <span className="title" dangerouslySetInnerHTML={{__html: this.state.data.title || '' + ' '}}></span>
                        <span className="message" dangerouslySetInnerHTML={{__html: this.state.data.message || '' }}></span>
                        <span className="close" onClick={this.closeNotification}/>
                    </div>;
        }
        return(
            <div className={'wrapper ' + this.state.data.level}>
                { content }
            </div>
        );
    }
});

var $notificationBox = document.getElementById('notificationBox');
if($notificationBox){
    React.render(<NotificationBox />, document.getElementById('notificationBox'));
}
