import React from 'react';
import styles from './TitleNote.module.css';
import pushPin from '../../static/images/drawing-pin.png';

const TitleNote = () => {
    return (
        <a href="/" className={styles.paper} >
            <h1 className={styles.title}>Cork</h1>
            <img src={pushPin} alt="" className={styles.pin} />
        </a>
    )
}

export default TitleNote;