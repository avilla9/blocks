# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import generics

from acme.serializers import *
from acme.models import *


def index(request):
    return render(request, 'acme/index.html')


class WebHooksList(generics.ListCreateAPIView):
    queryset = WebHooks.objects.all()
    serializer_class = WebHooksSerializers


class WebHooksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = WebHooks.objects.all()
    serializer_class = WebHooksSerializers
