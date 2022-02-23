import React, { useState,useEffect } from "react";
import 'antd/dist/antd.css';

import { Card } from 'antd';

const { Meta,} = Card;
const Weather3=()=>{
    let [city,setCity]=useState("");
    let [wdata,setWdata]=useState([{}]);
    let [im,setIm]=useState("./images/b1.jpg");
    let [rangeId,setRangeid]=useState();
    let [k,setK]=useState(0);

    useEffect(() => {
      let k1=wdata.weather;
         
     let s=k1 && k1.length ? k1[0].id:null;
     console.log(s);
     
    
      
      getImg(s);
       
    },[k]);
const getImg=(rid)=>{
 
  console.log(rid);

      
    if(rid>=200 && rid<=232){
        setIm("./images/th1.jpg");
      }

    else if(rid>=300 &&  rid<=321){
    setIm("./images/drizzle1.jpg");
    }
    else if(rid >=500 && rid<=531){
    setIm("./images/rain1.jpg");
    }
    else if(rid>=600 && rid<=622){
    setIm("./images/snow1.jpg");
    }
    else if(rid>=701 && rid<=781){
   setIm("./images/m1.jpg");
    }
    else if(rid>=801 && rid<=804){
    setIm("./images/cloudy1.jpg");
    }
    else if(rid==800){
    setIm("./images/clear2.jpg");
    }
    else{
      setIm("./images/df1.jpg");
    }
    
  
}
    const getWeather= (event)=>{
        
       if(event.key=="Enter"){
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cd379e332ef865d973c7ec80318605eb`)
            .then(response=> response.json()
            ).then(
                data=>{
                    setWdata(data)
                    setCity("")
                    setK(k+1);
                   }
            )
            
           
            }  
            
               
    }
  
    return(<>
   
 <div style={{marginTop:"10px"}} >

     <input

    style={{width:"30%",marginLeft:"400px"}}
     placeholder="Enter city and press ENTER."
        onChange={e =>setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
        
        />
       
      <br/>
    {typeof wdata.main ==='undefined'?(
        <div>
            <Card
    hoverable
    style={{ width: 600,marginLeft:"300px",padding:"10px"}}
    cover={<img  src="./images/b1.jpg" />}
  >
      
    <Meta title="What's the weather today?" description="Enter your city to know your weather" />
  </Card>
        </div>
    
    ):(
    <div >
      {/*  <img src="./images/m1.jpg" width="100%" height="50%" />
      style={{backgroundImage: "url('{im}')"}}
      */}
  
  <Card
   hoverable
   style={{ width: 600,marginLeft:"300px",padding:"10px",}}
   cover={<img  src={im} />}
>
     <Meta title={wdata.name} />
     <p style={{textAlign:"left",fontSize: "13px"}}>{wdata.weather[0].main}</p>
   <p style={{textAlign:"right",fontSize: "20px"}}>  {wdata.main.temp}°C   </p>
       
        </Card>
        
        </div>
        )}
    {wdata.cod ==="404"?(
        <p>CITY NOT FOUND</p>
    ):(
        <>
        </>
    )}



  </div> 
    </>)
   
}
export default Weather3