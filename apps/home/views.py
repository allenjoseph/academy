# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from django.core import serializers
from models import Course, Student, Department
from academy.serializers import ObjectSerializer
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import UploadedFile
from django.http import JsonResponse
import json

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
        print(department)
        print(slug)

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

@csrf_exempt
@require_POST
def UploadFile(request):

    fileTemp = request.FILES['file'] if request.FILES else None

    if fileTemp == None:
        return HttpResponse(status=e.status)

    #cargamos la imagen al server.

    #devolvemos los datos de la imagen
    fileUploaded = UploadedFile(fileTemp)
    data = {
        'name': str(fileUploaded.name),
        'size': str(fileUploaded.file.size),
        'url':'',
        'delete_url':'delete/',
        'delete_type':'POST',
    }

    # file_dict = {
    #     'name' : file.path,
    #     'size' : file.size,

    #     'url': settings.MEDIA_URL + basename,
    #     'thumbnailUrl': settings.MEDIA_URL + basename,

    #     'deleteUrl': reverse('jfu_delete', kwargs = { 'pk': instance.pk }),
    #     'deleteType': 'POST',
    # }

    # files = file_dict if isinstance( file_dict, list ) else [ file_dict ]
    # data  = { 'files' : files }

    return JsonResponse(data)

@require_POST
def DeleteUploadedFile(request, pk):
    data = {
        'success' : True
    }
    # try:
    #     instance = YOURMODEL.objects.get( pk = pk )
    #     os.unlink( instance.file.path )
    #     instance.delete()
    # except YOURMODEL.DoesNotExist:
    #     success = False

    return JsonResponse(data)

