(function(){

    Views.Courses = Backbone.View.extend({

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
        }

    });

    Views.Course = Backbone.View.extend({

        tagName : 'li',

        events : {
            'click' : 'clickCourse',
            'click .btn-add-exam' : 'clickAddExam'
        },

        template : template('tpl-course'),

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clickCourse : function(){

        },

        clickAddExam : function(){
            if(!window.app.views.addExamModal){
                window.app.views.addExamModal = new Views.AddExamModal({ model : this.model });
            }else{
                window.app.views.addExamModal.model = this.model
                window.app.views.addExamModal.render();
            }
            window.app.views.addExamModal.openModal();
        }

    });

    Views.CoursePage = Backbone.View.extend({

        el : "#page-course",

        events : {
            'click .btn-add-exam' : 'clickAddExam'
        },

        clickAddExam : function(){
            if(!window.app.views.addExamModal){
                window.app.views.addExamModal = new Views.AddExamModal();
            }else{
                window.app.views.addExamModal.model = this.model
                window.app.views.addExamModal.render();
            }
            window.app.views.addExamModal.openModal();
        }
    });

    Views.AddExamModal = Backbone.View.extend({

        tagName : 'section',

        className : 'remodal remodal-exam light-color bg',

        template : template('tpl-add-exam-modal'),

        initialize : function(){
            this.render();
            var options = {
                hashTracking : false,
                closeOnAnyClick : false
            };
            this.$el.remodal(options);
            this.modal = $.remodal.lookup[this.$el.data('remodal')];
        },

        render : function(){
            this.$el.find('.exam-wrapper').remove();
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        },

        openModal : function(){
            this.modal.open();
        }

    });

    Views.UploadComponent = Backbone.View.extend({

        className : 'upload-component',

        template : template('tpl-upload'),

        initialize : function(){
            this.render();
            this.$el.find('form').fileupload({
                add : this.addFile,
                progress : this.progress,
                fail : this.failFile
            });
            this.modal = $.remodal.lookup[this.$el.data('remodal')];
        },

        render : function(){
            this.$el.empty();
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        },

        addFile: function(e,data){
            debugger;
        },

        progress: function(e,data){

        },

        failFile: function(e,data){
            debugger;
        }

    });

})();
