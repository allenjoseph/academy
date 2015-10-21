# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect


class IndexView(TemplateView):
    template_name = 'pages/index.html'


    def get(self, request, *args, **kwargs):

        redirect = True
        client_token = kwargs.get('token', False)
        session_token = request.session.get('token', False)

        if client_token and session_token and 'user' in request.session:
            redirect = client_token != session_token

        if redirect:
            return HttpResponseRedirect('/login')

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)
