# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'pages/index.html'

    def get(self, request, *args, **kwargs):

        if self.request is not None:
            self.request.session['student_id'] = 1
            self.request.session['department_id'] = 1
            self.request.session['academyYear_id'] = 1

        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)
