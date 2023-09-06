import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TbAlertTriangleFilled } from 'react-icons/tb'
import './BanCard.css'



const BanCard = () =>{

    const [isBanned, setIsBanned] = useState(false);

    const handlerButton = () => {
        setIsBanned(true);
    }

    return(
        <div className="banCard-container"> {/* //{'banCard-container ' + isBanned ? 'banCard-container-hide' : ''} > */}
            <div className="ban-card">
                <div className="ban-card-icon">
                    <TbAlertTriangleFilled />
                </div>
                <h2 className="ban-card-h2">Tu cuenta ha sido suspendida</h2>
                <p className="ban-card-p">
                Tu cuenta en Grano de Oro ha sido suspendida por estar relacionada con actividades que violan nuestros <span className="ban-card-span">Términos de uso.</span>
                </p>

                {useNavigate().pathname === '/'&& 
                <button className="ban-card-button" onClick={handlerButton}>Aceptar</button>}

            </div>
        </div>
    )
};


export default BanCard;