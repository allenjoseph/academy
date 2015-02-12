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
            'click' : 'clickCourse',
            'click .btn-add-exam' : 'clickAddExam'
        },

        template : template('tpl-course'),

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clickCourse : function(){

        },

        clickAddExam : function(){
            if(!window.app.views.addExamModal){
                window.app.views.addExamModal = new Views.AddExamModal({ model : this.model });
            }else{
                window.app.views.addExamModal.model = this.model
                window.app.views.addExamModal.render();
            }
            window.app.views.addExamModal.openModal();
        }
    });

    Views.CoursePage = Backbone.View.extend({

        el : "#page-course",

        events : {
            'click .btn-add-exam' : 'clickAddExam'
        },

        clickAddExam : function(){
            if(!window.app.views.addExamModal){
                window.app.views.addExamModal = new Views.AddExamModal();
            }else{
                window.app.views.addExamModal.model = this.model
                window.app.views.addExamModal.render();
            }
            window.app.views.addExamModal.openModal();
        }
    });

    Views.AddExamModal = Backbone.View.extend({

        tagName : 'section',

        className : 'remodal remodal-exam light-color bg',

        template : template('tpl-add-exam-modal'),

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
            this.$el.find('.exam-wrapper').remove();
            this.$el.append(this.template(this.model.toJSON()));

            //Add fileUploadComponent
            var fileupload = new Views.FileuploadComponent();
            this.$el.find('.fileupload-content').html(fileupload.render().el);

            return this;
        },

        openModal : function(){
            this.modal.open();
        }
    });

    Views.FileuploadComponent = Backbone.View.extend({

        className : 'fileupload-component',

        template : template('tpl-upload'),

        initialize : function(){
        },

        render : function(){
            var self = this;
            self.$el.empty();
            self.$el.append(self.template());

            var fileUploadWrapper = self.$el;

            self.$el.find('.fileupload').fileupload({
                    url: 'upload/',
                    dataType: 'json',
                    autoUpload: true,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: 5000000, // 5 MB
                }).on('fileuploadadd', function (e, data) {
                    data.context = $('<li/>').appendTo(fileUploadWrapper.find('.file-list'));
                    $.each(data.files, function (index, file) {
                        data.context.append($('<span class="file-name"/>').text(file.name + ' '));
                        data.context.append($('<small class="file-uploading"/>').text('...subiendo'));
                    });
                }).on('fileuploadprocessalways', function (e, data) {
                    var file = data.files[data.index];
                    data.context.find('.file-uploading').remove();
                    if (file.error) {
                        console.log(file.error+':','"'+file.name+'"');
                        data.context.remove();
                    }
                }).on('fileuploadprogressall', function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    fileUploadWrapper.find('.progress .meter').css(
                        'width',
                        progress + '%'
                    );
                }).on('fileuploaddone', function (e, data) {
                    data.context.append($('<small class="text-success"/>').text('cargado'));
                }).on('fileuploadfail', function (e, data) {
                    data.context.append($('<small class="text-success"/>').text('falló'));
                }).prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');

            return self;
        },

        addFile: function(e,data){
            var element = $('<li></li>').append(data.files[0].name)
            data.context = $(this).find('.file-list').append(element);
            data.submit();
        },

        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(this).find('.progress .meter').css(
                'width',
                progress + '%'
            );
        },

        failFile: function(e,data){
            debugger;
        }
    });

})();
