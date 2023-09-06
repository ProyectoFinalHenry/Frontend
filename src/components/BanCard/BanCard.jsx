import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TbAlertTriangleFilled } from 'react-icons/tb'
import './BanCard.css'



const BanCard = () =>{

    const location = useLocation();

    const [isBanned, setIsBanned] = useState(false);
    let banned = true;

    const handlerButton = () => {
        setIsBanned(true);
    }


    const rutasProhibidas = [
        '/',
        '/shoppingCart',
        '/detail',     // Rutas que comienzan con /detail
        '/ejemplo',    // Rutas que comienzan con /detail
      ];

    // Verifica si la ruta actual coincide con alguna de las rutas prohibidas
    const esRutaProhibida = rutasProhibidas.some((ruta) => {
        if (ruta === location.pathname || location.pathname.startsWith('/detail')) {
            banned = false;
        return true;
        }
        return false;
    });

    // CÓDIGO QUE QUEDA FUNCIONAL
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        // Cuando el componente se desmonta, elimina la clase para habilitar el scroll nuevamente
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);

    return(
        <div className={`banCard-container ${isBanned && banned? 'banCard-container-hide' : ''}`}> {/* //{'banCard-container ' + isBanned ? 'banCard-container-hide' : ''} > */}
            <div className="ban-card">
                <div className="ban-card-icon">
                    <TbAlertTriangleFilled />
                </div>
                <h2 className="ban-card-h2">Tu cuenta ha sido suspendida</h2>
                <p className="ban-card-p">
                    Tu cuenta en Grano de Oro ha sido suspendida por estar relacionada con actividades que violan nuestros <span className="ban-card-span">Términos de uso.</span>
                    Por reclamos, contáctese a <a href="#" className="ban-card-link">granodeoro@gmail.com</a>
                </p>


                {!esRutaProhibida && 
                <button className="ban-card-button" onClick={handlerButton}>Aceptar</button>}

            </div>
        </div>
    )
};


export default BanCard;