# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from apps.courses.views import CoursesView, CourseView
from apps.home.views import IndexView, UploadFile, DeleteUploadedFile
from apps.discussions.views import DiscussionsView, DiscussionCommentsView, DiscussionView, CommentView
from apps.exams.views import ExamView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^courses/$', CoursesView.as_view(), name='courses'),
    url(r'^courses/(?P<slug>[-\w]+)/$', CourseView.as_view(), name='course'),

    url(r'^discussions/', DiscussionsView.as_view(), name='discussions'),
    url(r'^discussion/?$', DiscussionView.as_view()),

    url(r'^comments/', DiscussionCommentsView.as_view(), name='comments'),
    url(r'^comment/?$', CommentView.as_view()),

    url(r'^exam/?$', ExamView.as_view()),

    url(r'^upload/', UploadFile, name='uploadFile'),
    url(r'^delete/(?P<pk>\d+)$', DeleteUploadedFile, name = 'deleteUploadedFile' ),

    #url(r'^media/(?P<path>.*)$', 'django.views.static.server', {'document_root': path.join(path.dirname(__file__), 'media')}),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),
)
