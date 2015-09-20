var React = require('react/addons'),
    constans = require('../commons/constans');

module.exports = React.createClass({
    displayName: 'FileList',

    getInitialState: function(){
        return { files: [] };
    },

    addFile: function(file){
        var newState = React.addons.update(this.state, {
            files: { $push: [file]}
        });
        this.setState(newState);
    },

    removeFile: function(file){
        if(file.id){
            this.props.removeFileId(file.id);
        }
        var pos = this.state.files.indexOf(file);
        var newState = React.addons.update(this.state, {
            files: { $splice: [[pos,1]]}
        });
        this.setState(newState);
    },

    removeFiles: function(){
        var cont = 0;
        this.state.files.map(function(file){
            ++cont;
            if(file.id){
                this.deleteFile(file, cont === this.state.files.length);
            }
        },this);
    },

    reset: function(){
        this.setState(this.getInitialState());
    },

    deleteFile: function(file, isLast){
        var self = this;
        this.removeFile(file);
        $.post(constans.HOST + '/delete/'+file.id)
        .success(function(){
            if(isLast){
                self.reset();
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
