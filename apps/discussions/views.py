# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView, View
from academy.mixins import JsonResponseMixin, RestServiceMixin
from models import Discussion, DiscussionComment
from apps.home.models import Department, Student
from academy.serializers import ObjectSerializer
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
import json

def date_handler(obj):
    return timezone.localtime(obj).isoformat() if hasattr(obj, 'isoformat') else obj

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

class DiscussionView(RestServiceMixin, View):

    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)

        student = Student.objects.get(pk=request.session['student_id'])
        department = Department.objects.get(pk=request.session['department_id'])

        discussion = Discussion.objects.create(
            question = params.get('question'),
            department = department,
            student = student)

        objectSerializer = ObjectSerializer()

        dictElementStudent = objectSerializer.serialize([student])[0]
        dictElementDiscussion = objectSerializer.serialize([discussion])[0]
        dictElementDiscussion['student'] = dictElementStudent
        dictElementDiscussion['comments'] = 0

        jsonDiscussion = json.dumps(dictElementDiscussion, default=date_handler)

        return JsonResponse(json.loads(jsonDiscussion),safe=False,status=201)

    def delete(self, request, discussion_id):
        discussion = Discussion.objects.get(pk=discussion_id)
        discussion.delete()
        return HttpResponse(status=200)

class CommentView(RestServiceMixin, View):

    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)

        student = Student.objects.get(pk=request.session['student_id'])
        discussion = Discussion.objects.get(pk=params.get('discussion'))

        comment = DiscussionComment.objects.create(
            comment = params.get('comment'),
            discussion = discussion,
            student = student)

        objectSerializer = ObjectSerializer()
        dictElementStudent = objectSerializer.serialize([student])[0]
        dictElementComment = objectSerializer.serialize([comment])[0]
        dictElementComment['student'] = dictElementStudent

        jsonComment = json.dumps(dictElementComment, default=date_handler)

        return JsonResponse(json.loads(jsonComment),safe=False,status=201)
