import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [mas, setMas] = useState([]);

  function addMas(event, type: string){
    if(event.defaultPrevented){
      console.log('daw')
      return
    }
    setMas([...mas, { type: type }])
  }

    return (
      <>
        <header>Заметки</header>
        <main>
          <button onClick={(e) => addMas(e, "Заметки")}>1+</button>
          <button onClick={(e) => addMas(e, "Папка")}>2+</button>
          {/* <button onClick={addMas}>+</button> */}

          <div className="nodeList">
            {mas.map((item) => (
              <Link to='notesPage' className="nodeItem">
                <div>{item.type}:</div>
                <div>Описание: </div>
              </Link>
            ))}
          </div>
        </main>

        <footer></footer>
      </>
    );
}


export default Home;