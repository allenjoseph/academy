(function(){
    var routers = Backbone.Router.extend({

        url_root : '/',

        routes : {
            '' : 'index',
            '*otherRoute' : 'default'
        },

        initialize : function(url,model){
            this.url_root = url;
            this.model_root = model;
            Backbone.history.start( { root : this.url_root } );
            //Backbone.emulateJSON = true;
        },

        index : function(){
            this.fetchData();
        },

        courses : function(){
            debugger;
        },

        default : function(otherRoute){
            this.navigate('');
        },

        fetchData : function(){
            var self = this;

            if(self.url_root !== '/'){
                var cursoModel = new Models.Course(self.model_root);
                app.views.coursePage = new Views.CoursePage({ model : cursoModel });
                return;
            }

            app.views.submenuDiscussions = new Views.SubmenuDiscussions();
            app.views.addExamModal = new Views.AddExamModal();

            $.get('courses/?format=json')
                .done(function(data){
                    app.collections.courses = new Collections.Courses(data);
                    app.views.courses = new Views.Courses({collection : app.collections.courses});
                })
                .fail(function(){
                    console.error('fail get Courses :(');
                });
            $.get('discussions/?format=json')
                .done(function(data){
                    app.collections.discussions = new Collections.Discussions(data);
                    app.views.discussions = new Views.Discussions({collection : app.collections.discussions});
                })
                .fail(function(){
                    console.error('fail get Discussions :(');
                });
        }
    });
    window.Routers.App = routers;
})();
