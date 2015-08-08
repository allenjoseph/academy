from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from flufl.enum import IntEnum


class StateEnum(IntEnum):
    ACTIVO = 1


class LoginRequiredMixin(object):

    @method_decorator(login_required(login_url='/login/'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(request, *args, **kwargs)


class JsonResponseMixin(object):

    def response_handler(self):
        format = self.request.GET.get('format', None)
        if format == 'json':
            return self.json_to_response()

        context = self.get_context_data()
        return self.render_to_response(context)

    def json_to_response(self):
        data = self.get_data()
        return JsonResponse(json.loads(data), safe=False)


class HttpError(Exception):
    def __init__(self, message=None, status=500):
        super(HttpError, self).__init__(message)
        self.status = status

    def __repr__(self):
        return 'HttpError(%r, %r)' % (self.status, self.message)


class RestServiceMixin(object):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        method = request.method
        request.method = 'POST'
        request._load_post_and_files()
        method_override = None

        if request.POST and request.POST.get('_method', None):
            request.POST._mutable = True
            method_override = request.POST.pop('_method')[0].upper()
            request.POST._mutable = False

        # asigno el request method en post
        request.method = method_override or method

        # le asigno los valores del request al metodo post
        if request.method not in ['POST', 'GET']:
            setattr(request, request.method, request.POST)

        try:
            response = super(RestServiceMixin, self).dispatch(request, *args, **kwargs)
        except HttpError, e:
            response = HttpResponse(status=e.status)

        return response
