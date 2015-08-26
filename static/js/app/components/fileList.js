var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'FileList',

    getInitialState: function(){
        return { files: [] };
    },

    componentDidMount: function() {
        window.addEventListener('addFile', this.addFile);
        window.addEventListener('removeFile', this.removeFile);
        window.addEventListener('removeAllFiles', this.removeAllFiles);
        window.addEventListener('resetFileUpload', this.resetComponent);
    },

    componentWillUnmount: function(){
        window.removeEventListener('addFile', this.addFile);
        window.removeEventListener('removeFile', this.removeFile);
        window.removeEventListener('removeAllFiles', this.removeAllFiles);
        window.removeEventListener('resetFileUpload', this.resetComponent);
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
        var cont = 0;
        this.state.files.map(function(file){
            ++cont;
            if(file.id){
                this.deleteFile(file, cont === this.state.files.length);
            }
        },this);
    },

    resetComponent: function(){
        this.setState(this.getInitialState());
    },

    deleteFile: function(file, isLast){
        var self = this;
        this.removeFile(file);
        $.post('http://127.0.0.1:8000/delete/'+file.id)
        .success(function(){
            if(isLast){
                self.resetComponent();
            }
        })
        .fail(function(){
            console.error('fail delete file :(');
        });
    },

    render: function(){
        var files = this.state.files.map(function(file){
            if(file.name && (file.id || file.guid)){
                var icon = !file.id
                                ? <a><i className="fa fa-cog fa-spin"></i></a>
                                : <a className="btn-delete-file" onClick={this.deleteFile.bind(this,file)}>
                                    <i className="fa fa-trash-o"></i>
                                </a>;
                return(
                    <li key={ file.id || file.guid } className="file-element">
                        <span>
                            {icon}
                        </span>
                        <span className="file-name">
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
