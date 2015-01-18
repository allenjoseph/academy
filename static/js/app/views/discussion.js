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
            if(!window.app.views.addCommentModal)
                window.app.views.addCommentModal = new Views.AddCommentModal({ model : this.model });

            window.app.views.addCommentModal.openModal();

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

    Views.AddCommentModal = Backbone.View.extend({

        tagName : 'section',

        className : 'remodal remodal-comment light-color bg',

        template : template('tpl-add-comment-modal'),

        initialize : function(){
            this.render();
            var options = {
                hashTracking : false,
                closeOnAnyClick : false
            };
            this.$el.remodal(options);
            this.modal = $.remodal.lookup[this.$el.data('remodal')];
        },

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        openModal : function(){
            this.modal.open();
        }
    });
})();
