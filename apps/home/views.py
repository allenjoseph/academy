# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.core import serializers
from models import Course

class IndexView(JsonResponseMixin, TemplateView):
    template_name = 'home/index.html'

class CoursesView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        data = serializers.serialize('json', Course.objects.all())
        return data
