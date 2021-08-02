from . import models, serializers
from rest_framework import viewsets, permissions, status, generics
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.conf import settings


class TaskView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.TaskSerialzer
    queryset = models.Task.objects.all()
    
    
class AddTaskView(APIView):
    serializer_class = serializers.TaskSerialzer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, format = None):
        newTask = self.request.data
        serializer = self.serializer_class(data = newTask)
        if serializer.is_valid():
            serializer.save()
            return Response("New task was created!", status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class TaskDetailView(APIView):
    serializer_class = serializers.TaskSerialzer
    permission_classes = [permissions.AllowAny]
    
    def get_object(self, pk):
        return get_object_or_404(models.Task, id = pk)
    
    def get(self, request, pk = None):
        task = self.get_object(pk)
        if task:
            serializer = self.serializer_class(task)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response("Task was not found!", status = status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk = None):
        task = self.get_object(pk)
        if task:
            serializer = self.serializer_class(task)
            serializer.delete()
            return Response('Delete task successfully!', status = status.HTTP_200_OK)
        return Response("Task was not found!", status = status.HTTP_404_NOT_FOUND)