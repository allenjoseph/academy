# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect


class IndexView(TemplateView):
    template_name = 'pages/index.html'

    def get(self, request, *args, **kwargs):

        print kwargs.get('token', False)

        redirect = True

        if request.session.get('token', False):
            token = request.session.get('token')

            if kwargs.get('token', False):
                redirect = kwargs.get('token') == token

        if redirect:
            return HttpResponseRedirect('/login')

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)
