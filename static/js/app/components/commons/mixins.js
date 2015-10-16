var React = require('react/addons');

module.exports = {
    backboneMixin: {
        componentDidMount: function() {
            // Whenever there may be a change in the Backbone data, trigger a reconcile.
            this.getBackboneModels().forEach(function(model) {
                model.on('add change remove', this.forceUpdate.bind(this, null), this);
            }, this);
        },

        componentWillUnmount: function() {
            // Ensure that we clean up any dangling references when the component is destroyed.
            this.getBackboneModels().forEach(function(model) {
                model.off(null, null, this);
            }, this);
        }
    },
    modelMixin: {
        bindTo: function(model, key){
            return {
                value: model.get(key),
                requestChange: function(value){
                    model.set(key, value);
                }.bind(this)
            };
        }
    },
    focusMixin: {

        setFocus(){
            if(this.elementToFocus && this.refs[this.elementToFocus]){
                var element = React.findDOMNode(this.refs[this.elementToFocus]);
                element.focus();

                if(element === document.activeElement){//check focus
                    this.elementToFocus = '';
                }
            }
        },

        componentDidMount(){
            this.setFocus();
        },

        componentDidUpdate(){
            this.setFocus();
        }
    }
};
