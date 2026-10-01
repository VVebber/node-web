import { useRef, useState } from "react";
import {
  getCaretPosition,
  getRelativeMousePosition,
} from "../utils/editorUtils";

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
      text: `testText_${this.#contents.length}`,
      type: "text",
      content: `testText_${this.#contents.length}`,
    });
  }

  contents(): Content[] {
    return this.#contents;
  }

  #currentTarget: null | HTMLElement = null;
  #keyDownHandler?: (event: KeyboardEvent) => void;

  onKeyDown(event, index) {
    if (this.#currentTarget !== null)
      this.#currentTarget.removeEventListener("keydown", this.#keyDownHandler!);

    let offset: number = getCaretPosition(event);

    this.#keyDownHandler = (e) => {
      if (typeof this.#contents[index].content === "string") {
        const arr = [...this.#contents[index].content];
        arr.splice(offset == -1 ? arr.length : offset++, 0, e.key);
        this.#contents[index].content = arr.join("");
      }

      this.#update!();
    };

    this.#currentTarget = event.target as HTMLElement;
    this.#currentTarget.addEventListener("keydown", this.#keyDownHandler);
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
            onClick={(e) => {
              this.onKeyDown(e, index);
            }}
          >
            {item.content}
          </span>
        ) : (
          <span
            data-content-id={item.index}
            style={item?.style}
            key={key}
            tabIndex={0}
            onClick={(e) => {
              this.onKeyDown(e, index);
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
  ) {
    const {
      index: indexCurrent,
      depth: depthCurrent,
      indexContent: indexContentCurrent,
    } = getNodePosition(content.index);

    console.log(`=========== отладка ${content.index}`);
    console.log("index", index);
    console.log("depth", depth);
    console.log("indexContent", indexContent);
    console.log("content", content);
    console.log("selection", selection);
    console.log("indexCurrent", indexCurrent);
    console.log("depthCurrent", depthCurrent);
    console.log("indexContentCurrent", indexContentCurrent);
    console.log("===========");

    if (depth === depthCurrent && indexContent === indexContentCurrent) {
      if (selection.anchor === 0 && selection.focus === content.text?.length) {
        content.content = content.text;
        return content;
      } else {
        const string: string = content.content;
        const beforeSelection = {
          index: `${index}_${depthCurrent + 1}_0`,
          type: "text",
          text: string.slice(0, selection.anchor),
          content: string.slice(0, selection.anchor),
        };

        const selectedText = {
          index: `${index}_${depthCurrent + 1}_1`,
          type: "text",
          text: string.slice(selection.anchor, selection.focus),
          content: string.slice(selection.anchor, selection.focus),
        };

        const afterSelection = {
          index: `${index}_${depthCurrent + 1}_2`,
          type: "text",
          text: string.slice(selection.focus, content.text?.length),
          content: string.slice(selection.focus, content.text?.length),
        };

        content.content = [beforeSelection, selectedText, afterSelection];

        return selectedText;
      }
    } else if (depth !== 0 && Array.isArray(content.content)) {
      let offset = 0;

      for (const con of content.content) {
        const result = this.ddwwa(index, depth, indexContent, con, {
          anchor: selection.anchor - offset,
          focus: selection.focus - offset,
        });

        if (result !== null) {
          return result;
        }

        offset += con.text?.length ?? 0;
      }
    }

    return null;
  }

  updateStyle(
    id: string,
    style: object,
    selection: { anchor: number; focus: number },
  ) {
    const type = style.style;
    const value = style.value;

    const { index, depth, indexContent } = getNodePosition(id);

    console.log(index, ":", depth, ":", indexContent);

    const s = this.#contents[index];
    console.log(s, "after");

    const content = this.ddwwa(
      index,
      depth,
      indexContent,
      this.#contents[index],
      selection,
    );

    console.log(this.#contents[index], "befor");

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
