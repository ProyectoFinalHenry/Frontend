
import './NewReview.css'
import axios from 'axios';
import { useForm } from "react-hook-form"
import useFormPersist from 'react-hook-form-persist'
import StarRating from '../StarRating/StarRating';
import React, { useState } from 'react';

const NewReview = ({coffeeId,image,name,getCoffeeData}) =>{
    const [isFormVisible, setIsFormVisible] = useState(false); 
    const { setValue,register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const titleInput = watch("title");
    const commentsInput = watch("comments");
    const token = localStorage.getItem("tokens")
    const [loadingBtn,setLoadingBtn] = useState('Calificar')
    useFormPersist("newCoffeForm", {
        watch, 
        setValue,
        storage: window.localStorage,
    });
    const handleToggle = () => {
        setIsFormVisible(!isFormVisible); // Alternar entre true y false
    }
    const handlePostRating = async (postData) => { console.log(postData)
        try {
            if (token) { 
                postData.coffeeId=coffeeId
                const { data } = await axios.post('review/add',postData,{ headers: { auth_token: token } });
                const { status } = data;
               
                if (status) {
                  getCoffeeData()
                  setValue('comments','')
                  setValue('title','')
                  handleToggle()
                  setLoadingBtn('Calificar')
                }

        }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDelete= async() => {
        try {
            if (token) { 
                const cof={
                    coffeeId:coffeeId
                  }
                console.log(cof)
                console.log(token)
                const { data } = await axios.delete('review/delete', { headers: { auth_token: token },data:cof});
                const { status } = data;
                if (status) {
                  getCoffeeData()
                  setValue('comments','')
                  setValue('title','')
                  handleToggle()
                }
        }
        } catch (error) {
            console.log(error.message);
        }
    }




    return (
      
        <div className="new-reviews-users-container">
         <h2 className="reviews-h2">OPINIONES DE LOS USUARIOS</h2>
      
          <div>
            <label htmlFor="rating">Califica este producto...</label>
            <StarRating
              onRatingChange={(value) => {
                setValue('rating', value);
                handleToggle();
              }}
              isFormVisible={isFormVisible} 
            />
          </div>
      
          {isFormVisible && (            
          <form
         
              onSubmit={handleSubmit((data) => {
                setTimeout(() => {
                  handlePostRating(data);
                }, 3000);
              })}
                > <div className="reviews-users-header">
                <div className="reviews-user-img">
                <img src={image} alt="foto perfil usuario" />
                </div>
                <div>
                <span className="reviews-user-name">{name}</span>
                </div>
            </div>
              <div>
                <label htmlFor="title"></label>
                <input
                  {...register('title', { required: '* Este campo es requerido. Ingresa un valor.' })}
                  type="text"
                  className="new-review-input"
                  id="title"
                  placeholder="Titulo de la calificación..."
                />
                <p>{!titleInput ? '* Este campo es requerido...' : errors.title?.message}</p>
              </div>
              <div>
                <label htmlFor="comments"></label>
                <textarea
                  {...register('comments', {
                    required: '* Este campo es requerido. Ingresa un valor.',
                  })}
                  className="new-review-input"
                  id="comments"
                  rows="2"
                  placeholder="Descripción de la calificación..."
                ></textarea>
                <p>{!commentsInput ? '* Este campo es requerido...' : errors.comments?.message}</p>
              </div>
              <button type="submit" className="review-add-product-btn" onClick={()=>setLoadingBtn('Cargando comentario...')}>
               {loadingBtn}
              </button>
              <button type="button" className="review-add-product-btn" onClick={handleDelete}>
                Eliminar mi calificación
              </button>
            </form>
          )}
        </div>
      );
}

export default NewReview;







