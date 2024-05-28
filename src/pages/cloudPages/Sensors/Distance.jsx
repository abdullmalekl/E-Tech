import React, { useState , useEffect} from 'react';
import '../style.css';
import Pusher from "pusher-js";
const Distance = () => {
  const [gaugeValue, setGaugeValue] = useState(0);
  useEffect(()=>{
    // this connect to pusher using public key
    var pusher = new Pusher('7bc2c2e2db41d26e2652', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('Cloud');
    channel.bind('Distance', function (data) {
      // this when trigger event in backend should this function run and update messages for all
      // users
      // console.log(data);
      if(data.Distance < 10){
        setGaugeValue(0.99);
      }else if(data.Distance > 10 && data.Distance < 15 ){
        setGaugeValue(0.95);
      }else if(data.Distance > 15 && data.Distance < 20 ){
        setGaugeValue(0.90);
      }else if(data.Distance > 20 && data.Distance < 25 ){
        setGaugeValue(0.85);
      }else if(data.Distance > 25 && data.Distance < 30 ){
        setGaugeValue(0.80);
      }else if(data.Distance > 30 && data.Distance < 35 ){
        setGaugeValue(0.75);
      }else if(data.Distance > 35 && data.Distance < 40 ){
        setGaugeValue(0.70);
      }else if(data.Distance > 40 && data.Distance < 45 ){
        setGaugeValue(0.65);
      }else if(data.Distance > 45 && data.Distance < 50 ){
        setGaugeValue(0.60);
      }else if(data.Distance > 50 && data.Distance < 55 ){
        setGaugeValue(0.55);
      }else if(data.Distance > 55 && data.Distance < 60 ){
        setGaugeValue(0.50);
      }else if(data.Distance > 60 && data.Distance < 65 ){
        setGaugeValue(0.45);
      }else if(data.Distance > 70 && data.Distance < 75 ){
        setGaugeValue(0.40);
      }else if(data.Distance > 75 && data.Distance < 80 ){
        setGaugeValue(0.35);
      }else if(data.Distance > 80 && data.Distance < 85 ){
        setGaugeValue(0.30);
      }else if(data.Distance > 85 && data.Distance < 90 ){
        setGaugeValue(0.25);
      }else if(data.Distance > 90 && data.Distance < 95 ){
        setGaugeValue(0.20);
      }else if(data.Distance > 95 && data.Distance < 100 ){
        setGaugeValue(0.15);
      }else if(data.Distance > 100 && data.Distance < 105 ){
        setGaugeValue(0.5);
      }else{
        setGaugeValue(0.1);
      }
    });
  },[]);
  return (
    <div className="radial">
    <div className="gauge">
<div className="gauge__body">
 <div className="gauge__fill" style={{ transform: `rotate(${gaugeValue / 2}turn)` }}></div>
 <div className="gauge__cover">{Math.round(gaugeValue *100)}%</div>
 
</div>
</div>
    </div>
  )
}

export default Distance;