import { Link,  useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet'
import './Home.css'


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [gameItem, setGameItem] = useState([])
  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {'sort-by': 'popularity'},
    headers: {
      'X-RapidAPI-Key': '855032fac2mshce586440e2b8a82p18833fjsn8d7ac0540df8',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  
  useEffect(() => {
    axios.request(options).then(function (response) {
      setGameItem(response.data);
      console.log(response.data);
      setIsLoading(false)

    }).catch(function (error) {
      console.error(error);
      setIsLoading(true)

    });
  }, [])
 

  let navigate = useNavigate()
  let goToAll = ()=>{
    navigate('all')
  }




  return (
    <>
        <Helmet>
         <meta charSet="utf-8" />
        <title>Home</title>
      
        </Helmet>


{gameItem.length>0?<>

  <section >
    <div className="homeBg">
      <div className="homeInfo d-flex align-items-center justify-content-center flex-column p-5">
        <h2 className='fw-bolder text-center'>Find & track the best <span className='text-primary'>free-to-play </span>games!</h2>
        <p className='text-muted text-center '>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <button className='btn btn-outline-secondary' onClick={goToAll}> Browse Games</button>
      </div>
    </div>
  </section>
  <section className='pt-5'>
    <div className="gameTittle">
      <h3 className='fw-bolder'><i className="fa-solid fa-robot text-lead"></i>Personalized Recommendations</h3>
    </div>
    <div className="game">
    <div className="row gy-3 pt-5 pb-5">
      {gameItem.slice(0,3).map((item,index)=>
      <div key={index} className="col-md-4">
      
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
        <a className="btn btn-secondary btn-sm rounded-3 me-1 rounded-pill"> {item.genre} </a>
         <a  className="btn btn-secondary btn-sm rounded-3 "> <i className="fa-brands fa-windows"></i></a> 
        
        </div>
        </div>
      </div>
    </div>
    
      </div>

      </Link>
      </div>)}
    </div>
    </div>

  </section>
</>:<>
<div className="row pt-5">
{isLoading && (<>

  <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-center mt-5">
                  
                <span className="loader">Load&nbsp;ng</span>
                </div>
              </div>


</> )} 
  </div>     
</>}


    </>
    )
}
