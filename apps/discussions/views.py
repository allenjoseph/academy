# -*- encoding: utf-8 -*-
from django.views.generic import View
from academy.mixins import RestServiceMixin, StateEnum
from models import Discussion, DiscussionComment
from apps.home.models import Student, Parameter
from apps.courses.models import AcademyCourse
from academy.serializers import ModelSerializer
from django.http import HttpResponse, JsonResponse
import json


class DiscussionsView(RestServiceMixin, View):

    def get(self, request, pk=None, **kwargs):
        courseId = request.GET.get('course', None)
        if courseId:
            discussions = Discussion.objects.filter(
                academyCourse__id=courseId)
        elif pk:
            discussions = Discussion.objects.get(pk=pk)
        else:
            discussions = Discussion.objects.all()
        discussionSerialize = ModelSerializer(discussions)

        return JsonResponse(
            discussionSerialize.dictModel, safe=False, status=201)

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


class CommentsView(RestServiceMixin, View):

    def get(self, request, pk=None, **kwargs):
        discussionId = request.GET.get('discussion', None)
        if discussionId:
            comments = DiscussionComment.objects.filter(
                discussion__id=discussionId)
        elif pk:
            comments = DiscussionComment.objects.get(
                pk=pk)
        else:
            comments = DiscussionComment.objects.all()
        commentSerialize = ModelSerializer(comments)

        return JsonResponse(
            commentSerialize.dictModel, safe=False, status=201)

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
