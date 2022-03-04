import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './navButton.module.css';

const PostAd = () => {
  const history = useHistory();

  return (


    <button onClick={() => history.push('/post_ad')} className={styles.button}>
            Post Ad
    </button>


  )
}



export default PostAd