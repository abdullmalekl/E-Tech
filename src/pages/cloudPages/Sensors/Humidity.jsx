import React, { useEffect, useState } from 'react'
import '../style.css';
import Pusher from "pusher-js";
const Humidity = ({data}) => {
    const [humidity , setHumidity] = useState(data);
    useEffect(()=>{
        // this connect to pusher using public key
        var pusher = new Pusher('7bc2c2e2db41d26e2652', {
          cluster: 'mt1'
        });
    
        const channel = pusher.subscribe('Cloud');
        channel.bind('Humdity', function (data) {
          // this when trigger event in backend should this function run and update messages for all
          // users
          // console.log(data);
          setHumidity(data.Humidity);
          
        
        });
      },[]);
  return (
    <div id='hum'>
        <svg style={{position: 'relative' , right: 16 , bottom:14}} width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.9844 21.3406C32.375 32.5906 27.4844 39.6219 27.4844 46.45C27.4844 53.2781 33.0781 58.8406 39.9844 58.8406C46.8906 58.8406 52.4844 53.2938 52.4844 46.45C52.4844 39.6063 47.5938 32.575 39.9844 21.3406Z" stroke="white" stroke-width="0.878906" stroke-miterlimit="10"/>
<path d="M34.1875 39.1406C34.6875 38.6719 35.401 38.4375 36.3281 38.4375C37.2552 38.4375 37.9635 38.6719 38.4531 39.1406C38.9531 39.599 39.2031 40.2448 39.2031 41.0781V42.3281C39.2031 43.1406 38.9531 43.776 38.4531 44.2344C37.9531 44.6927 37.2448 44.9219 36.3281 44.9219C35.3906 44.9219 34.6771 44.6927 34.1875 44.2344C33.6979 43.776 33.4479 43.1406 33.4375 42.3281V41.0781C33.4375 40.2448 33.6875 39.599 34.1875 39.1406ZM45.3125 38.8906C45.3319 38.9608 45.3335 39.0347 45.3171 39.1056C45.3008 39.1766 45.2669 39.2423 45.2187 39.2969L36.9375 50.75C36.8244 50.9252 36.6752 51.0744 36.5 51.1875C36.2685 51.2641 36.0246 51.2959 35.7812 51.2813H35.0938C34.8906 51.2813 34.7656 51.2188 34.7031 51.1094C34.6799 51.0334 34.6778 50.9525 34.6971 50.8754C34.7164 50.7984 34.7563 50.728 34.8125 50.6719L43.0937 39.2188C43.1883 39.0438 43.3287 38.898 43.5 38.7969C43.7228 38.7308 43.9555 38.7043 44.1875 38.7188H44.9531C45.1406 38.7188 45.2656 38.7812 45.3125 38.8906ZM36.3281 40.0781C35.526 40.0781 35.125 40.4427 35.125 41.1719V42.2188C35.125 42.9479 35.526 43.3125 36.3281 43.3125C37.1302 43.3125 37.5312 42.9479 37.5312 42.2188V41.1562C37.5312 40.4375 37.1302 40.0781 36.3281 40.0781ZM41.5469 45.7656C42.0365 45.2969 42.75 45.0625 43.6875 45.0625C44.625 45.0625 45.3333 45.2969 45.8125 45.7656C46.3125 46.2344 46.5625 46.8802 46.5625 47.7031V48.9531C46.5625 49.7656 46.3125 50.401 45.8125 50.8594C45.3125 51.3177 44.599 51.5521 43.6719 51.5625C42.7448 51.5625 42.0365 51.3333 41.5469 50.875C41.0573 50.4167 40.8073 49.776 40.7969 48.9531V47.7031C40.7969 46.8698 41.0469 46.224 41.5469 45.7656ZM43.6719 46.7188C42.8802 46.7188 42.4844 47.0833 42.4844 47.8125V48.8438C42.4844 49.5729 42.8802 49.9375 43.6719 49.9375C44.4635 49.9375 44.8646 49.5729 44.875 48.8438V47.7969C44.875 47.0781 44.474 46.7188 43.6719 46.7188Z" fill="white"/>
</svg>
          {humidity.slice(0,2)}
           </div>
  )
}

export default Humidity;