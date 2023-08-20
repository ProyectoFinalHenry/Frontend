import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/reducers/categoriesSlice/categoriesSlice'; 
import { filtredProducts, fetchProducts, clearFilters } from '../../store/reducers/products/productsSlice';
import './Filters.css';

function Filters({ handleClearFilters }) { // Recibe handleClearFilters como prop

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    origin: '',
    roastingProfile: '',
    typeOfCoffee: '',
    priceMin: false,
    priceMax: false,
  });

  const { origin: originCategories, roastingProfile: roastingProfileCategories, typeOfCoffee: typeOfCoffeeCategories } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFilterChange = (event, filterKey) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

  const handlePriceSorts = (event) => {
    const { value } = event.target;
    setFilters({
      ...filters,
      priceMin: value === "asc",
      priceMax: value === "desc"
    });
  };

  const handleApplyFilters = () => {
    // Código para aplicar los filtros
    dispatch(filtredProducts(filters));
    navigate(`/products/page/${''}`);
  };

  const handleClearFiltersLocal = () => {
    handleClearFilters(); // Llama a la función recibida como prop desde Home
    setFilters({
      origin: '',
      roastingProfile: '',
      typeOfCoffee: '',
      priceMin: false,
      priceMax: false,
    });
    navigate(`/products/page/${1}`);
    dispatch(clearFilters()); // Llama a la acción para limpiar los filtros
    dispatch(fetchProducts()); // Vuelve a cargar los productos
  };

  return (
    <div className="filters-container">
      <div className="filters-group">
        <div className="filter-item">
          <label>Tipo de café:</label>
          <select className="filters-select" onChange={(e) => handleFilterChange(e, "typeOfCoffee")}>
            <option value="">Todos</option>
            {typeOfCoffeeCategories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Origen:</label>
          <select className="filters-select" onChange={(e) => handleFilterChange(e, "origin")}>
            <option value="">Todos</option>
            {originCategories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.origin}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Perfil de tostado:</label>
          <select className="filters-select" onChange={(e) => handleFilterChange(e, "roastingProfile")}>
            <option value="">Todos</option>
            {roastingProfileCategories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.profile}
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
      </div>

      <div className="filters-buttons">
        <button className="filters-button" onClick={handleClearFiltersLocal}>
          Limpiar
        </button>
        <button className="filters-button" onClick={handleApplyFilters}>
          Aplicar
        </button>
      </div>
    </div>
  );
}

export default Filters;
