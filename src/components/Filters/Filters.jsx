import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Filtes.css'

const categories = [
  { id: 1, name: "Categoría 1" },
  { id: 2, name: "Categoría 2" },
  { id: 3, name: "Categoría 3" },
];

const typeOfCoffeeOptions = [
  { id: 1, name: "Tipo de café 1" },
  { id: 2, name: "Tipo de café 2" },
  { id: 3, name: "Tipo de café 3" },
];

const originOptions = [
  { id: 1, name: "Origen 1" },
  { id: 2, name: "Origen 2" },
  { id: 3, name: "Origen 3" },
];

const roastingProfileOptions = [
  { id: 1, name: "Perfil de tostado 1" },
  { id: 2, name: "Perfil de tostado 2" },
  { id: 3, name: "Perfil de tostado 3" },
];

function Filters() {
  const [price, setPrice] = useState({ min: "", max: "" });

  const navigate = useNavigate();

  const handlecategories = (event) => {
    const { value } = event.target;
    // Tu código para manejar las categorías seleccionadas
  };

  const handleTypeOfCoffee = (event) => {
    const { value } = event.target;
    // Tu código para manejar el tipo de café seleccionado
  };

  const handleOrigin = (event) => {
    const { value } = event.target;
    // Tu código para manejar el origen seleccionado
  };

  const handleRoastingProfile = (event) => {
    const { value } = event.target;
    // Tu código para manejar el perfil de tostado seleccionado
  };

  const handlePriceSorts = (event) => {
    const { value } = event.target;
    // Tu código para manejar el orden por precio seleccionado
  };


  const handleMaxPriceChange = (event) => {
    const { value } = event.target;
    setPrice({ ...price, max: value });
    // Tu código para manejar el cambio de precio máximo
  };

  const handlerClean = () => {
    // Tu código para limpiar los filtros
  };

  const handleAplicarClick = () => {
    // Tu código para aplicar los filtros
    navigate(`/productos/page/${1}`);
  };

  return (
    <div className="filters-container">

      <div className="filters-group">
        <div className="filter-item">
          <label>categorías:</label>
          <select className="filters-select" onChange={handlecategories}>
            <option value="Todas">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>tipo de café:</label>
          <select className="filters-select" onChange={handleTypeOfCoffee}>
            <option value="Todos">Todos</option>
            {typeOfCoffeeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>origen:</label>
          <select className="filters-select" onChange={handleOrigin}>
            <option value="Todos">Todos</option>
            {originOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>perfil de tostado:</label>
          <select className="filters-select" onChange={handleRoastingProfile}>
            <option value="Todos">Todos</option>
            {roastingProfileOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Ordenar precio por:</label>
          <select className="filters-select" onChange={handlePriceSorts}>
            <option value="Ninguno">Ninguno</option>
            <option value="asc">Menor</option>
            <option value="desc">Mayor</option>
          </select>
        </div>


      <div className="filters-buttons">
        <button className="filters-button" onClick={handlerClean}>
          Limpiar
        </button>
        <button className="filters-button" onClick={handleAplicarClick}>
          Aplicar
        </button>
      </div>
      
      </div>
      
    </div>
  );
}

export default Filters;
