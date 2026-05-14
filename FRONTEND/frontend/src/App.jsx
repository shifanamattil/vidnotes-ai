
import { useState } from "react";
import "./index.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function App() {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  async function handleGenerateNotes() {

    if (!url.trim()) {
      setError("Please paste a YouTube URL");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setNotes([]);

      const response = await fetch(
        `${API_BASE}/generate-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate notes"
        );
      }

      setNotes(data.notes);

    } catch (err) {

      setError(
        err.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  function handleCopyNotes() {

    const text = notes.join("\n\n");

    navigator.clipboard.writeText(text);

    alert("Notes copied successfully!");
  }

  return (

    <div className="app">

      <div className="container">

        {/* HERO SECTION */}

        <section className="hero">

          <div className="badge">
            ✨ AI Powered YouTube Notes
          </div>

          <h1 className="hero-title">
            VidNotes AI
          </h1>

          <p className="hero-subtitle">
            Transform long YouTube videos into
            intelligent, concise, structured notes
            instantly using AI summarization.
          </p>

        </section>

        {/* INPUT SECTION */}

        <div className="glass-card">

          <div className="input-wrapper">

            <input
              className="input-box"
              type="text"
              placeholder="Paste YouTube URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGenerateNotes();
                }
              }}
              disabled={loading}
            />

            <button
              className="generate-btn"
              onClick={handleGenerateNotes}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Notes"}
            </button>

          </div>

          {/* ERROR */}

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {/* LOADING */}

          {loading && (
            <div className="loading-box">

              <div className="loader"></div>

              <p>
                AI is analyzing transcript and
                generating notes...
              </p>

            </div>
          )}

        </div>

        {/* NOTES */}

        {notes.length > 0 && (

          <section className="notes-section">

            {notes.map((note, index) => (

              <div
                key={index}
                className="note-card"
              >

                <div className="note-index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="note-text">
                  {note}
                </p>

              </div>

            ))}

            <button
              className="copy-btn"
              onClick={handleCopyNotes}
            >
              📋 Copy All Notes
            </button>

          </section>

        )}

        {/* FOOTER */}

        <footer className="footer">

          Built with Flask · HuggingFace ·
          Transformers · React

        </footer>

      </div>

    </div>
  );
}

export default App;