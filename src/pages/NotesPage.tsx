import { Link } from "react-router";
import NoteEditorToolbar from "../components/NoteEditorToolbar";
import { useState } from "react";
import NoteBlock from "../components/NoteBlock";

function NotesPage() {
  function addContentBlocks(event) {
    if (event.defaultPrevented) {
      console.log(3, "Не добавим");
      return;
    }

    setContentBlocks([
      ...contentBlocks,
      {
        style: {
          position: "absolute",
          top: `${event.clientY}px`,
          left: `${event.clientX}px`,
          height: "200px",
          width: "400px",
        },
      },
    ]);
  }

  function ste(event, index) {
    event.preventDefault();
    setOnActivate(index);
  }

  const [onActivate, setOnActivate] = useState<null | number>(null);
  const [contentBlocks, setContentBlocks] = useState([]);

const [editorSettings, setEditorSettings] = useState({});
function handleEditorSettingsChange(settings) {
  setEditorSettings(settings);
}

  return (
    <>
      <NoteEditorToolbar handleEditorSettingsChange={handleEditorSettingsChange} />
      <main className="note">
        <div className="notes-title">Название</div>

        <div className="note-body" onClick={addContentBlocks}>
          {contentBlocks.map((item, index) => {
            return (
              <NoteBlock
                onClick={(e) => ste(e, index)}
                index={index}
                key={index}
                props={item}
                isActive={onActivate === index}
                editorSettings={editorSettings}
              />
            );
          })}
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default NotesPage;
