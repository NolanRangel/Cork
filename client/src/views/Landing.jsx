import React from 'react';
import styles from './Landing.module.css';
import pushPin from '../static/images/drawing-pin.png';

const Landing = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.paper}>
                <h1 className={styles.title}>Cork</h1>
                <h2 className={styles.subtitle}>Community Boards</h2>
            <img src={pushPin} alt="pushpin" className={styles.pinMain} />
            </div>
            <div className="d-flex gap-5 mt-5">
                <a href="/post_ad" id="postLink" className={styles.button} >Post an Ad
                    <img src={pushPin} alt="pushpin" id="postPin" className={styles.postPin} />
                </a>
                <a href="/browse" id="postLink" className={styles.button} >Browse Ads
                    <img src={pushPin} alt="pushpin" id="postPin" className={styles.postPin} />
                </a>
            </div>
        </div>
    )
}

export default Landing;