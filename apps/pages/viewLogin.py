# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from apps.home.models import Student
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse


class LoginView(TemplateView):
    template_name = 'pages/login.html'


@csrf_exempt
@require_POST
def ExistUsername(request):

    username = request.POST['username']
    exist = False

    if username:
        exist = Student.objects.filter(username=username).count() > 0

    return JsonResponse({'exist': exist})


@csrf_exempt
@require_POST
def ValidateUser(request):

    success = False
    token = ''
    username = request.POST['username']
    password = request.POST['password']

    if username is not None and password is not None:
        try:
            student = Student.objects.get(username=username)
            encoded = student.password
            if check_password(password, encoded):
                success = True
                token = make_password(encoded)
                request.session['token'] = token
        except:
            pass

    return JsonResponse({'success': success, 'token': token})
