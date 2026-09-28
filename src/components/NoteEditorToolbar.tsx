function NoteEditorToolbar({handleEditorSettingsChange}) {

    function handle(type, style, value) {
        handleEditorSettingsChange({
            type,
            style,
            value
        })
    }

    
  return (
    <header>
      <div>Главная</div>
      <div>
        размер
        <input type="number" defaultValue={10}></input>
        <div>
          <button>таблица</button>
          <input type="number" defaultValue={10}></input>
          <input type="number" defaultValue={10}></input>
        </div>
        <div>
            <p>цвета</p>
            <button onClick={()=> handle('text', 'color', 'red')}>r</button>
            <button onClick={()=> handle('text', 'color', 'green')}>g</button>
        </div>
      </div>
    </header>
  );
}

export default NoteEditorToolbar;
