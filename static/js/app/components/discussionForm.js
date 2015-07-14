var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'DiscussionForm',

    render: function(){
        return(
            <div className="row">
                <div className="large-12 columns">
                    <div className="row border-bottom-dark">
                        <div className="small-8 columns">
                            <div className="row">
                                <div className="small-12 medium-3 columns menu-link">
                                    <h3><a id="btn-new-discussion">NUEVA</a></h3>
                                </div>
                                <div className="small-12 medium-3 columns end menu-link">
                                    <h3><a id="btn-search-discussion">BUSCAR</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="form-add-discussion" className="row border-bottom-dark">
                        <div className="small-12 columns">
                            <div className="row collapse">
                                <div className="small-10 columns">
                                    <input id="input-question-discussion" type="text" placeholder="Escribe tu pregunta aquí."/>
                                </div>
                                <div className="small-2 columns">
                                    <a id="btn-send-discussion" className="button yellow postfix">Enviar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
