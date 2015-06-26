(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

window.ACADEMY = window.ACADEMY || {};
window.ACADEMY.utilities = require('./utilities');

window.ACADEMY.utilities.namespace('constans');
window.ACADEMY.utilities.namespace('backbone.model.constructors');
window.ACADEMY.utilities.namespace('backbone.model.instances');
window.ACADEMY.utilities.namespace('backbone.collection.constructors');
window.ACADEMY.utilities.namespace('backbone.collection.instances');
window.ACADEMY.utilities.namespace('backbone.router.constructors');
window.ACADEMY.utilities.namespace('backbone.router.instances');

window.ACADEMY.backbone.model.constructors = require('./models/models');
window.ACADEMY.backbone.collection.constructors = require('./collections/collections');
window.ACADEMY.backbone.router.constructors = require('./routers/main');

/*---------------------------------------------------------*/
window.Views = {};
window.app = {};
window.app.views = {};
window.template = function(id){
    return _.template( $( '#' + id ).html() );
};
/*---------------------------------------------------------*/

/* Objects prototype extensions */
if(!String.prototype.trim){
    (function(){
        String.prototype.trim = function(){
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
        };
    })();
}

/* Dependencies configurations */
moment.locale('es');

},{"./collections/collections":2,"./models/models":3,"./routers/main":4,"./utilities":5}],2:[function(require,module,exports){
var models = require('../models/models');

module.exports = {

    courses: Backbone.Collection.extend({
        model : models.course,
        url: 'courses/?format=json'
    }),

    discussions: Backbone.Collection.extend({
        model : models.discussion,
        url: 'discussions/?format=json'
    }),

    comments: Backbone.Collection.extend({
        model : models.comment
    }),

    attachments: Backbone.Collection.extend({
        model : models.attachment
    })

};

},{"../models/models":3}],3:[function(require,module,exports){
module.exports = {

    course: Backbone.Model.extend(),

    discussion: Backbone.Model.extend({
        urlRoot : '/discussion'
    }),

    comment: Backbone.Model.extend({
        urlRoot : '/comment'
    }),

    exam: Backbone.Model.extend({
        urlRoot : '/exam'
    }),

    attachment: Backbone.Model.extend()
};

},{}],4:[function(require,module,exports){
module.exports = {

    main: Backbone.Router.extend({

        url_root : '/',

        routes : {
            '' : 'index',
            '*otherRoute' : 'default'
        },

        initialize : function(url,model){
            this.url_root = url;
            this.model_root = model;
            Backbone.history.start( { root : this.url_root } );
            //Backbone.emulateJSON = true;
        },

        index : function(){
            this.fetchData();
        },

        courses : function(){
            debugger;
        },

        default : function(otherRoute){
            this.navigate('');
        },

        fetchData : function(){
            var self = this,
                _Model = window.ACADEMY.backbone.model.constructors,
                _Collection = window.ACADEMY.backbone.collection.constructors,
                _collection = window.ACADEMY.backbone.collection.instances;

            _collection.courses = new _Collection.courses();
            _collection.discussions = new _Collection.discussions();

            if(self.url_root !== '/'){
                var cursoModel = new _Model.course(self.model_root);
                app.views.coursePage = new Views.CoursePage({ model : cursoModel });
                return;
            }

            app.views.submenuDiscussions = new Views.SubmenuDiscussions();
            //app.views.addExamModal = new Views.AddExamModal();
        }
    })

};

},{}],5:[function(require,module,exports){
module.exports = {
    namespace: function(route){
        if( typeof route !== 'string'  || !route.length) return;

        var parts = route.split('.'),
            parent = window.ACADEMY;
        if (parts[0] === 'ACADEMY'){
            parts = parts.slice(1);
        }
        for (var i = 0, len = parts.length; i < len; i++) {
            if (typeof parent[parts[i]] === 'undefined'){
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    }
};

},{}],6:[function(require,module,exports){
(function(){

    Views.Courses = Backbone.View.extend({

        el : '#content-courses',

        initialize : function(){
            this.render();
            this.listenTo( this.collection, 'add', this.renderCourse );
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(course){
                this.renderCourse(course);
            }, this);
            return this;
        },

        renderCourse : function( course ){
            var view = new Views.Course({ model : course });
            this.$el.append(view.render().el);
        }
    });

    Views.Course = Backbone.View.extend({

        tagName : 'li',

        events : {
            'click .course-name' : 'clickCourse',
            'click .btn-add-exam' : 'clickAddExam'
        },

        template : template('tpl-course'),

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clickCourse : function(){
            window.location.href = '/courses/'+ this.model.get('course').slug;
        },

        clickAddExam : function(){
            window.app.views.addExamModal.initModal(this.model);
            window.app.views.addExamModal.openModal();
        }
    });

    Views.CoursePage = Backbone.View.extend({

        el : "#page-course",

        events : {
            'click .btn-add-exam' : 'clickAddExam'
        },

        initialize : function(){
            if(!window.app.views.addExamModal){
                window.app.views.addExamModal = new Views.AddExamModal();
            }
        },

        clickAddExam : function(){
            window.app.views.addExamModal.initModal(this.model);
            window.app.views.addExamModal.openModal();
        }
    });

})();

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
(function () {

    var _Collection = window.ACADEMY.backbone.collection.constructors,
        _Model = window.ACADEMY.backbone.model.constructors;

    Views.AddExamModal = Backbone.View.extend({

        tagName : 'section',

        className : 'remodal remodal-exam light-color bg',

        ui : {
            exam : '.exam-wrapper',
            fileupload : '.fileupload-content',
            description : '#input-exam-description'
        },

        events: {
            'click #btn-share-exam':'shareExamen'
        },

        template : template('tpl-add-exam-modal'),

        initialize : function(){
            this.$el.append(this.template());
            this.refreshUi();

            var options = {
                hashTracking : false,
                closeOnAnyClick : false
            };
            this.$el.remodal(options);
            this.modal = $.remodal.lookup[this.$el.data('remodal')];
        },

        initModal : function(model){
            this.model = model;//Course model
            //Add fileUploadComponent
            var fileupload = new Views.FileuploadComponent({model:this.model});
            this.ui.fileupload.html(fileupload.render().el);

            return this;
        },

        openModal : function(){
            this.modal.open();
        },

        shareExamen : function(){
            debugger;

            var files = this.model.get('files');

            var exam = new _Model.exam();
            exam.set('course', this.model.id);
            exam.set('description', this.ui.description.val());
            exam.set('files', files.pluck("id"));

            exam.save(null,{
                success : function(exam){
                    debugger;
                },
                error : function(){
                    debugger;
                }
            });
        }
    });

    Views.FileuploadComponent = Backbone.View.extend({

        className : 'fileupload-component',

        template : template('tpl-upload'),

        events : {
            'click .btn-delete-file' : 'deleteFile'
        },

        options : {
            url: 'http://127.0.0.1:8000/upload/',
            dataType: 'json',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 5000000, // 5 MB
        },

        initialize : function(){
            this.model.set('files' , new _Collection.attachments());
        },

        render : function(){
            var self = this;
            self.$el.empty();
            self.$el.append(self.template());

            var fileUploadWrapper = self.$el;

            self.$el.find('.fileupload').fileupload(self.options)
                .on('fileuploadadd', function(e,data){
                    data.context = $('<li/>').appendTo(fileUploadWrapper.find('.file-list'));
                    $.each(data.files, function (index, file) {
                        data.context.append($('<span class="file-name mr1"/>').text(file.name));
                        data.context.append($('<small class="file-uploading"/>').text('   ...subiendo'));
                    });
                })
                .on('fileuploadprocessalways', function(e,data){
                    var file = data.files[data.index];
                    data.context.find('.file-uploading').remove();
                    if (file.error) {
                        console.log(file.error+':','"'+file.name+'"');
                        data.context.remove();
                    }
                })
                .on('fileuploadprogressall', function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    fileUploadWrapper.find('.progress .meter').css(
                        'width',
                        progress + '%'
                    );
                })
                .on('fileuploaddone', function(e,data){
                    var model = data.result.model;
                    self.model.get('files').add(model);
                    data.context.append($('<a class="btn-delete-file text-danger"/>').append('<i class="fa fa-trash-o" data-id="'+model.id+'"></i>'));
                })
                .on('fileuploadfail', function(e,data){
                    data.context.append($('<small class="text-success"/>').text('   falló.'));
                })
                .prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');

            return self;
        },

        deleteFile: function(e){
            var self = this;
            var fileID = $(e.target).data('id');

            $.post('http://127.0.0.1:8000/delete/'+fileID)
                .done(function(data){
                    var collection = self.model.get('files');
                    var model = collection.get(fileID);
                    collection.remove(model);
                    self.$el.find('.file-list > li > a > i[data-id="'+fileID+'"]').parent().parent().remove();
                })
                .fail(function(){
                    console.error('fail delete file :(');
                });
        }
    });

})();

},{}]},{},[1,5,3,2,6,7,8,4]);
