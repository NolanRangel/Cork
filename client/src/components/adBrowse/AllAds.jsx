import React from 'react';
import StickyNote from './StickyNote';
import styles from './AllAds.module.css';


const AllAds = ({ adList }) => {


    return (

                <div className={styles.mappedAds}>
                {adList.map((ad, i) =>
                    <StickyNote key={i} ad={ad} />
                )}
                </div> 
    )
}

export default AllAds;