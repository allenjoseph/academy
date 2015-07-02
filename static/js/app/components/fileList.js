var React = require('react');

module.exports = React.createClass({
    displayName: 'FileList',

    getInitialState: function(){
        return { files: [] };
    },

    componentDidMount: function() {
        window.addEventListener('fileuploadadd', this.filesAdd);
    },

    filesAdd: function(data){
        this.setState({ files: data.detail.files });
    },

    render: function(){
        var files = this.state.files.map(function(file){
            debugger;
            <li key={file.id}>
                <span className="file-name mr1">{file.name}</span>
            </li>
        });
        return(
            <ul className='file-list no-bullet text-left'>
                {files}
            </ul>
        );
    }
});
