import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { token } = useParams();

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleChangeConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

  const validatePassword = (newPassword, newConfirmPassword) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      setError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número"
      );
      setButtonDisabled(true);
    } else if (newPassword !== newConfirmPassword) {
      setError("Las contraseñas no coinciden");
      setButtonDisabled(true);
    } else {
      setError("");
      setButtonDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = (
        await axios.post("user/resetPassword", {
          token,
          newPassword: password,
        })
      ).data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: status,
        showConfirmButton: false,
        timer: 3000,
      });

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/auth/sing-in");
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
    <div id="reset_container">
      <form onSubmit={handleSubmit} id="reset_form">
        <h2>Cambiar contraseña</h2>
        <div id="reset_inputs">
          <label htmlFor="password">Nueva contraseña:</label>
          <input
            type="password"
            className="reset_password"
            value={password}
            onChange={handleChangePassword}
          />
          <br />
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            className="reset_password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
        </div>
        {error && <p>{error}</p>}
        <button id="button_reset" type="submit" disabled={buttonDisabled}>
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
