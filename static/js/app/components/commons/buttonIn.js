var React = require('react/addons');

export default React.createClass({
    displayName: 'ButtonText',
    render(){
        var className = 'button tiny in ' +
            (this.props.type || 'default') + ' ' +
            (this.props.type !== 'text' ? '' : !this.props.model ? '' : this.props.valid ? 'success' : 'fail');
        var text = '???';
        if(this.props.type === 'text' && this.props.model){
            text = this.props.valid ? 'valido' : 'invalido';
        }else if(this.props.label && this.props.type !== 'text'){
            text = this.props.label;
        }
        return(
            <button type="button"
                className={className}
                disabled={!this.props.model}
                onClick={this.props.onClick}
                tabIndex={this.props.type === 'text' ? -1 : ''}>
                    { text }
            </button>
        );
    }
});
