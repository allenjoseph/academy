# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from academy.serializers import ObjectSerializer
from models import Course, AcademyCourse
from apps.home.models import AcademyYear
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
            academyCourseDict = objectSerializer.serialize([academyCourse,])
            (academyCourseDict[0])['course'] = objectSerializer.serialize([academyCourse.course,])[0]
            academyCoursesList.append(academyCourseDict[0])

        data = json.dumps(academyCoursesList)
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
            academyYear = AcademyYear.objects.get(year__exact=2015)
            academyCourse = AcademyCourse.objects.get(course=course,academyYear=academyYear)

            context['academyCourse'] = academyCourse

            objectSerializer = ObjectSerializer()
            courses = objectSerializer.serialize([academyCourse,])
            (courses[0])['course'] = objectSerializer.serialize([academyCourse.course,])[0]
            context['academyCourse_json'] = json.dumps(courses[0])

        except MultipleObjectsReturned:
            print('academyCourse not exist')

        return self.render_to_response(context)

