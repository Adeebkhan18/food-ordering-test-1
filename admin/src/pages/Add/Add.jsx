import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-dietary-preference flex-col'>
                    <div className = 'add-dietary-preferences-flex-col'>
                    <p>Veg or Non-Veg</p>
                    <select name = 'dietary' onChange={onChangeHandler}>
                        <option value ="Veg">Veg</option>
                        <option value ="Non-Veg">Non-Veg</option>
                    </select>
                    </div> 
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Maharaja Thali">Maharaja Thali</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sampurna Bhoj">Sampurna Bhoj</option>
                            <option value="Special Mahabhoj Thali">Special Mahabhoj Thali</option>
                            <option value="Office Parar Thali">Office Parar Thali</option>
                            <option value="3 In 1 Meal Tray">3 In 1 Meal Tray</option>
                            <option value="Mini Thali">Mini Thali</option>
                            <option value="Luchi Combo">Luchi Combo</option>
                            <option value="Tandoor By Kasturi">Tandoor By Kasturi</option>
                            <option value="Tandoorie Breads">Tandoorie Breads</option>
                            <option value="Starters">Starters</option>
                            <option value="Rice Items">Rice Items</option>
                            <option value="Dal">Dal</option>
                            <option value="Bhaja Bhuji">Bhaja Bhuji</option>
                            <option value="Kasturi Special Aamish">Kasturi Special Aamish</option>
                            <option value="Vegetarian Dishes">Vegetarian Dishes</option>
                            <option value="Dhakai Ghoronar Mansho-r-ranna">Dhakai Ghoronar Mansho-r-ranna</option>
                            <option value="Dhakai Ghoronar Murgi-r-ranna">Dhakai Ghoronar Murgi-r-ranna</option>
                            <option value="Dhakai Ghoronar Maacher-r-ranna">Dhakai Ghoronar Maacher-r-ranna</option>
                            <option value="Dhakai Ghoranar Briyani">Dhakai Ghoranar Briyani</option>
                            <option value="Paneer Items">Paneer Items</option>
                            <option value="Breads">Breads</option>
                            <option value="Kabiraji">Kabiraji</option>
                            <option value="Salad">Salad</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
