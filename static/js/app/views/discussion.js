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
            if(!window.app.views.addCommentModal){
                window.app.views.addCommentModal = new Views.AddCommentModal({ model : this.model });
            }else{
                window.app.views.addCommentModal.model = this.model
                window.app.views.addCommentModal.render();
            }
            window.app.views.addCommentModal.openModal();

            $.get('comments?format=json&id='+ this.model.get('id'))
                .done(function(data){
                    app.collections.comments = new window.Collections.Comments(data);
                    app.views.comments = new window.Views.Comments({collection : app.collections.comments});
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
            discussion.set('dateCreation',moment(discussion.get('dateCreation')).startOf('hour').fromNow());
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
            this.$el.find('.comment-wrapper').remove();
            this.$el.append(this.template(this.model.attributes));
            return this;
        },

        openModal : function(){
            this.modal.open();
        }
    });

    Views.Comments = Backbone.View.extend({

        el : '#content-discussion-comments',

        initialize : function(){
            this.render();
            this.listenTo( this.collection, 'add', this.renderComment );
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(comment){
                this.renderComment(comment);
            }, this);
            return this;
        },

        renderComment : function( comment ){
            comment.set('dateCreation',moment(comment.get('dateCreation')).startOf('hour').fromNow());
            var view = new Views.Comment({ model : comment });
            this.$el.append(view.render().el);
        }
    });

    Views.Comment = Backbone.View.extend({

        tagName : 'div',

        className : 'row comment-entry',

        template : template('tpl-discussion-comment'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
})();
