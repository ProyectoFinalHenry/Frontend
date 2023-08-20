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


const Home = () => {

    //PAGINATION:
    //const productRender = useSelector((state) => state.filtredPeople);
    const productRender = db;

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

 

  return (
    <div className="home-container">
      <div className="home-banner">
        <p className='home-banner-msj'>NUESTROS PRODUCTOS</p>
        <SearchBar />
        <img className='home-image-banner' src="/assets/images/bannere-home.webp" alt="banner" />
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
                    />
                  </Link>
                ))}
              </div>
            )}
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