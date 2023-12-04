import React from 'react';
import {Routes ,Route} from 'react-router-dom';
import Home from './routes/Home';
import  RestaurantsDetailsPage from './routes/RestaurantsDetailsPage';
import UpdatePage from './routes/UpdatePage';
import { RestaurantContextProvider } from './context/RestaurantContext';
const App=()=>{
    return (
        <RestaurantContextProvider>
        <div className='container'>
        <Routes>
    <Route path='/' Component={Home} />
   <Route path='/restaurants/:id/update' Component={UpdatePage} />
   <Route path='/restaurants/:id' Component={ RestaurantsDetailsPage} />
   <Route path='/restaurants/:id/update' Component={UpdatePage} />
</Routes>
   </div>
</RestaurantContextProvider>

        )};
    export default  App;