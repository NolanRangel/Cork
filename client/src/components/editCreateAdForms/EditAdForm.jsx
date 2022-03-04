import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import adService from '../../services/AdService';
import fileService from '../../services/FileService';
import Loader from '../navigation/navigationButtons/Loader';
import styles from "./EditAdForm.module.css";
import pushPin from '../../static/images/drawing-pin.png';

const EditAdForm = () => {
    const history = useHistory();
    const { adId } = useParams();
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ price, setPrice ] = useState(0.00);
    const [ category, setCategory ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ image, setImage ] = useState();
    const [ imagePreview, setImagePreview ] = useState();
    const [ imageError, setImageError ] = useState(null);
    const [ previousImage, setPreviousImage ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ email, setEmail ] = useState('');

    const [ errors, setErrors ] = useState(null);


    const categories = [
        "antiques", "appliances", "arts+crafts", "barter", "bikes", "boats",
        "books", "business", "cars+trucks", "cds+dvds+vhs", "clothes", "collectibles",
        "computers", "electronics", "farm+garden", "free", "furniture", "heavy equipment",
        "household items", "jewelry", "materials", "motorcycles", "musical instruments",
        "photo+video", "rvs+camp", "sporting", "tickets", "tools", "toys+games", "trailers",
        "trailers", "video gaming"
    ]

    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
        "IA", "KS", "KY", "LA", "ME", "MD", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
        "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
        "VA", "WA", "WV", "WI", "WY"
    ]

    useEffect(() => {
        adService.getOneAd(adId)
        .then(response => {
            setTitle(response.data.title);
            setPrice(response.data.price);
            setCategory(response.data.category);
            setDescription(response.data.description);
            setImage(response.data.image)
            setImagePreview(require(`../../static/images/adImages/${response.data.image}`));
            setCity(response.data.city);
            setState(response.data.state);
            setEmail(response.data.email);
            console.log(response.data.email);
        })
        .catch(error => console.error(error))
    },[]);

    const handleImage = (e) => {
        setPreviousImage(image);
        if(e.target.files.length === 0) {
            setImagePreview('');
            setImage('');
            return;
        }

        let file = e.target.files[0];
        let reader = new FileReader();
        if(Math.round(file.size/1024) > 4096) {
            setImageError("File cannot be more than 4MB")
        } else {
            setImageError(null);
            setImage(e.target.files[0]);
    
            reader.onloadend = (e) => {
                setImagePreview(reader.result);
            }
    
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if(previousImage) {
            fileService.deleteFile(previousImage)
            fileService.uploadFile(image)
            .then(response => {
                console.log(response.data);
                const formData = {
                    id: adId,
                    title: title,
                    price: price,
                    category: category,
                    description: description,
                    image: response.data.filePath,
                    city: city,
                    state: state,
                    email: email
                }
                adService.updateAd(formData)
                    .then(response => {


                        if(response.status === 207) {
                            fileService.deleteFile(image);
                            let errorList = [];
                            for(const err of response.data) {
                                errorList.push(err.defaultMessage)
                            }
                            setErrors(errorList);
                            setIsSubmitted(false);
                        } else {

                            let newAd = response.data
                            history.push(`/posted/${newAd.id}`);
                        }
                    })
                })
        } else {
            const formData = {
                id: adId,
                title: title,
                price: price,
                category: category,
                description: description,
                image: image,
                city: city,
                state: state,
                email: email
            }
            adService.updateAd(formData)
                .then(response => {       

                    if(response.status === 207) {
                        let errorList = [];
                        for(const err of response.data) {
                            errorList.push(err.defaultMessage)
                        }
                        setErrors(errorList);
                        setIsSubmitted(false);
                    } else {

                        let newAd = response.data
                        history.push(`/posted/${newAd.id}`);
                    }
                })
        }
    }

    return (
        <div className={`d-flex flex-column align-items-center border p-3 ${styles.paper}`}>
            <h2 className={styles.title}>Edit Your Advertisement</h2>
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between" >
                    <div className="d-flex flex-column">
                        <label>Posting Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" className="form-control" />
                    </div>
                    <div className="d-flex flex-column col-2">
                        <label>Asking Price</label>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" name="price" inputMode="decimal" step="0.01" placeholder="0.00" className="form-control" />
                    </div>
                    <div className="d-flex flex-column">
                        <label>Category</label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} name="category" className="form-control">
                            <option value={null}>Choose a Category</option>
                            {categories.map((category, i) => 
                                <option key={i} value={category}>{category}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <label>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" id="description" cols="30" rows="10" className="form-control" ></textarea>
                </div>
                <div className="d-flex gap-3">
                    <div>
                        <label>Upload Image</label>
                        <div className="d-flex flex-column align-items-center border p-3 bg-white" >
                            <input type="file" name="image" onChange={handleImage} className="form-control" />
                            {imageError && <p className="alert alert-danger mt-1">{imageError}</p>}
                            {imagePreview && <img src={imagePreview} alt="Preview" className={`col-12 p-3 mt-3 ${styles.preview}`} />}
                        </div>
                    </div>
                    <div>
                        <div className="d-flex flex-column">
                            <label>City</label>
                            <input onChange={(e) => setCity(e.target.value)} value={city} type="text" name="city" className="form-control" />
                        </div>
                        <div>
                            <label>State</label>
                            <select onChange={(e) => setState(e.target.value)} value={state} name="state" className="form-control">
                                <option value={null}>--</option>
                                {states.map((state, i) =>
                                    <option key={i} value={state} className='my-0'>{state}</option>
                                )}
                            </select>
                        </div>

                

                        <div>
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" className="form-control" />
                        </div>
                        {errors &&
                            <div className="alert alert-danger d-flex flex-column align-items-center">
                                {errors.map((err, i) => 
                                    <p key={i} className="my-0">{err}</p>
                                )}
                            </div>
                        }
                        {!isSubmitted ?
                        <input type="submit" value="Update Ad" className={`${styles.button} mt-3`} /> :
                        <div className="mt-3"><Loader /> Submitting...</div>}

                    </div>
                </div>
            </form>
            <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinTL}`} />
            <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinTR}`} />
            <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinBL}`} />
            <img src={pushPin} alt="Push pin" className={`${styles.pin} ${styles.pinBR}`} />
        </div>
    )
}

export default EditAdForm;