var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'FileList',

    getInitialState: function(){
        return { files: [] };
    },

    componentDidMount: function() {
        window.addEventListener('fileuploadadd', this.filesAdd);
    },

    filesAdd: function(data){
        var newState = React.addons.update(this.state, {
            files: { $push: [data.detail]}
        });
        this.setState(newState);
    },

    render: function(){
        var files = this.state.files.map(function(file){
            return(
                <li key={file.id}>
                    <span className="file-name mr1">{file.name}</span>
                </li>
            );
        });
        return(
            <ul className='file-list no-bullet text-left'>
                {files}
            </ul>
        );
    }
});
