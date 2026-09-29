import ListIcon from "../icons/EditorHome/list";
import ListOrderedIcon from "../icons/EditorHome/list-ordered";
import "./EditorHome.css";

function EditorHome({
  handle,
}: {
  handle: (type: string, style: string, value: string) => void;
}) {
  return (
    <div className="editor-home">
      <div>Вставка и отмена</div>
      <div>
        <select>
          <option>нет шрифтов</option>
        </select>
        <input type="number" defaultValue={10} />

        <button className="icon text-color"
         onClick={() => handle("text", "color", "green")}>
          <div>A</div>
          <div
            className="text-color__indicator"
            style={{ background: "green" }}
          ></div>
        </button>
        <button className="icon text-color"
         onClick={() => handle("text", "color", "blue")}>
          <div>A</div>
          <div
            className="text-color__indicator"
            style={{ background: "blue" }}
          ></div>
        </button>
        <button className="icon text-color"
         onClick={() => handle("text", "color", "red")}>
          <div>A</div>
          <div className="text-color__indicator"></div>
        </button>
      </div>

      <div className="editor-home__lists">
        <button className="icon">
          <ListIcon />
        </button>
        <button className="icon">
          <ListOrderedIcon />
        </button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
      </div>

      <div className="editor-home__formatting">
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
        <button className="icon"></button>
      </div>

      <div>
        <div>
          <div></div>
        </div>
        <p>Стили</p>
      </div>

      <div>
      </div>
    </div>
  );
}

export default EditorHome;
