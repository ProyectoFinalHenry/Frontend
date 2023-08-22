import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./CreateForm.css";

const CreateForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [postObject, setPostObject] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let url = "";

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  const setPostCoffeeObject = (obj) => {
    obj.image = url;
    return obj;
  };
  const handleUploadFile = async () => {
    if (selectedFile) {
      const { name } = selectedFile;
      const reader = new FileReader();

      reader.onload = async () => {
        const base64data =
          "data:image/png;base64," + reader.result.split(",")[1];

        try {
          const { data } = await axios.post(
            "http://localhost:3001/coffee/upload",
            { file: base64data, fname: name }
          );
          const { message, imageUrl } = data;
          console.log(message);
          setUrlImage(imageUrl);
          url = imageUrl;
        } catch (error) {
          console.error("Error al subir archivo:", error);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === "file") {
      const file = e.target.files[0];
      handleFileChange(file);
    }
  };

  const handlePostCoffee = async (postData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/coffee",
        postData
      );
      const { status } = data;
      if (status === "Created successfully") {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="create__container">
      <div className="create__container-banner">
        <img
          className="create__container-banner-img"
          src="assets/images/bannere-home.webp"
          alt="banner"
        />
        <h1 className="create__container-form-header">
          Formulario de creación de productos
        </h1>
      </div>
      <form
        className="create__container-form"
        onSubmit={handleSubmit((data) => {
          handleUploadFile();
          setTimeout(() => {
            const coffeeObject = setPostCoffeeObject(data);
            setPostObject(coffeeObject);
            handlePostCoffee(coffeeObject);
          }, 1 * 3000);
        })}
      >
        <label htmlFor="ncafe" className="form__label">
          Nombre del Café
        </label>
        <input
          {...register("name", {
            required: "* Este campo es requerido. Ingresa un valor.",
          })}
          type="text"
          className="create__form-input"
          id="ncafe"
          placeholder="introduce nombre del café..."
        />
        <p>{errors.name?.message}</p>
        <div className="create__container-form-description">
          <label htmlFor="dcafe" className="form__label">
            Descripción del Café
          </label>
          <textarea
            {...register("description", {
              required: "* Este campo es requerido. Ingresa un valor.",
            })}
            className="create__form-input-description"
            id="dcafe"
            rows="3"
          ></textarea>
          <p>{errors.description?.message}</p>
        </div>
        <div className="form__group">
          <div>
            <label htmlFor="icafe" className="form__label">
              Imagen del Café
            </label>
            <input
              {...register("file", {
                required: "* Este campo es requerido. Ingresa un valor.",
              })}
              type="file"
              className="create__form-input"
              id="icafe"
              onChange={handleChange}
            />
            <p>{errors.file?.message}</p>
          </div>
          <div>
            <label htmlFor="pcafe" className="form__label">
              Precio del Café
            </label>
            <input
              {...register("price", {
                required: "* Este campo es requerido. Ingresa un valor.",
                min: { value: 1, message: "El valor minimo permitido es 1" },
              })}
              type="number"
              className="create__form-input"
              id="pcafe"
            />
            <p>{errors.price?.message}</p>
          </div>
          <div>
            <label htmlFor="scafe" className="form__label">
              Stock del Café
            </label>
            <input
              {...register("stock", {
                required: "* Este campo es requerido. Ingresa un valor.",
                min: { value: 1, message: "El valor minimo permitido es 1" },
              })}
              type="number"
              className="create__form-input"
              id="scafe"
            />
            <p>{errors.stock?.message}</p>
          </div>
          <div>
            <label htmlFor="tcafe" className="form__label">
              Tipo de Café
            </label>
            <select
              {...register("typeOfCoffee", {
                required: "* Este campo es requerido. Ingresa un valor.",
              })}
              className="create__form-input"
              id="tcafe"
            >
              <option value="">elige tipo de cafe..</option>
              <option value="Whole bean coffee">Whole bean coffee</option>
              <option value="Ground coffee">Ground coffee</option>
            </select>
            <p>{errors.typeOfCoffee?.message}</p>
          </div>
          <div>
            <label htmlFor="rcafe" className="form__label">
              Tostado de Café
            </label>
            <select
              {...register("roastingProfile", {
                required: "* Este campo es requerido. Ingresa un valor.",
              })}
              className="create__form-input"
              id="rcafe"
            >
              <option value="">elige tipo de tostado..</option>
              <option value="Medium Roast">Medium Roast</option>
              <option value="Light Roast">Light Roast</option>
              <option value="Dark Roast">Dark Roast</option>
            </select>
            <p>{errors.roastingProfile?.message}</p>
          </div>
          <div>
            <label htmlFor="ocafe" className="form__label">
              Origen de Café
            </label>
            <select
              {...register("origin", {
                required: "* Este campo es requerido. Ingresa un valor.",
              })}
              className="create__form-input"
              id="ocafe"
            >
              <option value="">elige origen del cafe..</option>
              <option value="Single Origin Coffee">Single Origin Coffee</option>
              <option value="Blend of Coffee">Blend of Coffee</option>
            </select>
            <p>{errors.origin?.message}</p>
          </div>
        </div>
        <div className="create__container-form-button-submit">
          <input type="submit" value="submit"/>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
