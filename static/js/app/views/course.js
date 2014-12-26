(function(){
    Views.Course = Backbone.View.extend({

        el : '#content-courses',

        initialize : function(){
            this.renderCollection();
            this.listenTo( this.collection, 'add', this.render );
        },

        renderCollection : function(){
            this.$el.empty();
            this.collection.each(function(course){
                this.render(course);
            }, this);
            return this;
        },

        render : function( course ){
            var view = new Views.Course({ model : course });
            this.$el.append(view.render().el);
        }

    });
})();
