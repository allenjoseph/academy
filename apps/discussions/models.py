from django.db import models
from apps.courses.models import AcademyCourse
from apps.home.models import Student, Parameter


class Discussion(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=150)
    academyCourse = models.ForeignKey(AcademyCourse, blank=True, null=True)
    student = models.ForeignKey(Student)
    state = models.ForeignKey(Parameter)
    dateCreation = models.DateTimeField(auto_now_add=True)
    dateLastModification = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'%s' % (self.question)


class DiscussionComment(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=150)
    discussion = models.ForeignKey(Discussion)
    student = models.ForeignKey(Student)
    state = models.ForeignKey(Parameter)
    dateCreation = models.DateTimeField(auto_now_add=True)
    dateLastModification = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'%s' % (self.comment)
