var React = require('react/addons'),
    FileList = require('./fileList'),
    constans = window.ACADEMY.constans;

module.exports = React.createClass({
    displayName: 'Fileupload',

    componentDidMount: function(){
        window.addEventListener('offFileupload', this.offEvents);
    },

    componentWillUnmount: function(){
        window.removeEventListener('offFileupload', this.offEvents);
    },

    addFile: function(e,data){
        var file = data.files && data.files.length ? data.files[0] : null;
        if(file){
            file.guid = 'file-' + $.guid++;
            window.dispatchEvent(new CustomEvent('addFile', { detail: file }));
        }
    },

    processAlwaysFile: function(e, data){
        var file = data.files && data.files.length ? data.files[0] : null;
        if(file){
            window.dispatchEvent(new CustomEvent('removeFile', { detail: file }));
            if (file.error) {
                console.warn('Fileupload fail',file.name,':',file.error);
            }
        }
    },

    doneFile: function(e, data){
        window.dispatchEvent(new CustomEvent('doneFile', { detail: data.result }));
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
        var $fileUpload = $(React.findDOMNode(this.refs.fileButton));
        $fileUpload
        .off('fileuploadadd', this.addFile)
        .off('fileuploadprocessalways', this.processAlwaysFile)
        .off('fileuploaddone', this.doneFile)
    },

    render: function(){
        return(
            <div className="fileupload-component">
                <input accept="image/*" className="fileupload hide" type="file" name="file" ref="fileButton" multiple/>
                <button className="button tiny cancel" onClick={this.openFileExplorer}>Seleccionar fotos del examen</button>
                <FileList />
            </div>
        );
    }
});
