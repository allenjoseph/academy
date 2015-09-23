var React = require('react'),
    $ = require('jquery'),
    CourseElement = require('./courseElement'),
    Mixins = require('./mixins'),
    Collections = require('../collections/collections');


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
            this.collection =  new Collections[this.props.collection]();
        }
        return [this.collection];
    },

    render: function(){

        var elements;
        if(this.collection && this.collection.length){
            elements = this.collection.map(function (element){
                if(element.attributes.academyCourse){
                    return(
                        <CourseElement key={element.cid}
                            properties={element.attributes}
                            collection={this.props.collection}/>
                    );
                }
            }, this);
        }else{
            elements = <span>Sin registros</span>;
        }
        return(
            <div className="large-12 columns">
                {elements}
            </div>
        );
    }
});
