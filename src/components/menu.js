import React, { useState, useEffect } from "react";
import { fetchCategories } from "../services/recipes.service";

function Menu() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value === "All" ? "" : value);
  };

  const handleSearch = () => {
    console.log(`Search for '${title}' in category '${category}'`);
  };

  return (
    <div className="App">
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Dessert">Dessert</option>
            <option value="Plat principal">Plat principal</option>
            <option value="Entrée">Entrée</option>
          </select>
        </label>
        <button onClick={handleSearch} style={{ marginLeft: "15px" }}>
          Search
        </button>
      </div>
      <br />
      
    </div>
  );
}

export default Menu;
