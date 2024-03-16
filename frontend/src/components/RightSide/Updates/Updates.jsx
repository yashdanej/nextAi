import React, { useEffect, useState } from 'react'
import './Updates.css'
import { UpdatesData } from '../../../Data/Data'
import axios from 'axios';

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const api = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=e20ee4b0cf8147e4a275c411aa4b06eb`;
  const fetchUpdates = async () => {
    await axios.get(api).then((response) => {
      console.log('response', response);
      setUpdates(response.data);
    })
  }
  const handleDate = (day) => {
    const dateObject = new Date(day);
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    return formattedDate
  }
  useEffect(() => {
    fetchUpdates().then(() => {console.log(updates);});
  }, []);
  
  return (
    <div className='Updates'>
        {
          updates?.articles?.map((update)=> {
            return (
            <div className="update">
              <a target='_blank' href={update.url}><img src={`${update.urlToImage ? update.urlToImage: "/nofound.webp"}`} alt="" /></a>
              <div className="noti">
                <div style={{marginBottom: '0.5rem'}}>
                  <span><a target='_blank' style={{color: 'inherit', textDecoration: 'none'}} href={update.url}>{update.source.name}: </a></span>
                  <span>{update.title.length<=60?update.title:update.title.slice(0, 60)+'...'}</span>
                </div>
                <span>{handleDate(update.publishedAt)}</span>
              </div>
            </div>
            )
          })
        }
    </div>
  )
}

export default Updates