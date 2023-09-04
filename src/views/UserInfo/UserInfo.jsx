import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { informationUser } from "../../store/reducers/thunk";
import {updateUserInfo, deleteAcount} from '../../services/api';
import './UserInfo.css'
import { AiOutlineUser } from 'react-icons/ai';
import Swal from "sweetalert2";
import Spinner from '../../components/Spinner/Spinner';
import formValidations from './formValidations.js';
import {useNavigate} from 'react-router-dom';


const UserInfo = () => {
    const { NewinformationUser } = useSelector(state => state.login);
    const token = localStorage.getItem("tokens");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false); 
    const [editedUser, setEditedUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [formErrors, setFormErrors] = useState([]);
    //const [deleteAcount, setDeleteAcount] = useState(false);


    useEffect(() => {
        setLoading(!NewinformationUser); 
      }, [NewinformationUser]);
      

    useEffect(() => {
        dispatch(informationUser(token));
    }, [isEditing]);

    useEffect(() => {
        setFormErrors(formValidations(editedUser));
    },[editedUser]);


    const handleEdit = () => {
        setIsEditing(true); // Cambiar al modo de edición
        // Inicializar el objeto de datos editados con los valores actuales del usuario
        setEditedUser({
            name: NewinformationUser.name,
            lastname: NewinformationUser.lastname,
            email: NewinformationUser.email,
            phone: NewinformationUser.phone,
        });
    }


    //MANEJADOR ERRORES
    const handleErrors = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
     
    }

    const handleSave = async () => {
        if(formErrors.length === 0){
            setLoading(true);
           const userUpdate = await updateUserInfo(editedUser);
            setLoading(false);
            setIsEditing(false);

            userUpdate.status === 200 ? Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos actualizados correctamente',
                showConfirmButton: false,
                timer: 2000,
            })
            : Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al actualizar los datos',
                showConfirmButton: false,
                timer: 2000,
            })
        }
    }
  

    const handlerDeleteBtn = async () => {
        const confirmResult = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
    
        if (confirmResult.isConfirmed) {
            setLoading(true);
            const userDelete = await deleteAcount();
            setLoading(false);
    
            if (userDelete.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cuenta eliminada correctamente',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    localStorage.removeItem('tokens')
                    navigate('/');
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al eliminar la cuenta',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
    };
    

    return (
        <div className="user-info-container">
            <div className="user-info-card">
              
                <div className={ loading || !NewinformationUser? "user-info-form-spinner-show" : "user-info-form-spinner-hidde"}>
                    <Spinner />
                </div>

                <div className="user-info-img-title">
                    <div className="user-info-img-cont">
                        <AiOutlineUser />
                    </div>
                    <h2>Datos personales</h2>
                </div>
                <div className="user-info-items">
                    <p className="user-info-item">Nombre</p>
                    {isEditing ? (
                        <input
                            className="user-info-item-data user-info-item-data-edit"
                            type="text"
                            value={editedUser.name}
                            name="name"
                            onChange={handleErrors}
                        />
                    ) : (
                        <p className="user-info-item-data">{NewinformationUser.name}</p>
                    )}

                    {/* Campo Apellido */}
                    <p className="user-info-item">Apellido</p>
                    {isEditing ? (
                        <input
                        className="user-info-item-data user-info-item-data-edit"
                        type="text"
                        value={editedUser.lastname}
                        name="lastname"
                        onChange={handleErrors}
                    />
                    
                    ) : (
                        <p className="user-info-item-data">{NewinformationUser.lastname}</p>
                    )}

                    {/* Campo Email */}
                    <p className="user-info-item">Email</p>
                    {isEditing ? (
                        <input
                            className="user-info-item-data user-info-item-data-edit"
                            type="email"
                            value={editedUser.email}
                            name="email"
                            onChange={handleErrors}
                        />
                    ) : (
                        <p className="user-info-item-data">{NewinformationUser.email}</p>
                    )}

                    {/* Campo Teléfono */}
                    <p className="user-info-item">Teléfono</p>
                    {isEditing ? (
                        <input
                            className="user-info-item-data user-info-item-data-edit"
                            type="tel"
                            value={editedUser.phone}
                            name="phone"
                            onChange={handleErrors}
                        />
                    ) : (
                        <p className="user-info-item-data">{NewinformationUser.phone}</p>
                    )}
                </div>
                
                {formErrors.length > 0 && isEditing &&(
                    <p className="user-info-form-error-msj">{formErrors[formErrors.length - 1]}</p>
                )}



                <div className="user-info-buttons-cont">
                    {isEditing ? (
                        <button className={"user-info-btn-save " + (formErrors.length > 0 ? "user-info-btn-save-disable" : "")} 
                        onClick={handleSave}
                        disable={formErrors.length > 0 ? true : false}
                        >Guardar</button>
                    ) : (
                        <button className="user-info-btn-edit" onClick={handleEdit}>Editar</button>
                    )}


                    <button className="user-info-btn-delete" onClick={handlerDeleteBtn}>Eliminar cuenta</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
