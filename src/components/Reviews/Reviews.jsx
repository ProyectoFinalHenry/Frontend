import Stars from '../../components/Stars/Stars';
import { AiFillStar } from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai'
import './Reviews.css'



const Reviews = ({reviews}) =>{
    let star1c=0;
    let star2c=0;
    let star3c=0;
    let star4c=0;
    let star5c=0;
    let cantidad=reviews.length
    reviews.forEach((review) => {
        switch (review.rating) {
          case 1:
            star1c += 1;
            break;
          case 2:
            star2c += 1;
            break;
          case 3:
            star3c += 1;
            break;
          case 4:
            star4c += 1;
            break;
          case 5:
            star5c += 1;
            break;
          default:
            break;
        }
      });      

      function calcularPromedio(sum) {
        return cantidad === 0 ? 0 : Math.round((sum / cantidad)*100);
      }
      let star1 = calcularPromedio(star1c);
      let star2 = calcularPromedio(star2c);
      let star3 = calcularPromedio(star3c);
      let star4 = calcularPromedio(star4c);
      let star5 = calcularPromedio(star5c);
      let promTotal=0;
      if (cantidad>0) {promTotal = Math.round(((star1c + star2c * 2 + star3c * 3 + star4c * 4 + star5c * 5) / cantidad) * 10) / 10}
      
    return(
       <div className="reviews-container">
        <h2 className="reviews-h2">OPINIONES DE LOS USUARIOS</h2>

        {/* CARD REVIEWS */}
        <div className="reviews-total">
            <div className="reviews-total-stars">
                <h2>{promTotal}</h2>
                <Stars stars={promTotal} />
                <p className='reviews-total-stars-p'>{cantidad} opiniones recibidas</p>
            </div>

            <div className="reviews-total-total-card">
                <div className="reviews-stars-count">
                    <div className="reviews-stars-count-five">

                        <Stars stars={5}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${star5}%`}}></div> </div>
                        <span> {star5}% ({star5c})</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={4}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${star4}%`}}></div> </div>
                        <span> {star4}% ({star4c})</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={3}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${star3}%`}}></div> </div>
                        <span> {star3}% ({star3c})</span>
                    </div>

                    <div className="reviews-stars-count-five" >
                        <Stars stars={2}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${star2}%`}}></div> </div>
                        <span> {star2}% ({star2c})</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={1}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${star1}%`}}></div> </div>
                        <span> {star1}% ({star1c})</span>
                    </div>
                </div>
            </div>
        </div>

        {/* CARDS USERS REVIEWS DESCRIPTIONS*/}
        {reviews.map((review)=>(
            <div className="reviews-users-container"> 
                <div className="reviews-users-header">
                    <div className="reviews-user-img">
                        <img src={review.User.image} alt="foto perfil usuario" />
                    </div>
                    <div>
                        <div className="reviews-user-date">
                            <Stars stars={review.rating} />
                            <span> {review.date}</span>
                        </div>
                        <span className="reviews-user-name">{review.User.name}</span>
                    </div>
                </div>
                <p className="reviews-user-review-title">{review.title}</p>
                <p className="reviews-user-desciption">{review.comments}</p>
            </div>
        ))}

{/* 
        <div className="reviews-users-container">
            <div className="reviews-users-header">
                <div className="reviews-user-img">
                    <img src="https://i.postimg.cc/L659Vjmm/832a1b39-5bab-4896-9a61-5a54694b308f.png" alt="foto perfil usuario" />
                </div>
                <div>
                    <div className="reviews-user-date">
                        <Stars stars={1} />
                        <span> 22/08/2023</span>
                    </div>
                    <span className="reviews-user-name">Luis Miguel</span>
                </div>
            </div>
            <p className="reviews-user-review-title">ESTAFADORES!!</p>
            <p className="reviews-user-desciption">Me vino el paquete con cucarachas, devuelvanme el dinero o los denuncio</p>
        </div> */}


       </div>
    )
}

export default Reviews;