import { useRef, useState } from "react";
import { getRelativeMousePosition } from "../utils/editorUtils";

export interface Content {
  id: string;
  type: string;
  content?: string | Content[];
  style?: object;
}

export class Contents {
  #contents: Content[] = [];

  addContent() {
    this.#contents.push({
      id: `${this.#contents.length}_1`,
      type: "text",
      content: `text_${this.#contents.length}`,
    });
  }

  contents(): Content[] {
    return this.#contents;
  }

  render(item: Content, update: () => void): React.ReactNode {
    switch (item.type) {
      case "text":
        if (Array.isArray(item.content))
          return item.content.map((item) => this.render(item, update));

        return (
          <span
            data-content-id={item.id}
            style={item?.style}
            tabIndex={0}
            onKeyDown={(event) => {
              console.log(event.key);
              item.content += event.key;

              update();
            }}
          >
            {item.content}
          </span>
        );
    }
  }

  updateStyle(index: number, style: object) {
    const type = style.style;
    const value = style.value;

    this.#contents[index].style = {
      ...this.#contents[index].style,
      [type]: value,
    };
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
