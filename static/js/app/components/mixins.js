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
            }
        }
    }
};
