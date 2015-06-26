var React = require('react');

module.exports = React.createClass({
    displayName: 'ExamForm',

    getInitialState: function() {
        return { description : '', placeholder : 'Que examen es, Práctica, Parcial, Final... ?' };
    },

    changeDescription: function(e){
        debugger;
    },

    render: function(){
        return (
            <div className="exam-wrapper">
                <div className="row">
                    <div className="small-12 columns">
                        <h1>Compartir Examen</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns fileupload-content">
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns">
                        <div className="row collapse">
                            <div className="small-10 columns">
                                <input type="text" onChange={this.changeDescription} value={this.state.description} placeholder={this.state.placeholder}/>
                            </div>
                            <div className="small-2 columns">
                                <a id="btn-share-exam" className="button yellow postfix">Compartir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
