import { useEffect, useState } from "react";

function NoteBlock({
  onClick,
  props,
  isActive,
  index,
  editorSettings,
}: {
  onClick: () => void;
  props: any;
  active: boolean;
  index: number;

  editorSettings: any;
}) {
  const [content, setContent] = useState([]);

  const [style, setStyle] = useState(props.style);

  function chengPos(event) {}

  function onClickAddContent(event) {
    if (event.defaultPrevented) {
      return;
    }

    setContent([
      ...content,
      { id: `${content.length}_1`, type: "text", content: "wadwas" },
    ]);
  }

  function onClickContent(event) {
    event.preventDefault();
  }

  function typeContent(item) {
    switch (item.type) {
      case "text":
        if (Array.isArray(item.content))
          return item.content.map((item) => typeContent(item));

        return (
          <span data-content-id={item.id} style={item?.style}>
            {item.content}
          </span>
        );
    }
  }

  useEffect(() => {
    console.log(editorSettings, "стиль");

    if (!isActive) return;

    const type = editorSettings.style;
    const value = editorSettings.value;

    console.log("2", type, value);

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

        const match = id.match(/^(\d+)_(\d+)$/);

        if (!match) return;

        const index = Number(match[1]);

        setContent(
          content.map((item) =>
            item.id === id
              ? {
                  ...item,
                  style: {
                    ...item.style,
                    [type]: value,
                  },
                }
              : item,
          ),
        );

        console.log(content, index);

        //        const depth = Number(match[2]);

        //      const start = selection.anchorOffset;
        //        const end = selection.focusOffset;

        //  updateText(id, depth, node?.textContent, start, end);

        break;
    }
  }, [editorSettings]);

  function updateText(id, depth, txt, startIndex, endIndex) {}

  return (
    <div
      className="content-blocks"
      style={style}
      onClick={onClick}
      data-index={index}
    >
      <div
        className={`content-blocks-title ${!isActive ? "is-hide" : ""}`}
        onMouseDown={chengPos}
      >
        &lt; &gt; N
      </div>

      <div className="content-blocks-body" onClick={onClickAddContent}>
        {content.map((item, index) => {
          return (
            <div key={index} onClick={onClickContent}>
              {typeContent(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NoteBlock;
