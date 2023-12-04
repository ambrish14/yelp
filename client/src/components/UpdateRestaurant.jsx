import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import {useNavigate} from 'react-router-dom';
const UpdateRestaurant=()=>{
    const {id}=useParams();
    const {restaurants}=useContext(RestaurantContext) 
    const [name,setName]=useState("");
     const [location,setLocation]=useState("");
     const [priceRange,setPriceRange]=useState(""); 
     let history=useNavigate();

     useEffect(()=>{
        const fetchData=async ()=>{
            const response=await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data);

            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPriceRange(response.data.data.restaurants.price_range);

        }
        fetchData()
     },[]);

     const handleSubmit=async (e)=>{
        e.preventDefault();
       const updatedRestaurant= await  RestaurantFinder.put(`/${id}`,
       {name,location,price_range:priceRange})
       console.log(updatedRestaurant);

       history('/'); 
     }

    return (
        <div>
<form action="">
<div className="from-group">
<label htmlFor="name">Name</label>
<input value={name} onChange={e=>setName(e.target.value)} id="name" className="form-control" type="text" />
    </div>

    <div className="from-group">
<label htmlFor="name">Location</label>
<input value={location} onChange={e=>setLocation(e.target.value)} id="location" className="form-control" type="text" />
    </div>

    <div className="from-group">
<label htmlFor="name">Price Range</label>
<input value={priceRange} onChange={e=>setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
    </div>
    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default UpdateRestaurant;