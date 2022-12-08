import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import All from '../All/All'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Masterlay from '../Masterlay/Masterlay'
import Notfound from '../Notfound/Notfound'
import Register from '../Register/Register'
import { Offline, Online } from "react-detect-offline";
import jwtDecode from "jwt-decode";
import GameDetails from "../GameDetails/GameDetails";
import Productedroute from "../Productedroute/Productedroute";
import Platform from "../Platform/Platform";
import Category from "../Category/Category";
import SortBy from "../SortBy/SortBy";


export default function App() {
  const [userData, setUserData] = useState(null)
  let saveUserData=()=>{
    let encodedToken= localStorage.getItem('token');
    let decodedToken=jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let logOut=()=>{
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='login'/>
  }
  useEffect(() => {
if(localStorage.getItem('token')){
  saveUserData()
}
  }, [])

  
  const route = createBrowserRouter([{
    path:'/',
    element:<Masterlay   userData={userData} logOut={logOut}/>,
    errorElement:<Notfound/>,
    children:[
      {index:true , element: <Productedroute userData={userData}> <Home/> </Productedroute> },
      {path:'all' , element:<Productedroute userData={userData}> <All/> </Productedroute>},
      {path:'platform/:platform',element:<Productedroute userData={userData}> <Platform/> </Productedroute>},
      {path:'category/:genre',element:<Productedroute userData={userData}> <Category/> </Productedroute>},
      {path:'sortby/:sortby',element:<Productedroute userData={userData}> <SortBy/> </Productedroute>},
      {path:'gameDetails/:id' , element: <Productedroute userData={userData}>  <GameDetails/> </Productedroute>},
      {path:'login' , element:<Login saveUserData={saveUserData }/>},
      {path:'register' , element:<Register/>},
    ]


  }])
  
  return (
<>

<div>
<Online><RouterProvider router={route}/></Online>
<Offline><div className="alert alert-danger fixed-bottom">
You are now offline, Please reconnect your internet again
  </div></Offline>
</div>
</>
  )
}
