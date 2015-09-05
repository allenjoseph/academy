var React = require('react/addons'),
    DiscussionModalForm = require('./discussionModalForm');

var DiscussionModal = React.createClass({
    displayName: 'DiscussionModal',

    getInitialState: function(){
        return {openModalClass: '', academyCourse: {}};
    },

    componentDidMount: function(){
        window.addEventListener('openModalDiscussion', this.openModal);
    },

    componentWilUnmount: function(){
        window.removeEventListener('openModalDiscussion', this.openModal);
    },

    openModal: function(data){
        var newState = React.addons.update(this.state,{
            openModalClass: { $set: 'modal-is-active' },
            academyCourse: { $set: data.detail }
        });
        this.setState(newState);
    },

    close: function(){
        this.setState(this.getInitialState());
    },

    render: function(){
        return (
            <div className={'modal-content ' + this.state.openModalClass}>
                <div className="modal-overlay"></div>
                <div className="modal-wrapper">
                    <section className="modal modal-exam">
                        <a className="modal-close" onClick={this.close}></a>
                        <DiscussionModalForm
                            ref={'discussionModalForm'}
                            isOpen={!!this.state.openModalClass}
                            academyCourse={this.state.academyCourse}
                            close={this.close}/>
                    </section>
                </div>
            </div>
        );
    }
});

React.render(
  <DiscussionModal />,
  document.getElementById('discussionModal')
);
