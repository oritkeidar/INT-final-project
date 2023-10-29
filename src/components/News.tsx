import React, {useEffect,useState} from 'react'
import { useNavigate} from 'react-router-dom'
import logo from "../images/fitness.png"
import axios from 'axios'
import './News.css'

export default function News() {
    const navigate = useNavigate();
    const firstName = window.localStorage.getItem("userFirstName")
    const [sportNews, setSportNews] = useState([]) as any

   const getSportsNews = async()=>{
    const options = {
        method: 'GET',
        url: 'https://sport-news2.p.rapidapi.com/news',
        headers: {
          'X-RapidAPI-Key': '294c900d03mshde2762afdcde846p147a3ajsn3d80176cfd01',
          'X-RapidAPI-Host': 'sport-news2.p.rapidapi.com'
        }
      };
 
      try {
          const response = await axios.request(options);
          console.log(response.data);
          setSportNews(response.data)
      } catch (error) {
          console.error(error);
      }};

 useEffect(()=>{
        getSportsNews()
      },[])

   
  return (
    <div className='news'>
         <img style={{height:'200px', width:'250px'}} className="news-logo" src={logo} alt="" />
    <h2>Welcome {firstName}</h2>
<div id="news-container">
    <div><h5 style={{width:'100px'}} id="moving-text1">All sports news</h5></div>
    <div><h5 id="moving-text2">In one place</h5></div>
   </div>
   {sportNews.map((item:any):any =>{
return <div>{item}</div>
   })}
    <button id='activies-manage' onClick={()=> navigate('/getUserAccount')}>Manage your sports activity</button>
    </div>
  )
}
