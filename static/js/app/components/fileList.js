var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'FileList',

    getInitialState: function(){
        return { files: [] };
    },

    componentDidMount: function() {
        window.addEventListener('fileuploadadd', this.addFile);
        window.addEventListener('fileuploadremove', this.removeFile);
        window.addEventListener('fileuploadremoveall', this.removeAllFiles);

        window.addEventListener('fileuploaddone', this.addFile);
    },

    componentWillUnmount: function(){
        window.removeEventListener('fileuploadadd', this.addFile);
        window.removeEventListener('fileuploadremove', this.removeFile);
        window.removeEventListener('fileuploadremoveall', this.removeAllFiles);
    },

    addFile: function(data){
        var newState = React.addons.update(this.state, {
            files: { $push: [data.detail]}
        });
        this.setState(newState);
    },

    removeFile: function(data){
        if(data.id){
            window.dispatchEvent(new CustomEvent('removeFileFromExam', { detail: data.id }));
        }
        var pos = this.state.files.indexOf(data.detail || data);
        var newState = React.addons.update(this.state, {
            files: { $splice: [[pos,1]]}
        });
        this.setState(newState);
    },

    removeAllFiles: function(){
        this.state.files.map(function(file){
            if(file.id){
                this.deleteFile(file);
            }else if(file.guid){
                this.removeFile(file)
            }
        },this);
    },

    deleteFile: function(file){
        this.removeFile(file);
        $.post('http://127.0.0.1:8000/delete/'+file.id)
        .fail(function(){
            console.error('fail delete file :(');
        });
    },

    render: function(){
        var files = this.state.files.map(function(file){
            if(file.name && (file.id || file.guid)){
                var icon = !file.id
                                ? <i className="fa fa-cog fa-spin"></i>
                                : <a className="btn-delete-file text-danger" onClick={this.deleteFile.bind(this,file)}>
                                    <i className="fa fa-trash-o"></i>
                                </a>;
                return(
                    <li key={ file.id || file.guid } className="file-element">
                        <span className="file-name">
                            <span className="prs">
                                {icon}
                            </span>
                            {file.name}
                        </span>
                    </li>
                );
            }
        },this);
        return(
            <ul className={ !this.state.files.length ? 'hide' : 'file-list no-bullet text-left' }>
                {files}
            </ul>
        );
    }
});
