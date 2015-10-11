# -*- encoding: utf-8 -*-
from models import Attachment, Student, Department
from models import University, Faculty
from academy.serializers import ModelSerializer
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import UploadedFile
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from academy.mixins import RestServiceMixin
import os
import json


class StudentView(RestServiceMixin, View):
    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)

        department = Department.objects.get(
            pk=params.get('department'))

        student = Student.objects.create(
            name=params.get('name'),
            lastname=params.get('lastname'),
            department=department,
            username=params.get('username'),
            password=params.get('password'),
            email=params.get('email'))

        dictStudent = ModelSerializer(student).dictModel
        return JsonResponse(dictStudent)


@csrf_exempt
@require_POST
def UploadFile(request):

    fileTemp = request.FILES['file'] if request.FILES else None

    if fileTemp is None:
        return HttpResponse(status=request.status)

    # obtenemos el archivo
    fileUploaded = UploadedFile(fileTemp)

    # guardamos el archivo.
    attachment = Attachment()
    attachment.name = unicode(fileUploaded.name)
    attachment.size = fileUploaded.file.size
    attachment.attachment = fileUploaded
    attachment.save()

    dictElementAttachment = ModelSerializer(attachment).dictModel
    return JsonResponse(dictElementAttachment)


@csrf_exempt
@require_POST
def DeleteUploadedFile(request, pk):
    success = False
    try:
        # obtenemos la instancia del archivo
        instance = Attachment.objects.get(pk=pk)
        # eliminamos el archivo fisico
        os.unlink(instance.attachment.path)
        # borramos la instancia de bd
        instance.delete()
        success = True
    except Attachment.DoesNotExist:
        success = False

    return JsonResponse({'success': success})


@csrf_exempt
def Universities(request):

    universities = University.objects.all()
    dictUniversities = ModelSerializer(universities).dictModel

    return JsonResponse(dictUniversities, safe=False)


@csrf_exempt
def Faculties(request, university):

    faculties = Faculty.objects.filter(university__id=university)
    dictFaculties = ModelSerializer(faculties).dictModel

    return JsonResponse(dictFaculties, safe=False)


@csrf_exempt
def Departments(request, faculty):

    departments = Department.objects.filter(faculty__id=faculty)
    dictDepartments = ModelSerializer(departments).dictModel

    return JsonResponse(dictDepartments, safe=False)
