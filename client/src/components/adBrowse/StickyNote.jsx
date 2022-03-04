import React, { useState, useEffect } from 'react';
import styles from './StickyNote.module.css';
import pushPin from '../../static/images/drawing-pin.png';
import Loader from '../navigation/navigationButtons/Loader';
import adService from '../../services/AdService';


const StickyNote = ({ ad }) => {
    const [ image, setImage ] = useState();

    // **Original method
    // let image = null;
    // if(ad.image === "Default_Image.png") {
    //     image = require(`../../static/images/${ad.image}`)
    // } else {
    //     image = (`../../static/images/adImages/${ad.image}`)
    // }
    // console.log(image);


    useEffect(() => {
        adService.getOneAd(ad.id)
        .then(response => {
            // console.log(response.data.image)
            if(response.data.image === "Default_Image.png") {
                setImage(require(`../../static/images/${response.data.image}`))
            } else {
                setImage(require(`../../static/images/adImages/${response.data.image}`))
            }
        })
        .catch(error => console.error(error))
    }, [])


    return (

        
        <a href={`/details/${ad.id}`} className={styles.stickyNote} >
            <img src={image} alt="Advertisement" className={styles.image} />
            <h6 className={styles.title}>{ad.title}</h6>
            <p>$ {ad.price.toFixed(2)}</p>
            <img src={pushPin} alt="Push Pin" className={styles.pin} />
        </a>
    )
}

export default StickyNote;