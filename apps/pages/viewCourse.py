# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from django.core.exceptions import MultipleObjectsReturned
from academy.serializers import ModelSerializer
from apps.courses.models import AcademyCourse


class CourseView(TemplateView):
    template_name = 'pages/course.html'

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
            if self.request is not None:
                academyCourse_id = academyCourseSerialize.dictModel['id']
                self.request.session['academyCourse_id'] = academyCourse_id

        except MultipleObjectsReturned:
            print('academyCourse problem')

        return self.render_to_response(context)
