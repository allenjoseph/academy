module.exports = {

    main: Backbone.Router.extend({

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
            var self = this,
                _Model = window.ACADEMY.backbone.model.constructors,
                _Collection = window.ACADEMY.backbone.collection.constructors,
                _collection = window.ACADEMY.backbone.collection.instances;

            _collection.courses = new _Collection.courses();

            if(self.url_root !== '/'){
                var cursoModel = new _Model.course(self.model_root);
                app.views.coursePage = new Views.CoursePage({ model : cursoModel });
                return;
            }

            app.views.submenuDiscussions = new Views.SubmenuDiscussions();
            app.views.addExamModal = new Views.AddExamModal();

            $.get('discussions/?format=json')
                .done(function(data){
                    _collection.discussions = new _Collection.discussions(data);
                    app.views.discussions = new Views.Discussions({collection : _collection.discussions});
                })
                .fail(function(){
                    console.error('fail get Discussions :(');
                });
        }
    })

};
