from django.contrib import admin
from models import Discussion, DiscussionComment

@admin.register(Discussion)
class DiscussionAdmin(admin.ModelAdmin):
    list_display = ('id',
    'question',
    'course',
    'department',
    'student',
    'dateCreation',
    'dateLastModification',)

@admin.register(DiscussionComment)
class DiscussionCommentAdmin(admin.ModelAdmin):
    list_display = ('id',
    'comment',
    'discussion',
    'student',
    'dateCreation',)
