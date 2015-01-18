from django.db import models
from apps.home.models import Course, Department, Student

class Discussion(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=150)
    course = models.ForeignKey(Course,blank=True, null=True)
    department = models.ForeignKey(Department)
    student = models.ForeignKey(Student)
    dateCreation = models.DateTimeField(auto_now_add=True)
    dateLastModification = models.DateTimeField(auto_now=True)
    def __unicode__(self):
        return u'%s' % (self.question)

class DiscussionComment(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=150)
    discussion = models.ForeignKey(Discussion)
    student = models.ForeignKey(Student)
    dateCreation = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return u'%s' % (self.comment)
