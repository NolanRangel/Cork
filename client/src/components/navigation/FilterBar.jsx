import React from 'react';
import styles from './FilterBar.module.css';
import pushPin from '../../static/images/drawing-pin.png';

const FilterBar = ({children}) => {



  return (
    <div className={`${styles.paper}`}>
        {children}
        <img src={pushPin} alt="Push pin" className={styles.pin} />
    </div>
)
}

export default FilterBar