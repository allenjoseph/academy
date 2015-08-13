# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView, View
from academy.mixins import JsonResponseMixin, RestServiceMixin, StateEnum
from models import Discussion, DiscussionComment
from apps.home.models import Student, Parameter
from apps.courses.models import AcademyCourse
from academy.serializers import ModelSerializer
from django.http import HttpResponse, JsonResponse
import json

class DiscussionsView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'

    def get(self, request, *args, **kwargs):
        return self.response_handler()

    def get_data(self):
        discussions = Discussion.objects.all()
        discussionsSerialize = ModelSerializer(discussions)
        return discussionsSerialize.getJSON()


class DiscussionCommentsView(JsonResponseMixin, TemplateView):
    template_name = 'home/404.html'
    discussionId = 0

    def get(self, request, *args, **kwargs):
        self.discussionId = request.GET.get('id', None)
        return self.response_handler()

    def get_data(self):
        if self.discussionId > 0:
            discussionComments = DiscussionComment.objects.filter(
                discussion__id=self.discussionId)
            discussionCommentsSerializer = ModelSerializer(discussionComments)
        return discussionCommentsSerializer.getJSON()


class DiscussionView(RestServiceMixin, View):
    # create and update
    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)
        student = Student.objects.get(pk=request.session['student_id'])
        state = Parameter.objects.get(pk=int(StateEnum.ACTIVO))
        academyCourse = None
        if 'academyCourse_id' in request.session:
            academyCourse = AcademyCourse.objects.get(
                pk=request.session['academyCourse_id'])

        discussion = Discussion.objects.create(
            question=params.get('question'),
            academyCourse=academyCourse,
            student=student,
            state=state)

        dictDiscussion = ModelSerializer(discussion).dictModel
        return JsonResponse(dictDiscussion, status=201)

    def delete(self, request, discussion_id):
        discussion = Discussion.objects.get(pk=discussion_id)
        discussion.delete()
        return HttpResponse(status=200)


class CommentView(RestServiceMixin, View):

    def post(self, request, *args, **kwargs):
        params = json.loads(request.body)
        student = Student.objects.get(pk=request.session['student_id'])
        discussion = Discussion.objects.get(pk=params.get('discussion'))
        state = Parameter.objects.get(pk=int(StateEnum.ACTIVO))

        comment = DiscussionComment.objects.create(
            comment=params.get('comment'),
            discussion=discussion,
            student=student,
            state=state)

        dictComment = ModelSerializer(comment).dictModel
        return JsonResponse(dictComment, status=201)
