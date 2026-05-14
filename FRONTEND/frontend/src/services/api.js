const API_BASE =
  import.meta.env.VITE_API_URL;

export async function generateNotes(url) {

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
    throw new Error(data.error);
  }

  return data;
}