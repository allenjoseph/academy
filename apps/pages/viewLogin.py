# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from apps.home.models import Student
from django.views.decorators.http import require_POST
from django.http import JsonResponse
import json


class LoginView(TemplateView):
    template_name = 'pages/login.html'

    def get(self, request, *args, **kwargs):

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)


@require_POST
def ExistUsername(request):
    params = json.loads(request.body)
    username = params.get('username')
    exist = False

    if username:
        exist = Student.objects.filter(username=username).count() > 0

    return JsonResponse({'exist': exist})
