# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from academy.mixins import JsonResponseMixin
from models import Discussion, DiscussionComment
from academy.serializers import ObjectSerializer
from django.utils import timezone
import json

def date_handler(obj):
    return timezone.localtime(obj).isoformat() if hasattr(obj, 'isoformat') else obj

class DiscussionsView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        print(self.request.session['student_id'])
        return self.response_handler()

    def get_data(self):
        objects = Discussion.objects.all()

        objectSerializer = ObjectSerializer()
        discussions = objectSerializer.serialize(objects)

        for element in discussions:
            student = objectSerializer.serialize([objects.get(pk=element.get('id')).student,])
            element['student'] = student[0]
            commentsCount = DiscussionComment.objects.filter(discussion = objects.get(pk=element.get('id'))).count()
            element['comments'] = commentsCount

        data = json.dumps(discussions, default=date_handler)
        return data

class DiscussionCommentsView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'
    discussionId = 0

    def get(self, request, *args, **kwargs):
        self.discussionId = request.GET.get('id', None);
        return self.response_handler()

    def get_data(self):
        data = {}
        objectSerializer = ObjectSerializer()

        if self.discussionId > 0:
            objects = DiscussionComment.objects.filter(discussion__id = self.discussionId)
            comments = objectSerializer.serialize(objects)
            for comment in comments:
                student = objectSerializer.serialize([objects.get(pk=comment.get('id')).student,])
                comment['student'] = student[0]

            data = json.dumps(comments, default=date_handler)

        return data
