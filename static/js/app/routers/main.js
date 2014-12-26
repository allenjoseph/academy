(function(){
    var routers = Backbone.Router.extend({

        routes : {
            '' : 'index',
            '*otherRoute' : 'default'
        },

        initialize : function(){
            app.views.layout = new Views.Layout();
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
            $.get('courses')
                .done(function(data){
                    app.collections.courses = new window.Collections.Menus(data.courses);
                    app.views.courses = new window.Views.Courses({collection : app.collections.courses});
                })
                .fail(function(){
                    console.error('fail :(');
                });
        }
    });
    window.Routers.App = routers;
})();
