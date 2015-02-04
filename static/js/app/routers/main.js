(function(){
    var routers = Backbone.Router.extend({

        routes : {
            '' : 'index',
            '*otherRoute' : 'default'
        },

        initialize : function(){
            Backbone.history.start({root: '/'});
            //Backbone.emulateJSON = true;
        },

        index : function(){
            this.fetchData();
        },

        default : function(otherRoute){
            this.navigate('');
        },

        fetchData : function(){
            var self = this;

            app.views.submenuDiscussions = new window.Views.SubmenuDiscussions();

            $.get('courses/?format=json')
                .done(function(data){
                    app.collections.courses = new window.Collections.Courses(data);
                    app.views.courses = new window.Views.Courses({collection : app.collections.courses});
                })
                .fail(function(){
                    console.error('fail get Courses :(');
                });
            $.get('discussions/?format=json')
                .done(function(data){
                    app.collections.discussions = new window.Collections.Discussions(data);
                    app.views.discussions = new window.Views.Discussions({collection : app.collections.discussions});
                })
                .fail(function(){
                    console.error('fail get Discussions :(');
                });
        }
    });
    window.Routers.App = routers;
})();
