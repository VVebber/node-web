class NoteWindow {
  #style: React.CSSProperties;
  #setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;

  constructor(
    style: React.CSSProperties,
    setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  ) {
    this.#style = style;
    this.#setStyle = setStyle;
  }

  #drag: {
    mouseX: number;
    mouseY: number;
    blockX: number;
    blockY: number;
  } | null = null;
  exp(event) {
    const block = event.currentTarget.parentElement as HTMLElement;

    if (!block) return;

    this.#drag = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      blockX: block.offsetLeft,
      blockY: block.offsetTop,
    };

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove = (event) => {
    if (!this.#setStyle) return;
    if (!this.#drag) return;

    const { mouseX, mouseY, blockX, blockY } = this.#drag;

    const dx = event.clientX - mouseX;
    const dy = event.clientY - mouseY;

    this.#setStyle((prev) => ({
      ...prev,
      left: `${blockX + dx}px`,
      top: `${blockY + dy}px`,
    }));
  };

  handleMouseUp = () => {
    this.#drag = null;

    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  };
}

export default NoteWindow;
