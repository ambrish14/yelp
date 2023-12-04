import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
const AddRestaurant = () => {
const{ AddRestaurant}=useContext(RestaurantContext);
    const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price range");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      AddRestaurant(response.data.data.restaurant);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4  ">
      <form action="">
        <div className="form-row d-flex">
          <div className="col  d-inline-block">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col  d-inline-block">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="col  d-inline-block">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option value="disabled">Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary d-inline-block"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddRestaurant;
