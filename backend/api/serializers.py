from rest_framework import serializers


class SummarizeSerializer(serializers.Serializer):
    text = serializers.CharField(required=True)
    language = serializers.CharField(default='english')


class TranslateSerializer(serializers.Serializer):
    text = serializers.CharField(required=True)
    target_language = serializers.CharField(required=True)


class MeetingNotesSerializer(serializers.Serializer):
    transcript = serializers.CharField(required=False, allow_blank=True)
    file = serializers.FileField(required=False)


class ProductivityStatsSerializer(serializers.Serializer):
    total_summarizations = serializers.IntegerField()
    total_translations = serializers.IntegerField()
    total_meetings = serializers.IntegerField()
    time_saved = serializers.IntegerField()
