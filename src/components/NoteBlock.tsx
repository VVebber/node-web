import { useEffect, useRef, useState } from "react";
import "./NoteBlock.css";
import { Contents, getNodePosition } from "./NoteBlockUtils";

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

  const contents = useRef(new Contents()).current;

  let drag: object | null = null;
  function handleMouseDown(event) {
    const block = event.currentTarget.parentElement;
    const rect = block.getBoundingClientRect();

    drag = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    if (!drag) return;

    setStyle((prev) => ({
      ...prev,
      left: `${event.clientX - drag?.offsetX}px`,
      top: `${event.clientY - drag?.offsetY}px`,
    }));
  }

  function handleMouseUp() {
    drag = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

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

  useEffect(() => {
    console.log(editorSettings, "стиль");

    if (!isActive) return;

    switch (editorSettings.type) {
      case "text":
        const selection: Selection | null = window.getSelection();

        if (selection === null) return;

        const node: Node | null = selection.anchorNode;

        if (node === null) return;

        const element: Element | null | undefined =
          node.parentElement?.closest("[data-content-id]");

        if (!(element instanceof HTMLElement)) return;

        const id = element.dataset.contentId;

        if (id === undefined) return;

        const { index: number } = getNodePosition(id);
        contents.updateStyle(index, editorSettings);

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
        onMouseDown={handleMouseDown}
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
              {contents.render(item, () => update((n) => n + 1))}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default NoteBlock;
