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
        return super(LoginRequiredMixin, self).dispatch(
            request, *args, **kwargs)


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
        # Technically, the HTTP spec does not preclude any HTTP request from
        # containing data in the message body, so load the data into the POST
        # dict if there is any present
        method = request.method
        request.method = 'POST'
        request._load_post_and_files()

        # Now that message body has been loaded, check for a method override
        method_override = None
        if request.GET and request.GET.get('_method', None):
            request.GET._mutable = True
            method_override = request.GET.pop('_method')[0].upper()
            request.GET._mutable = False
        elif request.POST and request.POST.get('_method', None):
            request.POST._mutable = True
            method_override = request.POST.pop('_method')[0].upper()
            request.POST._mutable = False

        # Set the HTTP method on the request according to the override first
        # if one exists, and if not, set it back to the original method used
        request.method = method_override or method

        # Add a dict to hold the message body data to the request based on the
        # HTTP method used (or the method override if one was provided)
        if request.method not in ['POST', 'GET']:
            setattr(request, request.method, request.POST)

        # Check for an HttpError when executing the view. If one was returned,
        # get the message and status code and return it, otherwise, let any
        # other type of exception bubble up or return the response if no error
        # occurred.
        try:
            response = super(RestServiceMixin, self).dispatch(
                request, *args, **kwargs)
        except HttpError, e:
            response = HttpResponse(status=e.status)

        return response
