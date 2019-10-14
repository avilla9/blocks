# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class WebHooks(models.Model):
    name = models.CharField(max_length=80, default='unknow')
    action = models.CharField(max_length=80)
    url = models.CharField(max_length=80)
    response = models.PositiveSmallIntegerField(default=200)
    status_field = models.BooleanField(default=True)
