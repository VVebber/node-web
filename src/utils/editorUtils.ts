export function getRelativeMousePosition(event: any, target = null) {


  const rect = target === null? event.currentTarget.getBoundingClientRect():
  target.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

export function getCaretPosition(event){

    const range = document.caretPositionFromPoint(event.clientX, event.clientY);

    if (!range) return -1;
      return range.offset

}