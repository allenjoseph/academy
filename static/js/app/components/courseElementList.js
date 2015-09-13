var React = require('react'),
    CourseElement = require('./courseElement'),
    Mixins = require('./mixins'),
    _collection = window.ACADEMY.backbone.collection.instances;

module.exports = React.createClass({

    displayName: 'CourseElementList',

    mixins: [Mixins.backboneMixin],

    componentDidMount: function(){
        this.collection.fetch({
            data: $.param({
                course: this.props.academyCourse
            })
        });
    },

    getBackboneModels: function(){
        if(this.props.collection){
            this.collection =  _collection[this.props.collection];
        }
        return [this.collection];
    },

    render: function(){

        var elements;
        if(this.collection && this.collection.map){
            elements = this.collection.map(function (element){
                if(element.attributes.academyCourse){
                    return(
                        <CourseElement key={element.cid}
                            properties={element.attributes}
                            collection={this.props.collection}/>
                    );
                }
            }, this);
        }
        return(
            <div className="large-12 columns">
                {elements}
            </div>
        );
    }
});
