import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ClientHomePage from './components/ClientHomePage';
import AdminHomePage from './components/AdminHomePage';
import DeliveryUserHomePage from './components/DeliveryUserHomePage';
import RestaurantManagerHomePage from './components/RestaurantManagerHomePage';
import ProductsPage from './components/ProductsPage';
import UserContext from './components/context/UserContext';
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import AddRestaurantManager from './components/admin menu/AddRestaurantManager';
import AddRestaurant from './components/admin menu/AddRestaurant';
import UpdateRestaurant from './components/admin menu/UpdateRestaurant';
import AddReview from './components/AddReview';
import Order from './components/Order';
import ClientAccountInfoMenu from './components/client menu/ClientAccountInfoMenu';
import CartProducts from './components/CartProducts';
import AdminAccountMenu from './components/admin menu/AdminAccountMenu';
import RestaurantPage from './components/RestaurantPage';
import FinishOrderPage from './components/FinishOrderPage';


import DeliveryUserAccountMenu from './components/delivery user menu/DeliveryUserAccountMenu';
import ManagerMenu from './components/restaurant manager menu/ManagerMenu';

function App() {


    const [user, setUser] = useState({})

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(token !== "undefined" && token !== null){
            fetch("/get-info-from-token/" + token, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(response => setUser(response))
        }
    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                  
                    <Route path='/restaurant/:idParam' element={<RestaurantPage/>}/>
                
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/home-client' element={<ClientHomePage/>}/>
                    <Route path='/home-admin' element={<AdminHomePage/>}/>
                    <Route path='/home-delivery-user' element={<DeliveryUserHomePage/>}/>
                    <Route path='/home-restaurant-manager' element={<RestaurantManagerHomePage/>}/>
                    <Route path='/products/:idParam' element={<ProductsPage/>}/>
                    <Route path='/add-restaurant-manager' element={<AddRestaurantManager/>}/>
                    <Route path='/add-restaurant' element={<AddRestaurant/>}/>
                    <Route path='/update-restaurant/:id' element={<UpdateRestaurant/>}/>
                    <Route path='/add-review' element={<AddReview/>}/>
                    <Route path='/order/:idParam' element={<Order/>}/>
                    
                    {/* Client account menu */}
                    <Route path='/client-account/saved-addresses' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/account-info' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/account-info/edit' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/orders/:id' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/orders' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/reviews' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/favorite-products' element={<ClientAccountInfoMenu/>}/>
                    <Route path='/client-account/notifications' element={<ClientAccountInfoMenu/>}/>
    
                    <Route path='/client-account/view-cart' element={<CartProducts/>}/>
                    <Route path ='/client-account/finish-order' element ={<FinishOrderPage/>}/>
                   
                    {/* Admin account menu */}
                    <Route path='/admin-account/account-info' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/add-delivery-user' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/add-restaurant' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/restaurants' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/delivery-users' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/check-registered-users' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/check-orders-total-count' element={<AdminAccountMenu/>}/>
                    <Route path='/admin-account/account-info/edit' element={<AdminAccountMenu/>}/>

                    {/* Deliver account menu */}
                    <Route path='/deliver-account/account-info' element={<DeliveryUserAccountMenu/>}/>
                    <Route path='/deliver-account/new-orders' element={<DeliveryUserAccountMenu/>}/>
                    <Route path='/deliver-account/current-order' element={<DeliveryUserAccountMenu/>}/>
                    <Route path='/deliver-account/delivered-orders' element={<DeliveryUserAccountMenu/>}/>
                    <Route path='/deliver-account/delivered-orders/:id' element={<DeliveryUserAccountMenu/>}/>

                    {/* Manager account menu */}
                    <Route path='/manager-account/account-info' element={<ManagerMenu/>}/>
                    <Route path='/manager-account/owned-restaurants' element={<ManagerMenu/>}/>
                    <Route path='/manager-account/owned-restaurants/:id' element={<ManagerMenu/>}/>
                    <Route path='/manager-account/reviews' element={<ManagerMenu/>}/>
                
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}
export default App;