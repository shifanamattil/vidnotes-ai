from flask import Flask, request, jsonify
from flask_cors import CORS

from transcript import extract_video_id, get_transcript
from summarizer import chunk_text, summarize_chunk

app = Flask(__name__)
CORS(app)

@app.route("/generate-notes", methods=["POST"])
def generate_notes():
    try:
        data = request.json
        video_url = data.get("url")

        video_id = extract_video_id(video_url)

        if not video_id:
            return jsonify({"error": "Invalid YouTube URL"}), 400

        transcript = get_transcript(video_id)

        if transcript.startswith("Error"):
            return jsonify({"error": transcript}), 400

        chunks = chunk_text(transcript)

        notes = []

        for chunk in chunks:
            summary = summarize_chunk(chunk)
            notes.append(summary)

        return jsonify({
            "notes": notes
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)