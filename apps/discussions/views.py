# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView, View
from academy.mixins import JsonResponseMixin
from models import Discussion, DiscussionComment
from apps.home.models import Department, Student
from academy.serializers import ObjectSerializer
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
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

class HttpError(Exception):
    def __init__(self, message=None, status=500):
        super(HttpError, self).__init__(message)
        self.status = status

    def __repr__(self):
        return 'HttpError(%r, %r)' % (self.status, self.message)

class DiscussionView(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        method = request.method
        request.method = 'POST'
        request._load_post_and_files()
        method_override = None

        if request.POST and request.POST.get('_method', None):
            request.POST._mutable = True
            method_override = request.POST.pop('_method')[0].upper()
            request.POST._mutable = False

        #asigno el request method en post
        request.method = method_override or method

        #le asigno los valores del request al metodo post
        if request.method not in ['POST', 'GET']:
            setattr(request, request.method, request.POST)

        try:
            response = super(DiscussionView, self).dispatch(request, *args, **kwargs)
        except HttpError, e:
            response = HttpResponse(status=e.status)

        return response

    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)

        department = Department.objects.get(pk=request.session['department_id'])
        student = Student.objects.get(pk=request.session['student_id'])

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
