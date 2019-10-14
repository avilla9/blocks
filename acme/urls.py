from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from acme import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^webhooks/$', views.WebHooksList.as_view()),
    url(r'^webhooks/(?P<pk>[0-9]+)/$', views.WebHooksDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
