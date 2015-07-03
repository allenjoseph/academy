var React = require('react/addons'),
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
        .on('fileuploaddone', this.doneFile)
        .prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    },

    addFile: function(e,data){
        var file = data.files && data.files.length ? data.files[0] : null;
        if(file){
            file.guid = 'file-' + $.guid++;
            window.dispatchEvent(new CustomEvent('fileuploadadd', { detail: file }));
        }
    },

    processAlwaysFile: function(e, data){
        var file = data.files && data.files.length ? data.files[0] : null;
        if(file){
            window.dispatchEvent(new CustomEvent('fileuploadremove', { detail: file }));
            if (file.error) {
                console.warn('Fileupload fail',file.name,':',file.error);
            }
        }
    },

    doneFile: function(e, data){
        window.dispatchEvent(new CustomEvent('fileuploaddone', { detail: data.result }));
    },

    render: function(){
        return(
            <div className="fileupload-component">
                <input accept="image/*" className="fileupload fileinput-button" type="file" name="file" ref="fileButton" multiple/>
                <FileList />
            </div>
        );
    }
});
