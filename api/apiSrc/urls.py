from django.urls import path
from . import views

urlpatterns = [
    path('task-list/', views.TaskView.as_view(), name = 'list-tasks'),
    path('create-task/', views.AddTaskView.as_view(), name = 'create-task'),
    path('task-detail/<int:pk>/', views.TaskDetailView.as_view(), name = 'task-detail')
]
