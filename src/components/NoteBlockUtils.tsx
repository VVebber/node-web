import { useRef, useState } from "react";
import {
  getCaretPosition,
  getRelativeMousePosition,
} from "../utils/editorUtils";

export interface Content {
  id: string;
  text?: string;
  type: string;
  content?: string | Content[];
  style?: object;
}

export class Contents {
  #contents: Content[] = [];

  #update: (() => void) | null = null;

  constructor(update: () => void) {
    this.#update = update;
  }

  addContent() {
    this.#contents.push({
      id: `${this.#contents.length}_1`,
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
            data-content-id={item.id}
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
            data-content-id={item.id}
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
    content: Content,
    selection: { anchor: number; focus: number },
  ) {
    if (selection.anchor === 0 && selection.focus === content.text?.length) {
      content.content = content.text;
      return content;
    } else {
      const string: string = content.content;
      const beforeSelection = {
        id: `${index}_${index + 1}`,
        type: "text",
        content: string.slice(0, selection.anchor),
      };

      const selectedText = {
        id: `${index}_${index + 1}`,
        type: "text",
        content: string.slice(selection.anchor, selection.focus),
      };

      const afterSelection = {
        id: `${index}_${index + 1}`,
        type: "text",
        content: string.slice(selection.focus, content.text?.length),
      };

      content.content = [beforeSelection, selectedText, afterSelection];

      console.log(content)

      return selectedText;
    }
  }

  updateStyle(
    id: string,
    style: object,
    selection: { anchor: number; focus: number },
  ) {
      
    const type = style.style;
    const value = style.value;

    const { index, depth } = getNodePosition(id);

    const content = this.ddwwa(index, depth, this.#contents[index], selection);

    
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
  const match = id.match(/^(\d+)_(\d+)$/);

  if (!match) return;

  const index = Number(match[1]);
  const depth = Number(match[2]);

  return { index, depth };
}
