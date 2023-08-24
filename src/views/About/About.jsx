import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <p className="about-p-banner">
          "El café es un viaje milagroso que cruza culturas, fronteras y
          complejas políticas, uniendo a todos en esta taza aromática y
          reconfortante"
        </p>
        <img
          className="about-banner-img"
          src="/assets/images/about-banner-3.png"
          alt="imagen banner"
        />
      </div>

      <article className="about-article">
        <div className="about-article-text-cont">

          <h1 className="about-article-h1">Nuestra Historia</h1>
          <p className="about-article-subtitle">
            Una Pasión que Despierta Sentidos
          </p>
          <p className="about-article-p">
            En cada taza de café, hay una historia: el aroma de la perseverancia y
            el sabor del éxito. Bienvenidos a Grano de Oro, donde nuestra pasión
            por el café refleja un viaje de crecimiento y superación. Comenzamos
            humildemente, compartiendo nuestro amor por el café entre amigos, y
            ese amor se convirtió en un sueño: llevar la experiencia del café a
            todo el mundo.
          </p>
          <p className="about-article-p">
            Superamos desafíos, establecimos relaciones con caficultores
            comprometidos y perfeccionamos cada tostado. Ofrecemos una selección
            excepcional de cafés premium de todo el mundo, elegidos con cuidado.
            En Grano de Oro, creemos que el café es un lenguaje universal que
            conecta personas y culturas. Cada taza que disfrutas es parte de
            nuestra historia compartida.
          </p>
          <p className="about-article-p">
            Te damos la bienvenida a Grano de Oro. Únete a nuestro viaje aromático
            mientras elevamos tus momentos cotidianos a experiencias
            extraordinarias.
          </p>
          <p className="about-article-end">
            ¡Brindemos por el café y los momentos inolvidables!
          </p>
        </div>
        <img src="/assets/images/about-article-img.png" alt="imagen artículo" className="about-article-img" />
      </article>
    </div>
  );
}


/* 
 <>
      <div className="about__container">
        <div className="about__container-info">
          <h1 className="about__container-info-title">Nuestra Historia</h1>
          <h2 className="about__container-info-subtitle">
            Una Pasión que Despierta Sentidos
          </h2>
          <div className="about__container-info-text">
            <p>
              En el corazón de cada taza de café hay una historia que contar,
              una historia que lleva consigo el aroma de la perseverancia y el
              sabor dulce del éxito. Bienvenidos a Grano de Oro, donde nuestra
              pasión por el café no solo nutre tus sentidos, sino que también
              refleja un viaje de crecimiento y superación.
            </p>
            <p>
              Nuestra historia comenzó en un rincón humilde, donde un grupo de
              amantes del café compartía su amor por esta bebida aromática y
              estimulante. Lo que inició como conversaciones apasionadas entre
              amigos se convirtió en un sueño compartido: llevar la experiencia
              del café a todos los rincones del mundo. No fue un camino fácil;
              enfrentamos desafíos que nos desafiaron a crecer y aprender. Pero,
              como los granos de café que maduran bajo el sol, encontramos
              fuerza en la adversidad y evolucionamos.
            </p>
            <p>
              La superación se convirtió en nuestra brújula. Desde establecer
              relaciones directas con caficultores comprometidos con la calidad
              y la sostenibilidad, hasta perfeccionar meticulosamente cada
              tostado para resaltar las notas únicas de cada grano, hemos estado
              dedicados a superar expectativas y elevar la experiencia del café
              a nuevas alturas.
            </p>
            <p>
              Ya sea que estés buscando un café suave y afrutado para las
              mañanas serenas o un espresso intenso para avivar tus sentidos,
              cada opción en nuestro catálogo ha sido cuidadosamente elegida
              para ofrecerte lo mejor. A medida que exploras nuestro e-commerce,
              esperamos que sientas la dedicación y el amor que hemos vertido en
              cada detalle.
            </p>
            <p>
              En Grano de Oro, no solo te ofrecemos una selección excepcional de
              cafés premium de todo el mundo, sino que también te invitamos a
              unirte a nuestra apasionada comunidad. Creemos que el café es más
              que una bebida; es un lenguaje universal que conecta personas,
              culturas y momentos especiales. Cada taza que disfrutas es una
              parte de nuestra historia compartida.
            </p>
            <p>
              Te damos la bienvenida a Grano de Oro. Únete a nosotros en este
              viaje aromático y delicioso mientras continuamos escribiendo
              nuestra historia con cada taza que compartimos. Juntos, elevaremos
              tus momentos cotidianos a experiencias extraordinarias.
            </p>
            <h3 className="about__container-info-text-farewell">¡Salud y café para todos!</h3>
            <span>Fundadores:</span>
          </div>
        </div>
      </div>
    </>
*/