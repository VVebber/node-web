import { useEffect, useRef, useState } from "react";
import "../../styles/NoteBlock.css";
import { Contents, getNodePosition } from "./NoteComponent";
import NoteWindow from "./NoteWindow";

function NoteBlock({
  onClick,
  props,
  isActive,
  index,
  editorSettings,
}: {
  onClick: () => void;
  props: any;
  isActive: boolean;
  index: number;
  editorSettings: any;
}) {
  const [, update] = useState(0);
  const [style, setStyle] = useState(props.style);

  const contents = useRef(new Contents(() => update((n) => n + 1))).current;
  const noteWindow = new NoteWindow(style, setStyle);

  function onClickAddContent(event) {
    if (event.defaultPrevented) {
      return;
    }

    contents.addContent();

    update((n) => n + 1);
    console.log("leng", contents.contents().length);
  }

  function onClickContent(event) {
    event.preventDefault();
  }
  // Движение окна
  const drag = useRef<{
    mouseX: number;
    mouseY: number;
    blockX: number;
    blockY: number;
  } | null>(null);

  //

  useEffect(() => {
    console.log(editorSettings, "стиль");

    if (!isActive) return;

    switch (editorSettings.type) {
      case "text":
        const selection = editorSettings.selection;
        if (!selection) return;

        contents.updateStyle(selection.contentId, editorSettings, {
          anchor: Math.min(selection.anchor, selection.focus),
          focus: Math.max(selection.anchor, selection.focus),
        });

        break;
    }
  }, [editorSettings]);

  return (
    <div
      className="content-blocks"
      style={style}
      onClick={onClick}
      data-index={index}
    >
      <div
        className={`content-blocks-title ${!isActive ? "is-hide" : ""}`}
        onMouseDown={(e) => noteWindow.exp(e)}
      >
        <div className="flex">
          <div>N</div>
          <div>&lt; &gt;</div>
        </div>

        <button>X {isActive}</button>
      </div>
      <div className="content-blocks-body" onClick={onClickAddContent}>
        {contents.contents().map((item, index) => {
          return (
            <p key={index} onClick={onClickContent}>
              {contents.render(item, index)}
            </p>
          );
        })}
      </div>

      <div className="note-resize-top"></div>
      <div className="note-resize-right"></div>
      <div className="note-resize-bottom"></div>
      <div className="note-resize-left"></div>
    </div>
  );
}

export default NoteBlock;
