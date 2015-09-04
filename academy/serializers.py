from django.core.serializers.python import Serializer
from apps.exams.models import Exam, ExamAttachment
from apps.discussions.models import Discussion, DiscussionComment
from apps.courses.models import AcademyCourse
from django.utils import timezone
from django.db.models.query import QuerySet
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
        self.dictModel['student'] = self.serialize([self.model.student])[0]
        self.dictModel['files'] = ExamAttachment.objects.filter(
            exam__id=self.dictModel['id']).count()

    def getDiscussion(self):
        self.dictModel['student'] = self.serialize([self.model.student])[0]
        self.dictModel['comments'] = DiscussionComment.objects.filter(
            discussion__id=self.dictModel['id']).count()

    def getDiscussionComment(self):
        self.dictModel['student'] = self.serialize([self.model.student])[0]

    def getAcademyCourse(self):
        self.dictModel['course'] = self.serialize([self.model.course])[0]
        self.dictModel['profesor'] = self.serialize(
            [self.model.profesor])[0]

    def getJSON(self):
        return json.dumps(self.dictModel, default=date_handler)

    def evaluateModel(self, model):
        self.model = model
        self.dictModel = self.serialize([model])[0]

        typeModel = type(model)
        if typeModel == Exam:
            self.getExam()
        elif typeModel == Discussion:
            self.getDiscussion()
        elif typeModel == DiscussionComment:
            self.getDiscussionComment()
        elif typeModel == AcademyCourse:
            self.getAcademyCourse()

    def __init__(self, model):
        self.dictModel = {}
        if type(model) == QuerySet:
            arrayDictModel = []
            for modelItem in model:
                self.evaluateModel(modelItem)
                arrayDictModel.append(self.dictModel)
            self.dictModel = arrayDictModel
        else:
            self.evaluateModel(model)
