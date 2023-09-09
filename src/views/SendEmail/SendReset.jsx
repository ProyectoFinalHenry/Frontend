import Email from "../../components/InputEmail/Email";
import "./Send.css";

const SendReset = () => {
  const route = "user/send/restorePassword";
  const h2 = "Restablecer contraseña";
  const p =
    "Dejanos ayudarte, ingresa tu correo electrónico para poder enviarte un correo de restablecimiento de contraseña";
  const button = "Enviar correo de restablecimiento";
  const redirec = "/auth/sing-in";

  return (
    <div id="container_sendReset">
      <Email route={route} h2={h2} p={p} button={button} redirec={redirec} />
    </div>
  );
};

export default SendReset;
