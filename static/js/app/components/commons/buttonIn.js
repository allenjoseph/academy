var React = require('react/addons');

export default React.createClass({

    displayName: 'ButtonText',

    render(){
        var text = '???',
            classNames = [
                'button',
                'tiny',
                'in',
                this.props.type || 'default'
            ];

        if(this.props.type === 'text' && this.props.model){

            classNames.push(this.props.valid ? 'success': 'fail');
            text = this.props.valid ? 'valido' : 'invalido';

        }else if(this.props.label && this.props.type !== 'text'){

            text = this.props.label;

        }

        var className = classNames.join(' ');

        return(

            <button type="button"
                className={className}
                disabled={!this.props.model || !this.props.valid}
                onClick={this.props.onClick}
                tabIndex={this.props.type === 'text' ? -1 : ''}>

                    { text }

            </button>

        );
    }
});
