# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.urls import reverse

# Create your models here.
class DietProgram(models.Model):
    dietProgram_name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    dietProgram_logo = models.CharField(max_length=1000)

    def get_absolute_url(self):
        return reverse('adminaccount:dietprogram-view')

    def __str__(self):
        return self.dietProgram_name

