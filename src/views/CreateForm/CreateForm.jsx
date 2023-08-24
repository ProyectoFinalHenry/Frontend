import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '../../functions/toastify/toastify'
import 'react-toastify/dist/ReactToastify.css';
import './CreateForm.css'

const CreateForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [types, setTypes] = useState([{}]);
    const [roasts, setRoasts] = useState([{}]);
    const [origins, setOrigins] = useState([{}]);
    const [urlImage, setUrlImage] = useState(null);
    const [postObject, setPostObject] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const nameInput = watch("name");
    const descriptionInput = watch("description");
    const fileInput = watch("file");
    const priceInput = (watch("price"));
    const stockInput = watch("stock");
    const typeInput = watch("typeOfCoffee");
    const roastInput = watch("roastingProfile");
    const originInput = watch("origin");
    const TYPE_GET_VALUE = "TypeOfCoffee";
    const ROAST_GET_VALUE = "RoastingProfile";
    const ORIGIN_GET_VALUE = "Origin";
    let url = '';

    useEffect(() => {
        getAllTypesCoffee();
        getAllRoastsCoffee();
        getAllOriginsCoffee();
    }, []);

    const getAllTypesCoffee = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/category/${TYPE_GET_VALUE}`);
            setTypes(data);
        } catch (error) {
            console.log("error:", error);
        }
    }
    const getAllRoastsCoffee = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/category/${ROAST_GET_VALUE}`);
            setRoasts(data);
        } catch (error) {
            console.log("error:", error);
        }
    }
    const getAllOriginsCoffee = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/category/${ORIGIN_GET_VALUE}`);
            setOrigins(data);
        } catch (error) {
            console.log("error:", error);
        }
    }

    const handleFileChange = (file) => {
        setSelectedFile(file);
    }
    const setPostCoffeeObject = (obj) => {
        obj.image = url;
        return obj;
    }
    const handleUploadFile = async () => {
        if (selectedFile) {
            const { name } = selectedFile;
            const reader = new FileReader();

            reader.onload = async () => {
                const base64data = 'data:image/png;base64,' + reader.result.split(',')[1];

                try {
                    const { data } = await axios.post('coffee/upload', { file: base64data, fname: name });
                    const { message, imageUrl } = data;
                    console.log(message);
                    setUrlImage(imageUrl);
                    url = imageUrl;
                } catch (error) {
                    console.error('Error al subir archivo:', error);
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "file") {
            const file = e.target.files[0];
            handleFileChange(file);
        }
    }

    const handlePostCoffee = async (postData) => {
        try {
            const { data } = await axios.post('coffee', postData);
            const { status } = data;
            if (status) {
                notifySuccess("¡Producto creado con exito!");
                setTimeout(() => {
                    window.location.href = '/';
                }, 1 * 3000);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const typeSelects = types.map((item, i) => {
        const { type } = item;
        return <option value={type} key={i}>{type}</option>
    });
    const roastSelects = roasts.map((item, i) => {
        const { profile } = item;
        return <option value={profile} key={i}>{profile}</option>
    });
    const originSelects = origins.map((item, i) => {
        const { origin } = item;
        return <option value={origin} key={i}>{origin}</option>
    });

    return (
        <div className="form-create-container">

            <div className="form-create-banner">
                <p className='form-create-banner-msj'>AGREGA NUEVOS PRODUCTOS</p>
                <img className='form-create-image-banner' src="assets/images/bannere-home.webp" alt="banner" />
            </div>

            <div>
                <div>
                    <h1 className="form-header-text">Formulario de creación de productos</h1>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <form className="form-create" onSubmit={handleSubmit((data) => {
                    handleUploadFile();
                    setTimeout(() => {
                        const coffeeObject = setPostCoffeeObject(data);
                        setPostObject(coffeeObject);
                        handlePostCoffee(coffeeObject);

                    }, 1 * 3000);
                })}>
                    <div>
                        <label htmlFor="ncafe" className="form-label">Nombre del Café</label>
                        <input
                            {...register("name", { required: "* Este campo es requerido. Ingresa un valor." })}
                            type="text"
                            className="form-control"
                            id="ncafe"
                            placeholder="introduce nombre del café..."
                        />
                        <p>{(!nameInput) ? "* Este campo es requerido. Ingresa un valor." : errors.name?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="dcafe" className="form-label">Descripción del Café</label>
                        <textarea {...register("description", { required: "* Este campo es requerido. Ingresa un valor." })} className="form-control" id="dcafe" rows="3"></textarea>
                        <p>{(!descriptionInput) ? "* Este campo es requerido. Ingresa un valor." : errors.description?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="icafe" className="form-label">Imagen del Café</label>
                        <input {...register("file", { required: "* Este campo es requerido. Ingresa un valor." })} type="file" className="form-control" id="icafe" onChange={handleChange} />
                        <p>{(!fileInput) ? "* Este campo es requerido. Ingresa un valor." : errors.file?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="pcafe" className="form-label">Precio del Café</label>
                        <input
                            {...register("price",
                                {
                                    required: "* Este campo es requerido. Ingresa un valor.",
                                    min: { value: 1, message: "El valor minimo permitido es 1" }
                                }
                            )}
                            type="number"
                            className="form-control"
                            id="pcafe" />
                        <p>{(!priceInput) ? "* Este campo es requerido. Ingresa un valor." : (priceInput < 1) ? "El valor minimo permitido es 1" : errors.price?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="scafe" className="form-label">Stock del Café</label>
                        <input
                            {...register("stock",
                                {
                                    required: "* Este campo es requerido. Ingresa un valor.",
                                    min: { value: 1, message: "El valor minimo permitido es 1" }
                                })
                            }
                            type="number"
                            className="form-control"
                            id="scafe" />
                        <p>{(!stockInput) ? "* Este campo es requerido. Ingresa un valor." : (stockInput < 1) ? "El valor minimo permitido es 1" : errors.stock?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="tcafe" className="form-label">Tipo de Café</label>
                        <select
                            {...register("typeOfCoffee", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="tcafe">
                            <option value="">elige tipo de cafe..</option>
                            {typeSelects}
                        </select>
                        <p>{(!typeInput) ? "* Este campo es requerido. Ingresa un valor." : errors.typeOfCoffee?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="rcafe" className="form-label">Tostado de Café</label>
                        <select
                            {...register("roastingProfile", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="rcafe">
                            <option value="">elige tipo de tostado..</option>
                            {roastSelects}
                        </select>
                        <p>{(!roastInput) ? "* Este campo es requerido. Ingresa un valor." : errors.roastingProfile?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="ocafe" className="form-label">Origen de Café</label>
                        <select
                            {...register("origin", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="ocafe">
                            <option value="">elige origen del cafe..</option>
                            {originSelects}
                        </select>
                        <p>{(!originInput) ? "* Este campo es requerido. Ingresa un valor." : errors.origin?.message}</p>
                    </div>
                    <div>
                        <input type="submit" value="submit" className="form-submit-button" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateForm;
