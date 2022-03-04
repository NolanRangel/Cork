import React, { useEffect, useState } from 'react'
import styles from "./AdDetail.module.css"
import pushPin from '../../static/images/drawing-pin.png';

import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import adService from '../../services/AdService';
import Loader from '../navigation/navigationButtons/Loader';



const AdDetails = () => {
    const { adId } = useParams();
    const [ad, setAd] = useState();
    const [ image, setImage ] = useState();
    console.log(image);

    useEffect(() => {
        adService.getOneAd(adId)
        .then(response => {
            // console.log(response.data.image)
            setAd(response.data)
            if(response.data.image === "Default_Image.png") {
                setImage(require(`../../static/images/${response.data.image}`))
            } else {
                setImage(require(`../../static/images/adImages/${response.data.image}`))
            }
        })
        .catch(error => console.error(error))
    }, [])



  return (

            <div className={`d-flex flex-column align-items-center ${styles.paper}`} >
                {
                    ad ?

                    <div>
                        <h2 className={styles.title}>{ad.title}</h2>
        
                            <div className='d-flex mt-1 p-3 gap-5'>
                                <div className='d-flex  p-3'>
                                    <div className='d-flex align-items-start'>
                                        <img src={image} alt="Advertisement" className={styles.image} />
                                    </div>
                                </div>
                                <div className={`d-flex flex-column `}>
                                    <div className='d-flex flex-column align-items-center my-2'>
                                        <label className='label'>Category</label>
                                        <h4>{ad.category}</h4>
                                    </div>
                                    <div className='d-flex flex-column align-items-center mb-2'>
                                        <label className='label'>Location</label>
                                        <h4>{ad.city}, {ad.state}</h4>
                                    </div>
                                    <div className='d-flex flex-column align-items-center mb-2'>
                                        <label className='label'>Asking Price</label>
                                        <h4>$ {ad.price.toFixed(2)}</h4>
                                    </div>
                                    <button className={styles.button}>
                                        {/* links to contact listing owner view, ("/#/" + creator._id + "/contact")*/}
                                        <Link to={`/contact/${adId}`} className='text-black text-decoration-none'>
                                            Contact
                                        </Link>
                                    </button>
                                </div> 
                            </div>
                                <div className={`rounded-3 ${styles.description}`} >
                                    <p className='border text-center p-2'>
                                        {ad.description}
                                    </p>
                                </div>
                        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinTL}`} />
                        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinTR}`} />
                        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinBL}`} />
                        <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinBR}`} /> 

                    </div> :
                    
                    <Loader />
                }
            </div>
  )
}

export default AdDetails