import { Link } from "react-router";
import NoteEditorToolbar from "../components/NoteEditorToolbar";
import { useState } from "react";
import NoteBlock from "../components/note/NoteBlock";
import { getRelativeMousePosition } from "../utils/editorUtils";
import type { ContentStyle } from "../types/ContentStyle";

function NotesPage() {
  function addContentBlocks(event) {
    if (event.defaultPrevented) {
      console.log(3, "Не добавим");
      return;
    }

    const {x, y } =getRelativeMousePosition(event);
    
    setContentBlocks([
      ...contentBlocks,
      {
        style: {
          position: "absolute",
          top: `${y}px`,
          left: `${x}px`,
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
  
  function handleEditorSettingsChange(contentStyle: ContentStyle) {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    const focusNode = selection?.focusNode;

    if (
      selection === null ||
      selection.isCollapsed ||
      anchorNode == null ||
      focusNode == null
    ) {
      setEditorSettings({ ...contentStyle, selection: undefined });
      return;
    }

    const anchorElement =
      anchorNode instanceof Element ? anchorNode : anchorNode.parentElement;
    const element = anchorElement?.closest<HTMLElement>("[data-content-id]");
    const container = element?.closest<HTMLElement>("p");

    if (!element || !container) {
      setEditorSettings({ ...contentStyle, selection: undefined });
      return;
    }

    const anchorRange = document.createRange();
    anchorRange.selectNodeContents(container);
    anchorRange.setEnd(anchorNode, selection.anchorOffset);

    const focusRange = document.createRange();
    focusRange.selectNodeContents(container);
    focusRange.setEnd(focusNode, selection.focusOffset);

    const contentId = element.dataset.contentId;
    if (!contentId) {
      setEditorSettings({ ...contentStyle, selection: undefined });
      return;
    }

    setEditorSettings({
      ...contentStyle,
      selection: {
        contentId,
        anchor: anchorRange.toString().length,
        focus: focusRange.toString().length,
      },
    });
  }

  return (
    <>
      <NoteEditorToolbar
        handleEditorSettingsChange={handleEditorSettingsChange}
      />
      <main className="note">
        <div className="notes-title">
          <div className="notes-title__name">Название {onActivate}</div>
          <div className="notes-title__date">16 апреля 2026г. 15:14</div>
        </div>

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
