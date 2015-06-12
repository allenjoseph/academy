(function(){
    var _Collection = window.ACADEMY.backbone.collection.constructors,
        _collection = window.ACADEMY.backbone.collection.instances,
        _Model = window.ACADEMY.backbone.model.constructors;

    Views.Discussion = Backbone.View.extend({

        tagName : 'li',

        events : {
            'click a.discussion-question' : 'showComments'
        },

        template : template('tpl-discussion'),

        initialize : function(){
            this.model.on('change:comments', this.changeCounterComments, this);
        },

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        changeCounterComments : function(){
            $('#discussion-counter-comments', this.$el).html(this.model.get('comments'));
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

            $.get('comments/?format=json&id='+ this.model.get('id'))
                .done(function(data){
                    _collection.comments = new _Collection.comments(data);
                    app.views.comments = new window.Views.Comments({collection : _collection.comments});
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
            discussion.set('dateCreation',moment(discussion.get('dateCreation')).fromNow());
            var view = new Views.Discussion({ model : discussion });
            this.$el.append(view.render().el);
        }
    });

    Views.AddCommentModal = Backbone.View.extend({

        tagName : 'section',

        className : 'remodal remodal-comment light-color bg',

        events : {
            'keypress #add-comment-textarea' : 'enterPressed',
            'keyup #add-comment-textarea' : 'countKeyPressed',
            'click #button-cancel-comment' : 'cancelComment',
            'click #button-add-comment' : 'addComment'
        },

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
            this.model.on('change:comments', this.changeCounterComments, this);

            this.$el.find('.comment-wrapper').remove();
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        },

        changeCounterComments : function(){
            $('#counter-comments', this.$el).html(this.model.get('comments'));
            return this;
        },

        openModal : function(){
            this.modal.open();
            this.$el.find('#add-comment-textarea').focus();
        },

        countKeyPressed : function(){
            //obtengo la cantidad de caracteres del comentario
            var characters = $('#add-comment-textarea').val().length;
            //actualizo el numero de caracteres escritos
            $('#counter-characters').text(150-characters);
        },

        enterPressed : function(e){
            if(e.which === 13){
                //si la tecla presionada es enter, muestra area de confirmacion
                this.confirmComment();
                return false;
            }
        },

        confirmComment : function(){
            //deshabilito el textarea del comentario
            $('#add-comment-textarea').prop('disabled',true);
            //muestro los botones de confirmacion
            $("#buttons-confirm-comment").show();
        },

        addComment : function(){
            var self = this;
            //obtengo el texto del comentario escrito
            var text = $('#add-comment-textarea').val().trim();
            //deshabilito los botones de confirmacion
            $('#buttons-confirm-comment').find('button').prop('disabled',true);
            //creo un modelo Commentario
            var comment = new _Model.comment();
            comment.set('comment', text);
            comment.set('discussion', self.model.id);
            //guardo el comentario
            comment.save(null,{
                success : function(comment){
                    //agrego el nuevo comentario a la colleccion
                    _collection.comments.add(comment);
                    //limpio la seccion del comentario
                    $('#add-comment-textarea').val('');
                    //reseteo el contador de caracteres
                    $('#counter-characters').text(150);
                    //oculto los botones de confirmacion
                    self.cancelComment();
                    //actualizo el contador de comentarios
                    var count = self.model.get('comments');
                    self.model.set('comments',++count);
                },
                error : function(){
                    //cancelo el comentario
                    self.cancelComment();
                    //muestro alerta con el fallo
                }
            });
        },

        cancelComment : function(){
            //oculto los botones de confirmacion
            $("#buttons-confirm-comment").hide();
            //habilito los botones de confirmacion
            $('#buttons-confirm-comment').find('button').prop('disabled',false);
            //habilito el textarea del comentario
            $('#add-comment-textarea').prop('disabled',false).focus();
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
            comment.set('dateCreation',moment(comment.get('dateCreation')).fromNow());
            var view = new Views.Comment({ model : comment });
            this.$el.append(view.render().el);
        }
    });

    Views.Comment = Backbone.View.extend({

        tagName : 'div',

        className : 'row comment-entry',

        template : template('tpl-discussion-comment'),

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    Views.SubmenuDiscussions = Backbone.View.extend({

        el : '#submenu-discussions',

        events : {
            'click #btn-new-discussion' : 'showAddDiscussion',
            'click #btn-send-discussion' : 'sendDiscussion',
            'keypress #input-question-discussion' : 'evalKeyEnter'
        },

        template : template('tpl-submenu-discussions'),

        initialize : function(){
            this.render();
        },

        render : function(){
            this.$el.empty();
            this.$el.html(this.template());
        },

        showAddDiscussion : function(){
            if(this.$el.hasClass('new-discussion')){
                this.$el.removeClass('new-discussion');
                this.$el.find('#btn-new-discussion').parent().parent().removeClass('submenu-dark-selected');
            }else{
                this.$el.addClass('new-discussion');
                this.$el.find('#btn-new-discussion').parent().parent().addClass('submenu-dark-selected');
                this.$el.find('#input-question-discussion').val('').focus();
            }
        },

        sendDiscussion : function(){
            var self = this;
            var question = this.$el.find('#input-question-discussion').val();
            swal({
                title: 'Seguro de publicar ?' ,
                text: '" ' + question + ' "',
                showCancelButton: true,
                confirmButtonText: 'Sí, Publícalo!',
                closeOnConfirm: false,
                cancelButtonText:'Mejor no'
            }, function(){
                swal({
                    title: "Publicando",
                    imageUrl: "static/img/alert-loader.gif",
                    hideConfirmButton: true
                });

                var discussion = new _Model.discussion();
                discussion.set('question', question);
                discussion.save(null,{
                    success : function(discussion){
                        //aniado la nueva discusion a la coleccion
                        _collection.discussions.add(discussion);
                        //cierro el menu para aniadir discussion
                        self.showAddDiscussion();
                        //muestro alerta satisfactoria
                        swal({
                            title: "Hechó!",
                            type: 'success',
                            timer: 2000
                        });
                    },
                    error : function(){
                        swal({
                            title: "Algo falló, :/ ... vuelve a intentarlo! :)",
                            type: 'error',
                            timer: 3000
                        });
                    }
                });
            });
        },

        evalKeyEnter : function(e){
            if(e.which === 13){
                this.sendDiscussion();
            }
        }
    });
})();
