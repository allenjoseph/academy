from django.contrib import admin
from models import Exam, ExamAttachment


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'description',
        'student',
        'academyCourse',
        'dateCreation',)


@admin.register(ExamAttachment)
class ExamAttachmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'exam',
        'attachment')
