# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.core import serializers
from models import Course
from academy.serializers import ObjectSerializer
import json

class IndexView(JsonResponseMixin, TemplateView):
    template_name = 'home/index.html'

class CoursesView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        objectSerializer = ObjectSerializer()
        courses = objectSerializer.serialize(Course.objects.all())
        data = json.dumps(courses)
        return data
