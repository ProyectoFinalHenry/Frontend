
import './NewReview.css'
import axios from 'axios';
import { useForm } from "react-hook-form"
import useFormPersist from 'react-hook-form-persist'


const NewReview = ({coffeeId,image,name}) =>{
    const { setValue,register, handleSubmit, watch, formState: { errors } } = useForm();
    const titleInput = watch("title");
    const commentsInput = watch("comments");
    const ratingInput = (watch("rating"));
    const token = localStorage.getItem("tokens")
    useFormPersist("newCoffeForm", {
        watch, 
        setValue,
        storage: window.localStorage,
    });
    const handlePostRating = async (postData) => {
        try {
            if (token) { 
                postData.coffeeId=coffeeId
                const { data } = await axios.post('review/add',postData,{ headers: { auth_token: token } });
                const { status } = data;
                if (status) {
                    window.location.href = '/detail/'+coffeeId;
                }
        }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDelete= async() => {
        try {
            if (token) { 
                const cof={coffeeId:coffeeId}
                console.log(cof)
                const { data } = await axios.delete('review/delete',cof,{ headers: { auth_token: token } });
                const { status } = data;
                if (status) {
                    window.location.href = '/detail/'+coffeeId;
                }
        }
        } catch (error) {
            console.log(error.message);
        }
    }




    return(
        <div className="new-reviews-users-container">
            <div className="reviews-users-header">
                <div className="reviews-user-img">
                    <img src={image} alt="foto perfil usuario" />
                </div>
                <div>
                    <span className="reviews-user-name">{name}</span>
                </div>
            </div>         
            
            
            <form onSubmit={handleSubmit((data) => {
                setTimeout(() => {
                    handlePostRating(data);
                }, 3000);
            })}>
                <div>
                    <label htmlFor="rating"></label>
                    <select {...register("rating", {required: "* Este campo es requerido..."})}
                        className="new-review-input"
                        id="rating"
                        defaultValue="5">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <span>
                        {(!ratingInput) ? "* Este campo es requerido. Ingresa un valor." : errors.rating?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor="title"></label>
                    <input
                        {...register("title", { required: "* Este campo es requerido. Ingresa un valor." })}
                        type="text"
                        className="new-review-input"
                        id="title"
                        placeholder="Titulo de la calificación..."
                    />
                    <p>{(!titleInput) ? "* Este campo es requerido..." : errors.title?.message}</p>
                </div>
                <div>
                    <label htmlFor="comments"></label>
                    <textarea
                        {...register("comments", { required: "* Este campo es requerido. Ingresa un valor." })}
                        className="new-review-input"
                        id="comments"
                        rows="2"
                        cols="70"
                        placeholder="Descripción de la calificación..."
                        
                    ></textarea>
                    <p>{(!commentsInput) ? "* Este campo es requerido..." : errors.comments?.message}</p>
                </div>
                <button type="submit"  className="review-add-product-btn">Calificar</button>
                <button type='button'  className="review-add-product-btn" onClick={handleDelete}>Eliminar</button>
            </form>
        </div>

    )
}

export default NewReview;







