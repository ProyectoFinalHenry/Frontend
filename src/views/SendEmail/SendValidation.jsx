import Email from "../../components/InputEmail/Email";
import "./Send.css";

const SendValidation = () => {
  const route = "user/send/validation";
  const h2 = "Verificar correo";
  const p =
    "Pon tu correo registrado para poder verificar que eres tu";
  const button = "Enviar verificacion";
  const redirec = "/products/page/1";
  return (
    <div id="container_sendReset">
      <Email route={route} h2={h2} p={p} button={button} redirec={redirec} />
    </div>
  );
};

export default SendValidation;
