import { getCaretPosition } from "../../utils/editorUtils";
import type { ContentStyle } from "../../types/ContentStyle";

export interface Content {
  index: string; //index_depth_indexInContent
  text?: string;
  type: string;
  content?: string | Content[];
  style?: object;
  select?: {
    anchor: number;
    focus: number;
  };
}

export class Contents {
  #contents: Content[] = [];

  #update: (() => void) | null = null;

  constructor(update: () => void) {
    this.#update = update;
  }

  addContent() {
    this.#contents.push({
      index: `${this.#contents.length}_0`,
      text: "",
      type: "text",
      content: "",
    });
  }

  contents(): Content[] {
    return this.#contents;
  }

  render(item: Content, index: number, key: number = -1): React.ReactNode {
    if (this.#update === null) return;

    switch (item.type) {
      case "text":
        if (Array.isArray(item.content))
          return item.content.map((item, key) => this.render(item, index, key));

        return key === -1 ? (
          <span
            data-content-id={item.index}
            style={item?.style}
            tabIndex={0}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const value = e.currentTarget.textContent ?? "";

              item.text = value;
              item.content = value;
            }}
            onFocus={() => console.log(this.#contents)}
          >
            {item.content}
          </span>
        ) : (
          <span
            data-content-id={item.index}
            style={item?.style}
            key={key}
            tabIndex={0}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const value = e.currentTarget.textContent ?? "";

              item.text = value;
              item.content = value;
            }}
          >
            {item.content}
          </span>
        );
    }
  }

  ddwwa(
    index: number,
    depth: number,
    indexContent: number,
    content: Content,
    selection: { anchor: number; focus: number },
  ): Content | null {
    const {
      index: indexCurrent,
      depth: depthCurrent,
      indexContent: indexContentCurrent,
    } = getNodePosition(content.index);

    if (depth === depthCurrent && indexContent === indexContentCurrent) {
      if (selection.anchor === 0 && selection.focus === content.text?.length) {
        content.content = content.text;
        return content;
      } else {
        return this.splitContentBySelection(
          index,
          depthCurrent,
          content,
          selection,
        );
      }
    } else if (depth !== 0 && Array.isArray(content.content)) {
      let offset = 0;

      for (const con of content.content) {
        const result: Content | null = this.ddwwa(
          index,
          depth,
          indexContent,
          con,
          {
            anchor: selection.anchor - offset,
            focus: selection.focus - offset,
          },
        );

        if (result !== null) {
          return result;
        }

        offset += con.text?.length ?? 0;
      }
    }

    return null;
  }

  splitContentBySelection(
    index: number,
    depth: number,
    content: Content,
    selection: { anchor: number; focus: number },
  ) {
    if (typeof content.content !== "string") return;

    const string: string = content.content;

    const beforeSelection: Content = {
      index: `${index}_${depth + 1}_0`,
      type: "text",
      text: string.slice(0, selection.anchor),
      content: string.slice(0, selection.anchor),
    };

    const selectedText: Content = {
      index: `${index}_${depth + 1}_1`,
      type: "text",
      text: string.slice(selection.anchor, selection.focus),
      content: string.slice(selection.anchor, selection.focus),
    };

    const afterSelection: Content = {
      index: `${index}_${depth + 1}_2`,
      type: "text",
      text: string.slice(selection.focus),
      content: string.slice(selection.focus),
    };

    content.content = [beforeSelection, selectedText, afterSelection];

    return selectedText;
  }

  updateStyle(
    id: string,
    style: ContentStyle,
    selection: { anchor: number; focus: number },
  ) {
    if (this.#update === null) return;

    console.log(`=====teStyle===========`);
    console.log(id);
    console.log(style);
    console.log(selection);
    console.log(`================`);

    const type = style.style;
    const value = style.value;

    const { index, depth, indexContent } = getNodePosition(id);

    console.log(index, ":", depth, ":", indexContent);

    const content: Content | null = this.ddwwa(
      index,
      depth,
      indexContent,
      this.#contents[index],
      selection,
    );

    if (!content) return;

    console.log(this.#contents[index], "СТИЛИ");

    content.style = {
      ...content.style,
      [type]: value,
    };

    this.#update();
  }
}

//Vf

//События

// Методы общие
export function getNodePosition(id: string) {
  const match = id.match(/^(\d+)_(\d+)(?:_(\d+))?$/);
  if (!match) {
    return;
  }
  const index = Number(match[1]);
  const depth = Number(match[2]);
  const indexContent = match[3] ? Number(match[3]) : undefined;

  return { index, depth, indexContent };
}
