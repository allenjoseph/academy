(function(){

    Views.Discussion = Backbone.View.extend({

        tagName : 'li',

        events : {
            'click a.discussion-question' : 'showComments'
        },

        template : template('tpl-discussion'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        showComments : function(){
            $.get('courses?format=json')
                .done(function(data){
                    //app.collections.courses = new window.Collections.Courses(data);
                    //app.views.courses = new window.Views.Courses({collection : app.collections.courses});
                })
                .fail(function(){
                    console.error('fail get Comments :(');
                });
        }

    });

    Views.Discussions = Backbone.View.extend({

        el : '#content-discussions',

        initialize : function(){
            this.render();
            this.listenTo( this.collection, 'add', this.renderDiscussion );
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(discussion){
                this.renderDiscussion(discussion);
            }, this);
            return this;
        },

        renderDiscussion : function( discussion ){
            discussion.set('dateCreation',moment(discussion.get('dateCreation')).startOf('day').fromNow());
            var view = new Views.Discussion({ model : discussion });
            this.$el.append(view.render().el);
        }

    });
})();
