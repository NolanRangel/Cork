import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './navButton.module.css';

const Browse = () => {
  const history = useHistory();

  return (


    <button onClick={() => history.push('/browse')} className={styles.button}>
            Browse
    </button>


  )
}



export default Browse