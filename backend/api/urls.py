from django.urls import path
from . import views

urlpatterns = [
    path('summarize/', views.summarize, name='summarize'),
    path('translate/', views.translate, name='translate'),
    path('meeting-notes/', views.meeting_notes, name='meeting-notes'),
    path('stats/', views.productivity_stats, name='stats'),
    path('health/', views.health_check, name='health'),
]
