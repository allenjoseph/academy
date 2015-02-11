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

            var uploadButton = $('<button/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });

            self.$el.find('.fileupload').fileupload({
                    url: 'upload/',
                    dataType: 'json',
                    autoUpload: true,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: 5000000, // 5 MB
                    // Enable image resizing, except for Android and Opera,
                    // which actually support image resizing, but fail to
                    // send Blob objects via XHR requests:
                    disableImageResize: /Android(?!.*Chrome)|Opera/
                        .test(window.navigator.userAgent),
                    previewMaxWidth: 100,
                    previewMaxHeight: 100,
                    previewCrop: true
                }).on('fileuploadadd', function (e, data) {
                    debugger;
                    data.context = fileUploadWrapper.find('.file-list');
                    $.each(data.files, function (index, file) {
                        var node = $('<li/>').append($('<span/>').text(file.name));
                        if (!index) {
                            node.append(uploadButton.clone(true).data(data));
                        }
                        node.appendTo(data.context);
                    });
                }).on('fileuploadprocessalways', function (e, data) {
                    debugger;
                    var index = data.index,
                        file = data.files[index],
                        node = $(data.context.children()[index]);
                    if (file.preview) {
                        node.prepend(file.preview);
                    }
                    if (file.error) {
                        node.append($('<span class="text-danger"/>').text(file.error));
                    }
                    if (index + 1 === data.files.length) {
                        data.context.find('button')
                            .text('Upload')
                            .prop('disabled', !!data.files.error);
                    }
                }).on('fileuploadprogressall', function (e, data) {
                    debugger;
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    fileUploadWrapper.find('.progress .meter').css(
                        'width',
                        progress + '%'
                    );
                }).on('fileuploaddone', function (e, data) {
                    debugger;
                    $.each(data.result.files, function (index, file) {
                        if (file.url) {
                            var link = $('<a>')
                                .attr('target', '_blank')
                                .prop('href', file.url);
                            $(data.context.children()[index])
                                .wrap(link);
                        } else if (file.error) {
                            var error = $('<span class="text-danger"/>').text(file.error);
                            $(data.context.children()[index]).append(error);
                        }
                    });
                }).on('fileuploadfail', function (e, data) {
                    debugger;
                    $.each(data.files, function (index) {
                        var error = $('<span class="text-danger"/>').text('File upload failed.');
                        $(data.context.children()[index]).append(error);
                    });
                }).prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');
/*
            this.$el.find('form').fileupload({
                add : this.addFile,
                progressall : this.progressall,
                fail : this.failFile
            });*/
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
