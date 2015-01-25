# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.core import serializers
from models import Course
from academy.serializers import ObjectSerializer
import json

class IndexView(TemplateView):
    template_name = 'home/index.html'

    def get(self, request, *args, **kwargs):
        self.request.session['student_id'] = 1
        self.request.session['department_id'] = 1
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

class CoursesView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        objectSerializer = ObjectSerializer()
        courses = objectSerializer.serialize(Course.objects.all())
        data = json.dumps(courses)
        return data
