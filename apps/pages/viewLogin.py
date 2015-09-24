# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView


class LoginView(TemplateView):
    template_name = 'pages/login.html'

    def get(self, request, *args, **kwargs):

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)
