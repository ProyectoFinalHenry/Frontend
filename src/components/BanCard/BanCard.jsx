import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TbAlertTriangleFilled } from 'react-icons/tb'
import { useDispatch , useSelector} from "react-redux";
import Swal from "sweetalert2";
import { getDeleteToken, getLogOut,  } from "../../store/reducers/Login";
import { deleteCart } from "../../store/reducers/shopping/shopping";
import logOut from "../../functions/logOut";
import './BanCard.css'



const BanCard = () =>{

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isBanned, setIsBanned] = useState(false);
    let banned = true;

    const handlerButton = () => {
        
    Swal.fire({
        position:"center",
        text:'Estas seguro que quieres cerrar Sesion',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Si cerrar',
        confirmButtonColor:"#00F",
        cancelButtonText:'No cerrar'
      }).then(result =>{
        if(result.isConfirmed){
          Swal.fire('Adios','Esperamos verte aqui',"success")
          setTimeout(() =>{
            logOut()
            dispatch(getLogOut())
            dispatch(deleteCart())
            dispatch(getDeleteToken())
            /* setAccount(false) */
            localStorage.removeItem('tokens')
            /* navigate('/') */
            window.location.href = '/'
          },1000)
        }
      })
     
    
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


                {/* !esRutaProhibida &&  */
                <button className="ban-card-button" onClick={handlerButton}>Aceptar</button>}

            </div>
        </div>
    )
};


export default BanCard;