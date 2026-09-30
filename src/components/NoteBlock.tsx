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

  const contents = useRef(new Contents(() => update((n) => n + 1))).current;

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

  function handleMouseDown(event) {
    const block = event.currentTarget.parentElement;

    if (!block) return;

    drag.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      blockX: block.offsetLeft,
      blockY: block.offsetTop,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    if (!drag.current) return;

    const { mouseX, mouseY, blockX, blockY } = drag.current;

    const dx = event.clientX - mouseX;
    const dy = event.clientY - mouseY;

    setStyle((prev) => ({
      ...prev,
      left: `${blockX + dx}px`,
      top: `${blockY + dy}px`,
    }));
  }

  function handleMouseUp() {
    drag.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  //

  useEffect(() => {
    console.log(editorSettings, "стиль");

    if (!isActive) return;

    switch (editorSettings.type) {
      case "text":
        const selection: Selection | null = window.getSelection();

        if (selection === null || selection.toString() === null) return;

        const node: Node | null = selection.anchorNode;

        if (node === null) return;

        const element: Element | null | undefined =
          node.parentElement?.closest("[data-content-id]");

        if (!(element instanceof HTMLElement)) return;

        const id = element.dataset.contentId;

        if (id === undefined) return;

        const container = element.closest("p");

        if (!(container instanceof HTMLElement)) return;

        const { anchor, focus } = getSelectionPosition(selection, container);

        contents.updateStyle(id, editorSettings, {
          anchor: Math.min(anchor, focus),
          focus: Math.max(anchor, focus),
        });

        break;
    }
  }, [editorSettings]);

  function getSelectionPosition(
    selection: Selection,
    container: HTMLElement,
  ): { anchor: number; focus: number } {
    const anchorRange = document.createRange();
    anchorRange.selectNodeContents(container);
    anchorRange.setEnd(selection.anchorNode!, selection.anchorOffset);

    const focusRange = document.createRange();
    focusRange.selectNodeContents(container);
    focusRange.setEnd(selection.focusNode!, selection.focusOffset);

    return {
      anchor: anchorRange.toString().length,
      focus: focusRange.toString().length,
    };
  }

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
              {contents.render(item, index)}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default NoteBlock;
