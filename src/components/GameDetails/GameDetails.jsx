import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GameDetails() {
  let {id}=useParams();
    
  const [isLoading, setIsLoading] = useState(true)
  const [gameDetail, setGameDetail] = useState([])


  let [minRequirements,setMinRequirements] = useState([]);
  let [screenData,setScreenData] = useState([]);


    let gameDetails = async()=>{
        let { data } = await axios.get(
            `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
            {
              headers: {
                "X-RapidAPI-Key":
                  "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
              },
            }
            
          );
          let minResponse = data.minimum_system_requirements;
          let screenResponse = data.screenshots;
          setGameDetail(data);
          setMinRequirements(minResponse)
          setScreenData(screenResponse)
          // console.log(screenResponse);
          setIsLoading(false)
          
        
          
    }
    useEffect(() => {
        gameDetails()
    },[])
      
  return (
    <>
  
<div className="row pt-5">
{isLoading && (<>

  <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-center mt-5">
                  
                <span className="loader">Load&nbsp;ng</span>
                </div>
              </div>


</> )} 
  </div>     
    
  <div className="row">
      {/* img  */}

   <div  className="col-md-4">
    <img className='w-100' src={gameDetail.thumbnail} alt="" />
      <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
        <button className='btn btn-secondary'>Free</button>
       <a className='btn btn-primary w-75 text-decoration-none text-white ' target="_blank" href={gameDetail.game_url}>PLAY NOW</a>
      </div>
    </div>
      {/* title   */}

    <div className="col-md-8">
      <h3>{gameDetail.title}</h3>
      <h5>About {gameDetail.title}</h5>
      <p>{gameDetail.description  }</p>


      {/* min Requirements   */}


    {minRequirements==null?"":<>
    
    <h5 className='pt-3 fw-bolder'>Minimum System Requirements</h5>
      <h6>graphics : {minRequirements.graphics}</h6>
        <h6>memory : {minRequirements.memory}</h6>
        <h6>os : {minRequirements.os}</h6>
        <h6>processor :{minRequirements.processor}</h6>
        <h6>storage : {minRequirements.storage}</h6>
      
    </>}

        {/* slider */}


      
      

      {screenData ==null?"":<>
      <h5 className='pt-4 pb-2 fw-bolder' >{gameDetail.title} Global Screenshots</h5>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">

        <div  className="carousel-inner">
  {screenData.map((item,id)=>
            <div key={id}  className="carousel-item active">
            <img src={item.image} className="d-block w-100"  />
            </div>
        
        )
      }  
      </div>

</div>

      
      
      </>}



        {/* About details */}



<div className="pt-5 ">
        <div className="col-md-12">
        <div className='d-flex justify-content-between align-items-center'>
    <p>Title<br/>{gameDetail.title}</p>
    <p>Developer<br/>{gameDetail.developer}</p>
    <p>Publisher<br/>{gameDetail.publisher}</p>
</div>
        </div>
        <div className="col-md-12">
          <div className='d-flex justify-content-between align-items-center'>
    <p>Release Date<br/>{gameDetail.release_date}</p>
    <p>Genre<br/>{gameDetail.genre}</p>
    <p>Platform<br/>{gameDetail.platform}</p>
</div>
        </div>
  </div>    

      </div>

  
  </div>



    </>
  )
}
