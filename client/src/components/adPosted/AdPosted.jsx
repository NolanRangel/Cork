import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './AdPosted.module.css';
import pushPin from '../../static/images/drawing-pin.png';

const AdPosted = () => {
    const { adId } = useParams();
    const history = useHistory();
    
    return (
        <div className={styles.paper}>
            <h2 className={styles.title} >Your Ad Has Been Posted!</h2>
            <button onClick={()=>history.push(`/details/${adId}`)} className={styles.button} >View It Now</button>
            <h5 className={styles.message}>An email has been sent to the address you provided<br></br> that contains links to manage your ad.</h5>
            <h4>Thank you!</h4>
            <img src={pushPin} alt="Push pin" className={styles.pin} />
        </div>
    )
}

export default AdPosted;