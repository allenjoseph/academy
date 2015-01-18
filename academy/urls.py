# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from apps.home.views import IndexView, CoursesView
from apps.discussions.views import DiscussionsView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^courses/', CoursesView.as_view(), name='courses'),
    url(r'^discussions/', DiscussionsView.as_view(), name='discussions'),
    #url(r'^media/(?P<path>.*)$', 'django.views.static.server', {'document_root': path.join(path.dirname(__file__), 'media')}),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),
)
