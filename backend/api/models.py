from django.db import models


class AIProcessingLog(models.Model):
    """Log of AI processing tasks for analytics."""
    
    TASK_TYPES = [
        ('summarization', 'Summarization'),
        ('translation', 'Translation'),
        ('meeting_notes', 'Meeting Notes'),
    ]
    
    task_type = models.CharField(max_length=20, choices=TASK_TYPES)
    input_length = models.IntegerField()
    output_length = models.IntegerField(null=True, blank=True)
    processing_time_ms = models.IntegerField()
    status = models.CharField(max_length=20, default='success')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['task_type', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.task_type} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"


class UserActivity(models.Model):
    """Track user activity for dashboard statistics."""
    
    user_id = models.CharField(max_length=100)
    action = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user_id', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.user_id} - {self.action}"
