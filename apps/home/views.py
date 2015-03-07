# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.core import serializers
from models import Course, Student, Department, Attachment
from academy.serializers import ObjectSerializer
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import UploadedFile
from django.http import JsonResponse
import json
import os

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

class CourseView(TemplateView):
    template_name = 'home/course.html'

    def get(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        department = request.session['department_id']
        
        #obtengo el curso y lo devuelvo a la vista

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

@csrf_exempt
@require_POST
def UploadFile(request):

    fileTemp = request.FILES['file'] if request.FILES else None

    if fileTemp == None:
        return HttpResponse(status=e.status)

    #obtenemos la imagen
    fileUploaded = UploadedFile(fileTemp)

    #guardamos la imagen.
    attachment = Attachment()
    attachment.title=str(fileUploaded.name)
    attachment.attachment=fileUploaded
    attachment.save()

    #json de la instancia guardada
    objectSerializer = ObjectSerializer()
    dictElementAttachment = objectSerializer.serialize([attachment])[0]

    data = {
        'name': str(fileUploaded.name),
        'size': str(fileUploaded.file.size),
        'model': dictElementAttachment
    }

    return JsonResponse(data)

@csrf_exempt
@require_POST
def DeleteUploadedFile(request, pk):
    success = False;
    try:
        instance = Attachment.objects.get( pk = pk )
        os.unlink( instance.attachment.path )
        instance.delete()
        success = True
    except Attachment.DoesNotExist:
        success = False

    return JsonResponse({'success' : success})

