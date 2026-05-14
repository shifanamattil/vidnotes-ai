import { useState } from "react";

export default function InputForm({
  onSubmit,
  loading
}) {

  const [url, setUrl] = useState("");

  return (
    <div className="input-card">

      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={() => onSubmit(url)}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Notes"}
      </button>

    </div>
  );
}