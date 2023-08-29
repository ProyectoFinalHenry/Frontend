
import Stars from '../../components/Stars/Stars';
import { AiFillStar } from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai'
import './Reviews.css'



const Reviews = () =>{

    return(
       <div className="reviews-container">
        <h2 className="reviews-h2">OPINIONES DE LOS USUARIOS</h2>

        {/* CARD REVIEWS */}
        <div className="reviews-total">
            <div className="reviews-total-stars">
                <Stars stars={5} />
                <p className='reviews-total-stars-p'>13 opiniones recibidas</p>
            </div>

            <div className="reviews-total-total-card">
                <div className="reviews-stars-count">
                    <div className="reviews-stars-count-five">
                        <Stars stars={5}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${50}%`}}></div> </div>
                        <span> 92% (28)</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={4}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${40}%`}}></div> </div>
                        <span> 15% (7)</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={3}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${20}%`}}></div> </div>
                        <span> 40% (15)</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={2}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${30}%`}}></div> </div>
                        <span> 20% (8)</span>
                    </div>

                    <div className="reviews-stars-count-five">
                        <Stars stars={1}/>
                        <div className='reviews-stars-count-five-bar'> <div style={{width:`${5}%`}}></div> </div>
                        <span> 5% (1)</span>
                    </div>
                </div>
            </div>
        </div>

        {/* CARDS USERS REVIEWS DESCRIPTIONS*/}
        <div className="reviews-users-container">

            <div className="reviews-users-header">
                <div className="reviews-user-img">
                    <img src="https://i.postimg.cc/L659Vjmm/832a1b39-5bab-4896-9a61-5a54694b308f.png" alt="foto perfil usuario" />
                </div>
                
                <div>
                    <div className="reviews-user-date">
                        <Stars stars={4} />
                        <span> 03/08/2023</span>
                    </div>
                    <span className="reviews-user-name">Luis Miguel</span>
                </div>
            </div>

                <p className="reviews-user-review-title">Riquísimooooo</p>
                <p className="reviews-user-desciption">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero dolorem culpa vitae ipsum, repellat, et quos cumque minus eum nostrum quis accusantium. Expedita obcaecati blanditiis error, modi earum similique corporis!
                </p>
        </div>

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
                <p className="reviews-user-desciption">
                    Me vino el paquete con cucarachas, devuelvanme el dinero o los denuncio
                </p>
        </div>


       </div>
    )
}

export default Reviews;