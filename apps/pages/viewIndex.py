# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import LoginRequired



class IndexView(TemplateView):
    template_name = 'pages/index.html'

    @LoginRequired
    def get(self, request, *args, **kwargs):

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)
