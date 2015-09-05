# -*- encoding: utf-8 -*-
from django.views.generic import View
from academy.mixins import RestServiceMixin
from models import Exam, ExamAttachment
from apps.home.models import Student, Attachment
from apps.courses.models import AcademyCourse
from django.http import JsonResponse
from academy.serializers import ModelSerializer
import json


class ExamView(RestServiceMixin, View):

    def get(self, request, pk=None, **kwargs):
        courseId = request.GET.get('course', None)
        if courseId:
            exams = Exam.objects.filter(
                academyCourse__id=courseId)
        elif pk:
            exams = Exam.objects.get(pk=pk)
        else:
            exams = Exam.objects.all()
        examSerialize = ModelSerializer(exams)

        return JsonResponse(examSerialize.dictModel, safe=False, status=201)

    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)

        student = Student.objects.get(
            pk=request.session['student_id'])
        academyCourse = AcademyCourse.objects.get(
            pk=params.get('academyCourse'))
        files = params.get('files')

        exam = Exam.objects.create(
            description=params.get('description'),
            academyCourse=academyCourse,
            student=student)

        for file_id in files:
            ExamAttachment.objects.create(
                exam=exam,
                attachment=Attachment.objects.get(pk=file_id))

        dictExam = ModelSerializer(exam).dictModel

        return JsonResponse(dictExam, status=201)
