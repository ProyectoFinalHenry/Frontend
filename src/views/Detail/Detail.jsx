import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const params = useParams();
  const { id } = params;
  const [coffee, setCoffee] = useState([]);

  useEffect(() => {
    async function getCoffeData() {
      const { data } = await axios.get(`http://localhost:3002/coffee/${id}`);
      setCoffee(data);
    }
    getCoffeData();
  }, [id]);

  return (
    <div className="detail__container">
<div className="detail__container-card">
<div className="detail__container-card-info">
        <h1 className="name">{coffee?.name}</h1>
        <span className="price">$ {coffee?.price}</span>
        <h3 className="type">{coffee?.TypeOfCoffee?.type}</h3>
        <p className="description">{coffee?.description}</p>
        <span className="stock">{coffee?.stock} units</span>
      </div>
      <img className=".detail__container-card-img" src={coffee?.image} alt={coffee?.name} style={{ maxWidth: '330px' }} />
</div>
    </div>
  );
};

export default Detail;
