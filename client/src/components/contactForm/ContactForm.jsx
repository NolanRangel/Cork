import React, { useState } from 'react'
import styles from './ContactForm.module.css'
import pushPin from '../../static/images/drawing-pin.png';
import { useHistory, useParams } from 'react-router-dom'

import adService from '../../services/AdService';


const ContactForm = () => {
    const { adId } = useParams();
    const history = useHistory()
    const [contactEmail, setContactEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState(null)



    const submitHandler = (e) => {
        e.preventDefault();
        const contactForm = {
            id: adId,
            email: contactEmail,
            subject: subject,
            message: message
        }
        adService.contactSeller(contactForm)
        .then(response => {
            if(response.status === 207){
                let errorList = [];
                for(const err of response.data){
                    errorList.push(err.defaultMessage)
                }
                setErrors(errorList);
            }else {
                history.push(`/details/${adId}`)
            }
        })
    }


  return (


    <div className={`d-flex flex-column align-items-center ${styles.paper}`} >
        <h2 className={styles.title}>Contact The Owner</h2>
        <div className={`d-flex justify-content-center mt-2 p-3 ${styles.container}`} >
            <form onSubmit={submitHandler}>
                <div>
                    <div className='mb-3'>
                        <label for="email" >Your Email</label>
                        <input onChange={(e) => setContactEmail(e.target.value)} type="email" name="email" className="form-control" />
                    </div>
                    <div className='mb-3'>
                        <label for="subject" >Subject</label>
                        <input onChange={(e) => setSubject(e.target.value)} type="subject" name="subject" className="form-control" />
                    </div>
                    <div>
                        <label for="message">Message</label>
                        <textarea onChange={(e) => setMessage(e.target.value)} name="message" id="message" cols="45" rows="10" className="form-control" ></textarea>
                    </div>
                    {errors && 
                            <div className='aler alert-danger d-flex flex-column align-items-center'>
                                {errors.map((err, i) =>
                                <p key={i}>{err}</p>
                                )}
                            </div>
                        }
                    <div className='d-flex justify-content-center my-3'>
                        <button className={styles.button}>
                            Send
                        </button>
                    </div>
                </div> 
            </form>
        </div>
        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinTL}`} />
        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinTR}`} />
        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinBL}`} />
        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinBR}`} />
    </div>

    
  )
}



export default ContactForm