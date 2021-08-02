from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from . import models

class TaskSerialzer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = ['content']