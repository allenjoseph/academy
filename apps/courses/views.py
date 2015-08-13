# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from academy.serializers import ModelSerializer
from models import AcademyCourse
from django.core.exceptions import MultipleObjectsReturned


class CoursesView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        academyCourses = AcademyCourse.objects.all()
        academyCourseSerialize = ModelSerializer(academyCourses)
        return academyCourseSerialize.getJSON()


class CourseView(TemplateView):
    template_name = 'home/course.html'

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)

        try:
            academyCourse = AcademyCourse.objects.get(
                course__slug__exact=kwargs.get('slug'),
                course__department__id=request.session['department_id'],
                academyYear__id=request.session['academyYear_id'])

            academyCourseSerialize = ModelSerializer(academyCourse)
            academyCourseSerialize.dictModel['figures'] = {
                'studentsEnrolled': 10,
                'studentsOnline': 5,
                'exams': 0,
                'meetings': 0,
                'aid': 0,
                'discussions': 1,
                'homeworks': 0
            }

            context['academyCourseInfo'] = academyCourseSerialize.getJSON()

        except MultipleObjectsReturned:
            print('academyCourse problem')

        return self.render_to_response(context)
