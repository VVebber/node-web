import { useEffect, useState } from "react";
import { Link } from "react-router";
import NotebookText from "../components/icons/home/notebook-text";
import {
  createNode,
  deleteNode,
  fetchNode,
  updateNode,
  type NoteBlock,
} from "../api/note";

function Home() {
  const [mas, setMas] = useState<NoteBlock[]>([]);

  useEffect(() => {
    fetchNode().then((res) => setMas([...res]));
  }, []);

  async function addMas(event) {
    if (event.defaultPrevented) {
      return;
    }

    const res = await createNode({ title: "ddd", description: "3dd" });

    const note: NoteBlock = {
      id: Number(res.id),
      title: "Заметка",
      description: "",
    };

    setMas([...mas, note]);
  }

  function createNodeHTML(item: NoteBlock, index: number) {
    return (
      <Link to="notesPage" className="nodeItem" key={index}>
        <div className="nodeHeader">
          <div className="nodeTitle">
            <span className="nodeType">{item.type}</span>

            <input
              type="text"
              onClick={(e) => e.preventDefault()}
              onChange={(e) => {
                const value = e.target.value;

                setMas((prev) =>
                  prev.map((note) => {
                    return note.id === item.id
                      ? { ...note, title: value }
                      : note;
                  }),
                );
              }}
              onBlur={() => updateNode(item)}
              placeholder="Название заметки..."
              value={item.title}
            />
          </div>

          <button
            className="deleteButton"
            onClick={(e) => {
              e.preventDefault();
              if (item.id !== undefined) {
                deleteNode(item.id);
              
                setMas(prev=> 
                  prev.filter(node => {
                    if(node.id !== item.id)
                      return node; 
                  })
                )
              }
            }}
            title="Удалить"
          >
            ×
          </button>
        </div>

        <div className="nodeDescription">
          <span>Описание</span>

          <textarea
            onClick={(e) => e.preventDefault()}
            onChange={(e) => {
              const value = e.target.value;

              setMas((prev) =>
                prev.map((note) => {
                  return note.id === item.id
                    ? { ...note, description: value }
                    : note;
                }),
              );
            }}
            onBlur={(e) => console.log(e.target.value, "333333")}
            placeholder="Добавьте описание..."
            value={item.description}
          />
        </div>
      </Link>
    );
  }

  return (
    <>
      <header>Заметки</header>
      <main>
        <div>
          <button onClick={(e) => addMas(e, "Заметки")}>
            <NotebookText />
          </button>
          {/* <button onClick={(e) => addMas(e, "Папка")}>2+</button> */}
          {/* <button onClick={addMas}>+</button> */}
        </div>

        <div className="nodeList">
          {mas.map((item, index) => createNodeHTML(item, index))}
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default Home;
