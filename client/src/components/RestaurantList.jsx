import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import {useNavigate} from 'react-router-dom';
const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let history=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleDelete=async(e,id)=>{
    e.stopPropagation();
    try{
const response=await  RestaurantFinder.delete(`/${id}`);
setRestaurants(restaurants.filter(
  restaurant=>{
    return  restaurant.id !== id 
  }
))

}
    catch(err){
console.log(err);
    }

  }

  const handleUpdate=(e,id)=>{
    e.stopPropagation();
    history(`/restaurants/${id}/update`);
    try{

    }
  catch(err){
    console.log(err);
  }
}
const handleRestaurantSelect=(id)=>{
   history(`/restaurants/${id}`);
}

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr onClick={()=>handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>reviews</td>
                  <td>
                    <button onClick={(e)=>handleUpdate(e,restaurant.id)} className="btn btn-primary">Update</button>
                  </td>
                  <td>
                    <button onClick={(e)=>handleDelete(e,restaurant.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
            <td>mcdonalds</td>
            <td>New Yprk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-primary">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>

          <tr>
            <td>mcdonalds</td>
            <td>New Yprk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-primary">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
export default RestaurantList;
