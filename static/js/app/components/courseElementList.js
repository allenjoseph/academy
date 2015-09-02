var React = require('react'),
    CourseElement = require('./courseElement'),
    Mixins = require('./mixins'),
    _collection = window.ACADEMY.backbone.collection.instances;

module.exports = React.createClass({
    displayName: 'CourseElementList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function(){
        this.collection.fetch();
    },

    getBackboneModels: function(){
        if(this.props.elementType){
            this.collection =  _collection[this.props.elementType];
        }
        return [this.collection];
    },

    render: function(){

        var elements;
        if(this.collection && this.collection.map){
            elements = this.collection.map(function (element){
                return(
                    <CourseElement key={element.cid} properties={element.attributes}/>
                );
            });
        }
        return(
            <div className="row">
                <div className="large-12 columns">
                    <ul className="small-block-grid-3 medium-block-grid-6 large-block-grid-6">
                        {elements}
                    </ul>
                </div>
            </div>
        );
    }
});
