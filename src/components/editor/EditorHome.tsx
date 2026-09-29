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
      <div className="editor-home__separator">Вставка и отмена</div>
      <div className="editor-home__text editor-home__separator">
        <div className="editor-home__font">
          <select>
            <option>нет шрифтов</option>
          </select>
          <input type="number" defaultValue={10} />
          <button className="icon">A^</button>
          <button className="icon">A_</button>
          <button className="icon">Aa</button>

        </div>

        <button className="icon">Ж</button>
        <button className="icon">К</button>

        <button className="icon">Ч</button>
        <button className="icon">Т</button>
        <button className="icon">A<sub>2</sub></button>
        <button className="icon">A<sup>2</sup></button>

              <button className="icon">F</button>

        <button
          className="icon text-color"
          onClick={() => handle("text", "color", "green")}
        >
          <div>A</div>
          <div
            className="text-color__indicator"
            style={{ background: "green" }}
          ></div>
        </button>
      
      </div>

      <div className="editor-home__lists editor-home__separator">
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

      <div className="editor-home__formatting editor-home__separator">
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

      <div></div>
    </div>
  );
}

export default EditorHome;
