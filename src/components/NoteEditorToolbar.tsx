import { useState } from "react";
import "./NoteEditorToolbar.css";
import EditorHome from "./editor/EditorHome";

function NoteEditorToolbar({ handleEditorSettingsChange }) {
  const [activeBtn, setActiveBtn] = useState(1);

  const btns = ["Файл", "Главная", "Вставка", "Рисование", "Защита", "Вид"];

  function handle(type, style, value) {
    handleEditorSettingsChange({
      type,
      style,
      value,
    });
  }

  function renderTabs() {
    if (activeBtn === 1) return <EditorHome handle={handle}/>;

    return <div>ошибка</div>;
  }

  return (
    <header className="note-editor-toolbar">
      <div className="note-editor-toolbar__tabs">
        {btns.map((txt, index) => (
          <button
            className={activeBtn === index ? "active" : ""}
            key={index}
            onClick={() => setActiveBtn(index)}
          >
            {txt}
          </button>
        ))}
      </div>

      <div className="note-editor-toolbar__content">{renderTabs()}</div>
    </header>
  );
}

export default NoteEditorToolbar;
