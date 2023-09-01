
import { useDispatch , useSelector} from "react-redux";
import { informationUser } from "../../store/reducers/thunk";
import { useEffect } from "react";
import './UserInfo.css'
import { AiOutlineUser } from 'react-icons/ai';

const UserInfo = () => {

    const {NewinformationUser} = useSelector(state => state.login)
    let token = localStorage.getItem("tokens");
    const dispatch = useDispatch();
    console.log(NewinformationUser);

    useEffect(() => {
        dispatch(informationUser(token))
    },[]);

    return(
        <div className="user-info-container">

            <div className="user-info-card">
                <div className="user-info-img-title">
                    <div className="user-info-img-cont">
                        <AiOutlineUser/>
                    </div>
                <h2>Datos personales</h2>
                </div>
                <div className="user-info-items">
                    <p className="user-info-item">Nombre</p>
                    <p className="user-info-item-data">{NewinformationUser.name}</p>
                    <p className="user-info-item">Apellido</p>
                    <p className="user-info-item-data"></p>
                    <p className="user-info-item" >Email</p>
                    <p className="user-info-item-data">{NewinformationUser.email}</p>
                    <p className="user-info-item">Teléfono</p>
                    <p className="user-info-item-data"></p>
                </div>
                <div className="user-info-buttons-cont">
                    <button className="user-info-btn-edit">Editar</button>
                    <button className="user-info-btn-delete">Eliminar cuenta</button>
                </div>
                
            </div>
        </div>
    )
};


export default UserInfo;