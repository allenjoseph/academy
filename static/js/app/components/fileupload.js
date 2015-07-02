var React = require('react'),
    FileList = require('./fileList');

module.exports = React.createClass({
    displayName: 'Fileupload',

    componentDidMount: function(){
        this.$fileUpload = $(React.findDOMNode(this.refs.fileButton));
        this.$fileUpload.fileupload({
            url: 'http://127.0.0.1:8000/upload/',
            dataType: 'json',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 5000000, // 5 MB
        })
        .on('fileuploadadd', this.addFile)
        .on('fileuploadprocessalways', this.processAlwaysFile)
        .on('fileuploadprogressall', this.processAllFile)
        .on('fileuploaddone', this.doneFile)
        .on('fileuploadfail', this.failFile)
        .prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    },

    addFile: function(e,data){
        for (var i = 0, len = data.files.length; i < len; i++) {
            data.files[i].id = $.guid++;
        }
        window.dispatchEvent(new CustomEvent('fileuploadadd',{ detail: data }));
    },

    processAlwaysFile: function(e, data){
        var file = data.files[data.index];
        //data.context.find('.file-uploading').remove();
        if (file.error) {
            console.log(file.error+':','"'+file.name+'"');
            //data.context.remove();
        }
    },

    processAllFile: function(e, data){
        /*var progress = parseInt(data.loaded / data.total * 100, 10);
        this.$fileUpload.find('.progress .meter').css(
            'width',
            progress + '%'
        );*/
    },

    doneFile: function(e, data){
        /*var model = data.result.model;
        this
        this.setState({ files: data.files });
        //self.model.get('files').add(model);
        data.context
        .append($('<a class="btn-delete-file text-danger"/>')
        .append('<i class="fa fa-trash-o" data-id="'+model.id+'"></i>'));*/
    },

    failFile: function(e, data){

        /*data.context.append($('<small class="text-success"/>').text('   falló.'));*/
    },

    render: function(){
        return(
            <div className="fileupload-component">
                <input accept="image/*" className="fileupload fileinput-button" type="file" name="file" ref="fileButton" multiple/>
                <div className="progress">
                    <span className="meter"></span>
                </div>
                <FileList />
            </div>
        );
    }
});
