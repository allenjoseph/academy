from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


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
        context.update(self.get_data())
        return self.render_to_response(context)

    def json_to_response(self):
        data = self.get_data()
        return JsonResponse(data, safe=False)