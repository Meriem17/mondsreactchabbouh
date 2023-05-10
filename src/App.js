import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import RecipeList from "./components/recepie";
import RecipeUpdate from "./components/updateRecepie";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id/update" element={<RecipeUpdate />} />

      </Routes>
    </Router>
  );
}

export default App;
