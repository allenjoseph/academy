# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin

class IndexView(JsonResponseMixin, TemplateView):
    template_name = 'home/index.html'