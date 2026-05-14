import re
from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled,
    NoTranscriptFound
)

def extract_video_id(url):
    match = re.search(
        r"(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})",
        url
    )
    return match.group(1) if match else None

def get_transcript(video_id):
    try:
        api = YouTubeTranscriptApi()
        transcript = api.fetch(video_id)

        return " ".join([t.text for t in transcript])

    except TranscriptsDisabled:
        return "Error: Transcripts are disabled."

    except NoTranscriptFound:
        return "Error: No transcript found."

    except Exception as e:
        return f"Error: {str(e)}"