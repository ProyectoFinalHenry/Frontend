import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchProducts, clearFilters } from '../../store/reducers/products/productsSlice';
import { Link, useParams, useNavigate  } from 'react-router-dom'; 
import Card from '../../components/Card/Card';
import PaginationButtons from '../../components/PaginationButtons/PaginationButtons'; 
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import './Home.css'
import Spinner from '../../components/Spinner/Spinner';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton' 
import Slideshow from './Slider.jsx'



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
    setCurrentPage(1); 
    navigate(`/products/page/1`); 
    dispatch(clearFilters());
  };



  const customTransitionStyle = {
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  };

  return (
    <div className="home-container">

      <div className="home-banner">
        <p className='home-banner-msj text-shadow'>NUESTROS PRODUCTOS</p>
        <SearchBar />
        <div className="home-banner-img">
          <img  src="/assets/images/about-banner-1.png" alt="imagen banner" />
        </div>
      
        {/* <img className="home-banner-img home-banner-img-current" src="/assets/images/about-banner-1.png" alt="imagen banner" />
        <img className="home-banner-img home-banner-img-current" src="/assets/images/about-banner-2.png" alt="imagen banner" />
        <img className="home-banner-img home-banner-img-current" src="/assets/images/about-banner-3.png" alt="imagen banner" />  */}
      </div>

    
      <div className="home-card-panel-container">
        <div className="home-filters-cont">

        <Filters handleClearFilters={handleClearFilters} />
        </div>

        <div className="home-card-container">

        {productRender[0] === 'not found' ? (

          <div className="home-not-found-cont">
            <img src="/assets/images/not-found-home.png" alt="not found" />
            <h2>NO HAY RESULTADOS PARA TU BÚSQUEDA</h2>
          </div>

        ) : (
          <>
            {loading ? (
              <div className="home-spinner-cont">
                <Spinner />
              </div>
            ): (
              <div className='home-card-container'>
                {visibleProduct.map((product) => (
                  <Link to={`/detail/${product.id}`} key={product.id}>
                    <Card
                      id={product.id}
                      image={product.image}
                      title={product.name}
                      price={product.price}
                      reviews={product.Reviews}
                      stock={product.stock}
                    />
                  </Link>
                ))}
              </div>
            )}
            <ScrollToTopButton />
          </>
        )}
        

        </div>

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