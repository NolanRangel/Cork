import React, { useState } from 'react'
import adService from '../../services/AdService';
import styles from './SearchBar.module.css';



const SearchBar = ({ setAdList, category }) => {
  const [ query, setQuery ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    adService.getAllAds(category)
            .then(response => {
              let tempList = [...response.data];
              if(query) {
                tempList = tempList.filter( ad => ad.title.toLowerCase().includes(query.toLowerCase()));
              }
              setAdList(tempList);
            });
  }

  return (


    <form onSubmit={handleSubmit} >
        <div className='d-flex flex-column px-3 pt-3'>
            <input onChange={(e)=>setQuery(e.target.value)} value={query} type='text' className='form-control p-0 px-2' placeholder='Search Ads'/>
            <button className={`${styles.button} mt-2`}>
                Go!
            </button>
        </div>
    </form>


  )
}



export default SearchBar