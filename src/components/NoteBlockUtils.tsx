import { useState } from "react";

export interface Content {
  id: string;
  type: string;
  content?: string | Content;
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

  render(item: Content, update: ()=>void) {
    switch (item.type) {
      case "text":
        if (Array.isArray(item.content))
          return item.content.map((item) => this.render(item));

        return (
          <span
            data-content-id={item.id}
            style={item?.style}
            tabIndex={0}
            onKeyDown={(event) => {
              console.log(event.key);
              item.content += event.key
              console.log(item.content)
              update()
            }}
          >
            {item.content}
          </span>
        );
    }
  }
}

export function hanleInput(event) {
  console.log(event);
}

export function getNodePosition(id: string) {
  const match = id.match(/^(\d+)_(\d+)$/);

  if (!match) return;

  const index = Number(match[1]);
  const depth = Number(match[2]);

  return { index, depth };
}
