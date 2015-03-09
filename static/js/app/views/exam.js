(function () {

    Views.AddExamModal = Backbone.View.extend({

        tagName : 'section',

        className : 'remodal remodal-exam light-color bg',

        ui : {
            exam : '.exam-wrapper',
            fileupload : '.fileupload-content'
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
            this.model = model;
            //Add fileUploadComponent
            var fileupload = new Views.FileuploadComponent({model:this.model});
            this.ui.fileupload.html(fileupload.render().el);

            return this;
        },

        openModal : function(){
            this.modal.open();
        },

        shareExamen : function(){

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
            this.model.set('files' , new window.Collections.Attachments());
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
