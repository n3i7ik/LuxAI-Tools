from django.contrib import admin
from .models import AIProcessingLog, UserActivity


@admin.register(AIProcessingLog)
class AIProcessingLogAdmin(admin.ModelAdmin):
    list_display = ['task_type', 'status', 'processing_time_ms', 'created_at']
    list_filter = ['task_type', 'status', 'created_at']
    search_fields = ['task_type']


@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'action', 'timestamp']
    list_filter = ['action', 'timestamp']
    search_fields = ['user_id', 'action']
