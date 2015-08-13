from django.core.serializers.python import Serializer
from apps.exams.models import Exam
from apps.discussions.models import Discussion, DiscussionComment
from apps.courses.models import AcademyCourse
from django.utils import timezone
import json


def date_handler(obj):
    if hasattr(obj, 'isoformat'):
        return timezone.localtime(obj).isoformat()
    else:
        return obj


class ObjectSerializer(Serializer):

    def get_dump_object(self, obj):
        self._current['id'] = obj._get_pk_val()
        return self._current


class ModelSerializer(ObjectSerializer):

    def getExam(self):
        examDict = self.serialize([self.model])[0]
        examDict['student'] = self.serialize([self.model.student])[0]

        return json.dumps(examDict, default=date_handler)

    def getDiscussion(self):
        discussionDict = self.serialize([self.model],)[0]
        discussionDict['student'] = self.serialize([self.model.student])[0]

        if 'comments' in self.dependencies:
            discussionDict['comments'] = self.dependencies['comments']

        return json.dumps(discussionDict, default=date_handler)

    def getDiscussionComment(self):
        commentDict = self.serialize([self.model],)[0]
        commentDict['student'] = self.serialize([self.model.student])[0]

        return json.dumps(commentDict, default=date_handler)

    def getAcademyCourse(self):
        academyCourseDict = self.serialize([self.model],)[0]
        academyCourseDict['course'] = self.serialize([self.model.course])[0]
        academyCourseDict['profesor'] = self.serialize(
            [self.model.profesor])[0]

        return json.dumps(academyCourseDict, default=date_handler)

    def getJSON(self):
        typeModel = type(self.model)

        if typeModel == Exam:
            return self.getExam()
        elif typeModel == Discussion:
            return self.getDiscussion()
        elif typeModel == DiscussionComment:
            return self.getDiscussionComment()
        elif typeModel == AcademyCourse:
            return self.getAcademyCourse()

    def __init__(self, model, **dependencies):
        self.model = model
        self.dependencies = dependencies
        return self.getJSON()
