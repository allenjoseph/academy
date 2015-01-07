(function(){
    var routers = Backbone.Router.extend({

        routes : {
            '' : 'index',
            '*otherRoute' : 'default'
        },

        initialize : function(){
            Backbone.history.start({root: '/'});
        },

        index : function(){
            this.fetchData();
        },

        default : function(otherRoute){
            this.navigate('');
        },

        fetchData : function(){
            var self = this;
            $.get('courses?format=json')
                .done(function(data){
                    data = self.formatModelObject(data);
                    app.collections.courses = new window.Collections.Courses(data);
                    app.views.courses = new window.Views.Courses({collection : app.collections.courses});
                })
                .fail(function(){
                    console.error('fail :(');
                });
        },
        formatModelObject: function(array){
            if(array && array.length){
                var arrayFormated = [];
                for (var i = array.length - 1; i >= 0; i--) {
                    if(array[i].fields && array[i].pk){
                        var elem = array[i].fields;
                        elem.id = array[i].pk;
                        arrayFormated.push(elem);
                    }
                }
                return arrayFormated;
            }
        }
    });
    window.Routers.App = routers;
})();
