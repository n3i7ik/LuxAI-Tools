"""
AI Services for LuxAI Backend
"""

from typing import Tuple, List, Dict, Any
import json
from datetime import datetime


class SummarizationService:
    """
    Service for text summarization using transformers.
    Fallback to rule-based summarization if ML models unavailable.
    """

    def __init__(self):
        self.model_available = False
        try:
            from transformers import pipeline
            self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
            self.model_available = True
        except Exception as e:
            print(f"Warning: Summarization model not available: {e}")

    def summarize(self, text: str, language: str = 'english') -> str:
        """
        Summarize text using AI or rule-based approach.
        """
        # Validate input
        if len(text) < 100:
            return "Text too short for summarization. Please provide at least 100 characters."

        if self.model_available:
            try:
                max_length = max(int(len(text.split()) * 0.4), 50)
                min_length = max(int(len(text.split()) * 0.2), 30)

                summary = self.summarizer(
                    text,
                    max_length=min(max_length, 150),
                    min_length=min(min_length, 75),
                    do_sample=False
                )
                return summary[0]['summary_text']
            except Exception as e:
                print(f"Summarization error: {e}")
                return self._rule_based_summary(text)
        else:
            return self._rule_based_summary(text)

    def _rule_based_summary(self, text: str) -> str:
        """
        Fallback rule-based summarization using sentence scoring.
        """
        sentences = text.split('.')
        if len(sentences) < 3:
            return text.strip()

        # Score sentences by keyword frequency
        words = text.lower().split()
        word_freq = {}
        for word in words:
            if len(word) > 4:
                word_freq[word] = word_freq.get(word, 0) + 1

        sentence_scores = {}
        for i, sentence in enumerate(sentences):
            for word, freq in word_freq.items():
                if word in sentence.lower():
                    sentence_scores[i] = sentence_scores.get(i, 0) + freq

        # Get top sentences
        top_sentences_idx = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:3]
        top_sentences_idx.sort()
        summary = '. '.join([sentences[i] for i in top_sentences_idx if i < len(sentences)])
        return summary.strip() + '.'


class TranslationService:
    """
    Service for text translation using transformers.
    """

    def __init__(self):
        self.model_available = False
        self.models = {}
        self._init_models()

    def _init_models(self):
        """Initialize translation models for different language pairs."""
        try:
            from transformers import pipeline
            # Pre-load common language pairs
            self.models['es'] = pipeline("translation_en_to_es", model="Helsinki-NLP/opus-mt-en-es")
            self.models['fr'] = pipeline("translation_en_to_fr", model="Helsinki-NLP/opus-mt-en-fr")
            self.models['de'] = pipeline("translation_en_to_de", model="Helsinki-NLP/opus-mt-en-de")
            self.model_available = True
        except Exception as e:
            print(f"Warning: Translation models not available: {e}")

    def translate(self, text: str, target_language: str) -> str:
        """
        Translate text to target language.
        """
        if not text.strip():
            return "No text provided."

        # Language code to full name mapping
        lang_map = {
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ja': 'Japanese',
            'zh': 'Chinese',
            'ko': 'Korean',
        }

        if target_language not in lang_map:
            return f"Language '{target_language}' not supported. Available: {', '.join(lang_map.keys())}"

        if self.model_available and target_language in self.models:
            try:
                result = self.models[target_language](text)
                return result[0]['translation_text']
            except Exception as e:
                print(f"Translation error: {e}")
                return self._fallback_translation(text, target_language)
        else:
            return self._fallback_translation(text, target_language)

    def _fallback_translation(self, text: str, target_language: str) -> str:
        """Fallback translation using placeholder method."""
        lang_map = {
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ja': 'Japanese',
            'zh': 'Chinese',
            'ko': 'Korean',
        }
        return f"[Translation to {lang_map.get(target_language, 'Unknown')}]\n{text}\n\n[Note: Full translation requires ML model. This is a placeholder.]"


class MeetingNotesService:
    """
    Service for generating polished meeting notes from transcripts.
    """

    def __init__(self):
        self.summarizer = SummarizationService()

    def generate_notes(self, transcript: str) -> Tuple[str, List[Dict[str, Any]]]:
        """
        Generate polished notes and timeline from meeting transcript.
        """
        if not transcript.strip():
            return "No transcript provided.", []

        # Clean transcript
        transcript = transcript.strip()

        # Generate main summary
        if len(transcript) > 500:
            summary = self.summarizer.summarize(transcript)
        else:
            summary = transcript

        # Generate timeline
        timeline = self._generate_timeline(transcript)

        # Format polished notes
        polished_notes = self._format_notes(summary, timeline)

        return polished_notes, timeline

    def _generate_timeline(self, transcript: str) -> List[Dict[str, str]]:
        """
        Extract key moments and create timeline.
        """
        sentences = transcript.split('.')
        timeline = []

        # Create timeline entries from key sentences
        key_markers = ['discussed', 'decided', 'action item', 'next step', 'agreement', 'important']

        for i, sentence in enumerate(sentences[:5]):  # Limit to first 5 moments
            sentence_lower = sentence.lower()
            if any(marker in sentence_lower for marker in key_markers):
                timeline.append({
                    'timestamp': f'{(i + 1) * 5} min',
                    'title': 'Key Discussion Point',
                    'description': sentence.strip()[:100] + '...' if len(sentence.strip()) > 100 else sentence.strip(),
                })

        # If no key moments found, create generic timeline
        if not timeline:
            for i in range(min(3, len(sentences))):
                timeline.append({
                    'timestamp': f'{(i + 1) * 15} min',
                    'title': f'Topic {i + 1}',
                    'description': sentences[i].strip()[:100] + '...' if len(sentences[i].strip()) > 100 else sentences[i].strip(),
                })

        return timeline

    def _format_notes(self, summary: str, timeline: List[Dict]) -> str:
        """
        Format notes with polished structure.
        """
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        notes = f"""
═══════════════════════════════════════════════════════════════════
                        MEETING NOTES
═══════════════════════════════════════════════════════════════════

Date & Time: {timestamp}
Status: Complete

───────────────────────────────────────────────────────────────────
EXECUTIVE SUMMARY
───────────────────────────────────────────────────────────────────

{summary}

───────────────────────────────────────────────────────────────────
KEY DISCUSSION POINTS
───────────────────────────────────────────────────────────────────

"""

        for item in timeline:
            notes += f"\n• [{item['timestamp']}] {item['title']}\n  {item['description']}\n"

        notes += """
───────────────────────────────────────────────────────────────────
ACTION ITEMS
───────────────────────────────────────────────────────────────────

□ Pending assignment
□ Follow-up required

═══════════════════════════════════════════════════════════════════
"""

        return notes.strip()


class StatsService:
    """
    Service for generating productivity statistics.
    """

    def get_stats(self) -> Dict[str, Any]:
        """
        Get productivity statistics.
        In production, this would query database and analytics.
        """
        return {
            'total_summarizations': 1250,
            'total_translations': 890,
            'total_meetings': 450,
            'time_saved_hours': 240,
            'languages_supported': 50,
            'user_satisfaction': 98,
            'avg_processing_time_ms': 2500,
            'monthly_trend': {
                'January': 120,
                'February': 150,
                'March': 180,
                'April': 200,
                'May': 240,
                'June': 280,
            }
        }
