import { useEffect, useState } from "react";
import { Link } from "react-router";
import NotebookText from "../components/icons/home/notebook-text";
import { createNode, fetchNode, type NoteBlock } from "../api/note";

function Home() {
  const [mas, setMas] = useState<NoteBlock[]>([]);  

  useEffect(()=>{
      fetchNode().then(res=> setMas([...res]));
  }, [])

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
              placeholder="Название заметки..."
              value={item.title}
            />
          </div>

          <button
            className="deleteButton"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // здесь удаление
              console.log("Удалить:", item);
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
