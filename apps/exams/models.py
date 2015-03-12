from django.db import models
from apps.home.models import Student, Attachment

class Exam(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100, blank=True)
    student = models.ForeignKey(Student)
    dateCreation = models.DateTimeField(auto_now_add=True)

class ExamAttachment(models.Model):
    id = models.AutoField(primary_key=True)
    exam = models.ForeignKey(Exam)
    attachment = models.OneToOneField(Attachment)
