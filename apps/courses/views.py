# -*- encoding: utf-8 -*-
from django.http import JsonResponse
from django.views.generic import View
from academy.mixins import RestServiceMixin
from academy.serializers import ModelSerializer
from models import AcademyCourse


class CoursesView(RestServiceMixin, View):

    def get(self, request, pk=None, **kwargs):
        if pk:
            courses = AcademyCourse.objects.get(pk=pk)
        else:
            courses = AcademyCourse.objects.all()
        academyCourseSerialize = ModelSerializer(courses)

        return JsonResponse(
            academyCourseSerialize.dictModel, safe=False, status=201)
