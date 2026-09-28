import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import NotesPage from "./pages/NotesPage";

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home /> } />

        <Route path="notesPage" element={<NotesPage/>} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
