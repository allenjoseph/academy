# -*- encoding: utf-8 -*-
from django.views.generic import View
from academy.mixins import RestServiceMixin
from models import Exam, ExamAttachment
from apps.home.models import Student, Attachment
from apps.courses.models import AcademyCourse
from django.http import JsonResponse
from academy.serializers import ObjectSerializer
import json

class ExamView(RestServiceMixin, View):

    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)

        student = Student.objects.get(pk=request.session['student_id'])
        academyCourse = AcademyCourse.objects.get(pk=params.get('course'))
        files = params.get('files')

        exam = Exam.objects.create(
            description = params.get('description'),
            academyCourse = academyCourse,
            student = student)

        for file_id in files:
            ExamAttachment.create(
                exam = exam,
                attachment = Attachment.objects.get(pk=file_id))

        objectSerializer = ObjectSerializer()
        dictElementStudent = objectSerializer.serialize([student])[0]
        dictElementExam = objectSerializer.serialize([exam])[0]
        dictElementExam['student'] = dictElementStudent

        jsonExam = json.dumps(dictElementExam)

        return JsonResponse(json.loads(jsonExam),safe=False,status=201)
