# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from apps.courses.views import CoursesView
from apps.home.views import UploadFile, DeleteUploadedFile
from apps.pages.viewIndex import IndexView
from apps.pages.viewCourse import CourseView
from apps.pages.viewLogin import LoginView
from apps.discussions.views import DiscussionsView
from apps.discussions.views import CommentsView
from apps.exams.views import ExamView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^login/', LoginView.as_view(), name='login'),

    url(r'^course/(?P<slug>[-\w]+)/$', CourseView.as_view(), name='course'),

    url(r'^courses/?$', CoursesView.as_view()),
    url(r'^courses/(?P<pk>\d+)/?$', CoursesView.as_view()),
    url(r'^discussions/?$', DiscussionsView.as_view()),
    url(r'^discussions/(?P<pk>\d+)/?$', DiscussionsView.as_view()),
    url(r'^comments/?$', CommentsView.as_view()),
    url(r'^comments/(?P<pk>\d+)/?$', CommentsView.as_view()),
    url(r'^exams/?$', ExamView.as_view()),
    url(r'^exams/(?P<pk>\d+)/?$', ExamView.as_view()),

    url(r'^upload/', UploadFile, name='uploadFile'),
    url(r'^delete/(?P<pk>\d+)$', DeleteUploadedFile,
        name='deleteUploadedFile')
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),
)
