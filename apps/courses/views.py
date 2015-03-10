# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from academy.serializers import ObjectSerializer
from models import Course

class CoursesView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        objectSerializer = ObjectSerializer()
        courses = objectSerializer.serialize(Course.objects.all())
        data = json.dumps(courses)
        return data

class CourseView(TemplateView):
    template_name = 'home/course.html'

    def get(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        department = request.session['department_id']

        context = self.get_context_data(**kwargs)

        #obtengo el curso y lo devuelvo a la vista
        try:
            course = Course.objects.get(slug__exact=slug, department__id=department)

            context['course'] = course

            objectSerializer = ObjectSerializer()
            courses = objectSerializer.serialize([course,])
            context['course_json'] = json.dumps(courses[0])

        except MultipleObjectsReturned:
            print('course not exist')

        return self.render_to_response(context)

