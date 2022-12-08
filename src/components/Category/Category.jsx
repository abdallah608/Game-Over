import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'

export default function Category() {
    let params =useParams();
    const [moreItem, setMoreItem] = useState(16)
    const [isLoading, setIsLoading] = useState(true)
      const [gameItem, setGameItem] = useState([])
      

      const showMoreItems =()=>{
        setMoreItem(more=> more + 8)
      }
      
      
      const options = {
        method: 'GET',
        url:  `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${params.genre}`,
        
        headers: {
            'X-RapidAPI-Key': '855032fac2mshce586440e2b8a82p18833fjsn8d7ac0540df8',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
      };
      
        useEffect(() => {
        axios.request(options).then(function (response) {
          setGameItem(response.data);
          setIsLoading(false)
    
      }).catch(function (error) {
        setIsLoading(true)
  
        console.error(error);
      });
      }, [params.genre])
        

      
      

    return (

        <>

        <Helmet>
         <meta charSet="utf-8" />
        <title>Category</title>
      
        </Helmet>

        
        {gameItem.length>0?
        <>
        <div className="row gy-3 pt-5">
          {gameItem.slice(0,moreItem).map((item,index)=>
          <div key={index} className="col-md-3">
            <Link className='nav-link' to={`/gameDetails/${item.id}`}>
        
          <div className='itemHover'>
          <div className="card bg-dark" >
          <img src={item.thumbnail} className="card-img-top w-100" alt="..." />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bolder">{item.title?.split(" ").splice(0,4).join(" ")}...</h6>
            <button href="#" className="btn btn-primary btn-sm rounded-3">Free</button>
            </div>
            <p className="card-text">{item.short_description?.split(" ").splice(0,2).join(" ")}...</p>
            <div className="d-flex justify-content-between align-items-center">
          
            <button href="#" className="btn btn-secondary btn-sm rounded-3">  <i className="fa-solid fa-plus"></i></button>
            <div className="d-flex justify-content-between align-items-center ">
            <button className="btn btn-secondary btn-sm rounded-3 me-1 rounded-pill"> {item.genre} </button>
             <button  className="btn btn-secondary btn-sm rounded-3 "> <i className="fa-brands fa-windows"></i></button> 
            
            </div>
            </div>
          </div>
        </div>
        
          </div>
        
            </Link>
          </div>)}
        
          <div className="text-center pt-4 pb-4">
          <button className='btn btn-secondary w-25' onClick={showMoreItems}>More Games</button></div>
        
        </div>
        </>:<div className="row pt-5">
        {isLoading && (<>
        
          <div className="col-md-12">
                        <div className="d-flex align-items-center justify-content-center mt-5">
                          
                        <span className="loader">Load&nbsp;ng</span>
                        </div>
                      </div>
        
        
        </> )} 
          </div>     
        }
        
        
        </>


  )
}
