import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import PaginationButtons from "../../components/PaginationButtons/PaginationButtons";
import "./Home.css";
import axios from "axios";

const Home = () => {
  //PAGINATION:
  //const productRender = useSelector((state) => state.filtredPeople);
  const [product, setProducts] = useState([]);

  useEffect(()=>{
    async function getProducts(){
      const {data} = await axios.get("http://localhost:3001/coffee/")
      setProducts(data)
    }
    getProducts()
  },[])

  const { page } = useParams();

  const pageNumber = page ? parseInt(page) : 1;
 
  const [currentPage, setCurrentPage] = useState(pageNumber);
 
  const itemsPerPage = 8;
 
  const totalPages = Math.ceil(product.length / itemsPerPage);

  const visibleProduct = product.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="home-container">
      <div className="home-banner">
        <p className="home-banner-msj">NUESTROS PRODUCTOS</p>
        <img
          className="home-image-banner"
          src="/assets/images/bannere-home.webp"
          alt="banner"
        />
      </div>

      <div className="home-card-container">
        {visibleProduct.map((product) => (
          <Link to={`/detail/${product.id}`} key={product.id}>
            <Card
              id={product.id}
              image={product.image}
              title={product.name}
              /* reviews={product.height} */
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
