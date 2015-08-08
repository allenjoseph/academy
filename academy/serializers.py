from django.core.serializers.python import Serializer
from apps.exams.models import Exam
from apps.discussions.models import Discussion, DiscussionComment
from django.utils import timezone
import json


def date_handler(obj):
    if hasattr(obj, 'isoformat'):
        return timezone.localtime(obj).isoformat()
    else:
        return obj


class ObjectSerializer(Serializer):
    def end_object(self, obj):
        self._current['id'] = obj._get_pk_val()
        self.objects.append(self._current)


class JsonSerializer(ObjectSerializer):

    def __init__(self, model, **dependencies):
        self.model = model
        self.dependencies = dependencies

    def getExamJSON(self):
        examDict = self.serialize([self.model],)[0]

        if 'student' in self.dependencies:
            studentDict = self.serialize([self.dependencies['student']],)[0]
            examDict['student'] = studentDict

        return json.dumps(examDict, default=date_handler)

    def getDiscussionJSON(self):
        discussionDict = self.serialize([self.model],)[0]

        if 'student' in self.dependencies:
            studentDict = self.serialize([self.dependencies['student']],)[0]
            discussionDict['student'] = studentDict

        if 'comments' in self.dependencies:
            discussionDict['comments'] = self.dependencies['comments']

        return json.dumps(discussionDict, default=date_handler)

    def getDiscussionCommentJSON(self):
        commentDict = self.serialize([self.model],)[0]

        if 'student' in self.dependencies:
            studentDict = self.serialize([self.dependencies['student']],)[0]
            commentDict['student'] = studentDict

        return json.dumps(commentDict, default=date_handler)

    def getJSON(self):
        typeModel = type(self.model)

        if typeModel == Exam:
            return self.getExamJSON()
        elif typeModel == Discussion:
            return self.getDiscussionJSON()
        elif typeModel == DiscussionComment:
            return self.getDiscussionCommentJSON()
