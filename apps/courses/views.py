# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from academy.serializers import ObjectSerializer
from models import AcademyCourse
import json
from django.core.exceptions import MultipleObjectsReturned


class CoursesView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):

        academyCourses = AcademyCourse.objects.all()
        academyCoursesList = []
        objectSerializer = ObjectSerializer()

        for academyCourse in academyCourses:
            academyCourseDict = objectSerializer.serialize([academyCourse])[0]
            academyCourseDict['course'] = objectSerializer.serialize(
                [academyCourse.course])[0]
            academyCoursesList.append(academyCourseDict)

        data = json.dumps(academyCoursesList)
        return data


class CourseView(TemplateView):
    template_name = 'home/course.html'

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)

        # obtengo el curso y lo devuelvo a la vista
        try:
            academyCourse = AcademyCourse.objects.get(
                course__slug__exact=kwargs.get('slug'),
                course__department__id=request.session['department_id'],
                academyYear__id=request.session['academyYear_id'])

            objectSerializer = ObjectSerializer()
            academyCourseDict = objectSerializer.serialize([academyCourse])[0]
            academyCourseDict['profesor'] = objectSerializer.serialize(
                [academyCourse.profesor])[0]
            academyCourseDict['course'] = objectSerializer.serialize(
                [academyCourse.course])[0]
            academyCourseDict['figures'] = {
                'studentsEnrolled': 10,
                'studentsOnline': 5,
                'exams': 0,
                'meetings': 0,
                'aid': 0,
                'discussions': 1,
                'homeworks': 0
            }

            context['academyCourseInfo'] = json.dumps(academyCourseDict)

        except MultipleObjectsReturned:
            print('academyCourse problem')

        return self.render_to_response(context)
