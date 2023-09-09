import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Email.css";

const Email = ({ route, h2, p, button, redirec }) => {
  const [value, setvalue] = useState("");
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const email = e.target.value.trim();
    setvalue(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = (
        await axios.post(route, {
          email: value,
        })
      ).data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: status,
        showConfirmButton: false,
        timer: 3000,
      });
      setvalue("");
      setTimeout(() => {
        navigate(redirec);
      }, 3000);
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div id="container_email">
      <form onSubmit={handleSubmit}>
        <div id="top_email">
          <h2>{h2}</h2>
          <p>{p}</p>
        </div>
        <div id="bottom_email">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={value}
            onChange={handleChange}
          />
          <button id="button_email" type="submit" disabled={error}>
            {button}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Email;
