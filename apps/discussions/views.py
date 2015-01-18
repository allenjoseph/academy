# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from models import Discussion
from academy.serializers import ObjectSerializer
import json

def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

class DiscussionsView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        objects = Discussion.objects.all()

        objectSerializer = ObjectSerializer()
        discussions = objectSerializer.serialize(objects)

        for element in discussions:
            student = objectSerializer.serialize([objects.get(pk=element.get('id')).student,])
            element['student'] = student[0]

        data = json.dumps(discussions, default=date_handler)
        return data
