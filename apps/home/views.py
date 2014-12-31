# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.shortcuts import render_to_response

class IndexView(JsonResponseMixin, TemplateView):
    template_name = 'home/index.html'

class CoursesView(JsonResponseMixin):

    def get_data(self):
        data = {'id':123456}
        return data
