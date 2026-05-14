export default function NotesList({ notes }) {

  return (
    <div>

      {notes.map((note, index) => (
        <div key={index} className="note-card">

          <h3>Section {index + 1}</h3>

          <p>{note}</p>

        </div>
      ))}

    </div>
  );
}