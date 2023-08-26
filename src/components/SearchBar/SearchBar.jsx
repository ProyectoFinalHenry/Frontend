import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import { updateActualSearch } from '../../store/reducers/products/productsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const loading = useSelector((state) => state.product.loading); // Obtener el estado de loading

  console.log(loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateActualSearch(searchTerm));
    setSearchTerm('');
    navigate(`/products/page/${1}`);
  };

  return (
    <div className='sbcontainer'>
      <form className='formsb' onSubmit={handleSubmit}>
        <input
          className='inputsb'
          type="search"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleChange}
          disabled={loading} // Desactiva el input cuando loading es true
        />
        <button className='buttonsb' type="submit" disabled={loading}> {/* Desactiva el botón cuando loading es true */}
          <img className='imgsb' src="https://i.postimg.cc/X7QvyvYS/image.png" alt="Buscar" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
