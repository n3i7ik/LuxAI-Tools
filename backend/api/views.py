from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
import json

# AI Processing Services
from .services import (
    SummarizationService,
    TranslationService,
    MeetingNotesService,
    StatsService,
)

from .serializers import (
    SummarizeSerializer,
    TranslateSerializer,
    MeetingNotesSerializer,
)

summarize_service = SummarizationService()
translate_service = TranslationService()
meeting_service = MeetingNotesService()
stats_service = StatsService()


@api_view(['POST'])
def summarize(request):
    """
    Endpoint to summarize text using AI.
    """
    serializer = SummarizeSerializer(data=request.data)
    if serializer.is_valid():
        text = serializer.validated_data['text']
        language = serializer.validated_data.get('language', 'english')

        # Check cache first
        cache_key = f"summary:{hash(text)}"
        cached_result = cache.get(cache_key)
        if cached_result:
            return Response({'summary': cached_result})

        try:
            summary = summarize_service.summarize(text, language)
            cache.set(cache_key, summary, timeout=3600 * 24)
            return Response({'summary': summary})
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def translate(request):
    """
    Endpoint to translate text using AI.
    """
    serializer = TranslateSerializer(data=request.data)
    if serializer.is_valid():
        text = serializer.validated_data['text']
        target_lang = serializer.validated_data['target_language']

        # Check cache
        cache_key = f"translation:{hash(text)}:{target_lang}"
        cached_result = cache.get(cache_key)
        if cached_result:
            return Response({'translation': cached_result})

        try:
            translation = translate_service.translate(text, target_lang)
            cache.set(cache_key, translation, timeout=3600 * 24)
            return Response({'translation': translation})
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def meeting_notes(request):
    """
    Endpoint to generate meeting notes from transcript.
    """
    serializer = MeetingNotesSerializer(data=request.data)
    if serializer.is_valid():
        transcript = serializer.validated_data.get('transcript', '')
        file = serializer.validated_data.get('file')

        # Read from file if provided
        if file:
            try:
                transcript = file.read().decode('utf-8')
            except Exception as e:
                return Response(
                    {'error': f'Error reading file: {str(e)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        if not transcript:
            return Response(
                {'error': 'No transcript provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            notes, timeline = meeting_service.generate_notes(transcript)
            return Response({
                'notes': notes,
                'timeline': timeline
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def productivity_stats(request):
    """
    Endpoint to retrieve productivity statistics.
    """
    cache_key = "productivity_stats"
    cached_stats = cache.get(cache_key)

    if cached_stats:
        return Response(cached_stats)

    try:
        stats = stats_service.get_stats()
        cache.set(cache_key, stats, timeout=3600)
        return Response(stats)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint.
    """
    return Response({'status': 'healthy', 'service': 'LuxAI API'})
