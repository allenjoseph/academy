# -*- encoding: utf-8 -*-
from models import Attachment
from academy.serializers import ModelSerializer
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import UploadedFile
from django.http import HttpResponse, JsonResponse
import os


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
