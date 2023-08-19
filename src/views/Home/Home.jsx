import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchProducts, clearFilters } from '../../redux/slides/products/productsSlice';
import { Link, useParams, useNavigate  } from 'react-router-dom'; 
import Card from '../../components/Card/Card';
import PaginationButtons from '../../components/PaginationButtons/PaginationButtons'; 
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import './Home.css'



const Home = () => {
  const products = useSelector((state) => state.product.product);
  const filtredProducts = useSelector((state) => state.product.filtredProducts);
  const loading = useSelector((state) => state.product.loading);
  const productRender = filtredProducts ? filtredProducts : products;



  let { page } = useParams();
  const navigate = useNavigate();
  const pageNumber = page ? parseInt(page) : 1;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(productRender.length / itemsPerPage);
  const visibleProduct = productRender.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClearFilters = () => {
    setCurrentPage(1); // Establece currentPage en 1
    navigate(`/products/page/1`); // Navega a la página 1
    dispatch(clearFilters()); // Llama a la acción para limpiar los filtros
  };

  if (loading) {
    return <p>Loading...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="home-container">
      <div className="home-banner">
        <p className='home-banner-msj'>NUESTROS PRODUCTOS</p>
        <SearchBar />
        <img className='home-image-banner' src="/assets/images/bannere-home.webp" alt="banner" />
      </div>

      <Filters handleClearFilters={handleClearFilters} />

      <div className="home-card-container">
        {visibleProduct.map((product) => (
          <Link to={`/detail/${product.id}`} key={product.id}>
            <Card
              id={product.id}
              image={product.image}
              title={product.name}
              price={product.price}
            />
          </Link>
        ))}
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;