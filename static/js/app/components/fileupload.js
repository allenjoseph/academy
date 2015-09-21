var React = require('react/addons'),
    $ = require('jquery'),
    blueimpFileupload = require('blueimp-file-upload'),
    FileList = require('./fileList'),
    constans = require('../commons/constans');

module.exports = React.createClass({
    displayName: 'Fileupload',

    addFile: function(e, data){
        var file = data.files && data.files.length ? data.files[0] : null;
        if(file){
            file.guid = 'file-' + $.guid++;
            this.refs.fileList.addFile(file);
        }
    },

    processAlwaysFile: function(e, data){
        var file = data.files && data.files.length ? data.files[0] : null;
        if(file){
            this.refs.fileList.removeFile(file);
            if (file.error) {
                console.warn('Fileupload fail',file.name,':',file.error);
            }
        }
    },

    doneFile: function(e, data){
        this.refs.fileList.addFile(data.result);
        this.props.addFileId(data.result.id);
    },

    openFileExplorer: function(){
        var $fileUpload = $(React.findDOMNode(this.refs.fileButton));
        $fileUpload.fileupload({
            url: constans.HOST + '/upload/',
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
        $fileUpload.click();
    },

    offEvents: function(){
        this.refs.fileList.reset();

        var $fileUpload = $(React.findDOMNode(this.refs.fileButton));
        $fileUpload
        .off('fileuploadadd', this.addFile)
        .off('fileuploadprocessalways', this.processAlwaysFile)
        .off('fileuploaddone', this.doneFile)
    },

    removeFiles: function(){
        this.refs.fileList.removeFiles();
    },

    render: function(){
        return(
            <div className="fileupload-component">
                <input accept="image/*" className="fileupload hide" type="file" name="file" ref="fileButton" multiple/>
                <button className="button tiny cancel" onClick={this.openFileExplorer}>Seleccionar fotos del examen</button>
                <FileList ref={'fileList'}
                    removeFileId={ this.props.removeFileId }
                    addFileId={ this.props.addFileId }/>
            </div>
        );
    }
});
