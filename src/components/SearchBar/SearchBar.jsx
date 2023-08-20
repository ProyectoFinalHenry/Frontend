import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import { updateActualSearch } from '../../store/reducers/products/productsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value); // Solo establece el valor del término de búsqueda
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateActualSearch(searchTerm));
    setSearchTerm(''); // Limpia el valor del input
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
        />
        <button className='buttonsb' type="submit">
          <img className='imgsb' src="https://i.postimg.cc/X7QvyvYS/image.png" alt="Buscar" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
