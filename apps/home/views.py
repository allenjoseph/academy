# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.shortcuts import render_to_response

class IndexView(JsonResponseMixin, TemplateView):
    template_name = 'home/index.html'

class CoursesView(JsonResponseMixin):
	return render_to_response({'id':123456});
