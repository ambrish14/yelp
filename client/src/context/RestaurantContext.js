import React, { useState,createContext} from "react";

export const RestaurantContext=createContext();

export const RestaurantContextProvider=props=>{
    const [restaurants,setRestaurants]=useState([]);
  const [selectedRestaurant,setSelectedRestaurant]=useState([])
    const AddRestaurant=(restaurant)=>{
        setRestaurants([...restaurants,restaurant]);
    }
    
    return(
        <RestaurantContext.Provider value={{restaurants,setRestaurants,AddRestaurant,selectedRestaurant,setSelectedRestaurant}}>
            {
                props.children
            }
        </RestaurantContext.Provider>
    )
}

    