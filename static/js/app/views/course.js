(function(){

    Views.Courses = Backbone.View.extend({
        /*
        el : '#content-courses',

        initialize : function(){
            this.render();
            this.listenTo( this.collection, 'add', this.renderCourse );
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(course){
                this.renderCourse(course);
            }, this);
            return this;
        },

        renderCourse : function( course ){
            var view = new Views.Course({ model : course });
            this.$el.append(view.render().el);
        }*/
    });

    Views.Course = Backbone.View.extend({
        /*
        tagName : 'li',

        events : {
            'click .course-name' : 'clickCourse',
            'click .btn-add-exam' : 'clickAddExam'
        },

        template : template('tpl-course'),

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clickCourse : function(){
            window.location.href = '/courses/'+ this.model.get('course').slug;
        },

        clickAddExam : function(){
            window.app.views.addExamModal.initModal(this.model);
            window.app.views.addExamModal.openModal();
        }*/
    });

    Views.CoursePage = Backbone.View.extend({
        /*
        el : "#page-course",

        events : {
            'click .btn-add-exam' : 'clickAddExam'
        },

        initialize : function(){
            if(!window.app.views.addExamModal){
                window.app.views.addExamModal = new Views.AddExamModal();
            }
        },

        clickAddExam : function(){
            window.app.views.addExamModal.initModal(this.model);
            window.app.views.addExamModal.openModal();
        }*/
    });

})();
