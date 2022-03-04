import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './navButton.module.css';


const Back = () => {
    const history = useHistory()

  return (


    <button onClick={() => history.goBack()} className={styles.button}>
        Back
    </button>


  )
}



export default Back