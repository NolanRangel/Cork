import React from 'react';
import styles from './ComponentWithNavigation.module.css';

// Takes 3 child components and displays the first two in a 'navigation' column on the left side of the page, and centers the third ad the main component on the right.

const ComponentWithNavigation = ({children}) => {
    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.navigation}>
                    {typeof children === Object && children}
                    {children.length>1 && children[0]}
                    {children.length>1 && children[1]}
                    <div>.</div>
                </div>
                <div className={styles.main}>
                    {children.length>2 && children[2]}
                </div>
            </div>
        </div>
    )
}

export default ComponentWithNavigation;