import React, { useState , useEffect, Fragment} from 'react';
import SideBar from './sideBar';
import CnavBar from './CnavBar';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices } from '../../state/devicesSlice';
import { fetchProjects } from '../../state/projectSlice';
import { fetchSensors } from '../../state/sensorSlice';
import Swal from 'sweetalert2';
import Switch from './Sensors/switch';
import Temprature from './Sensors/Temprature';
import Humidity from './Sensors/Humidity';
import Distance from './Sensors/Distance';
import Light  from './Sensors/Light';
import FireDetector from './Sensors/FireDetector';
import SmokeDetector from './Sensors/SmokeDetector';
import Pusher from "pusher-js";
const Enviroment = () => {
  const [waiting , setWaiting] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchProjects());
    dispatch(fetchDevices());
    dispatch(fetchSensors());
  },[dispatch]);
  var sensors = useSelector((state)=> state.sensors);
  const [device , setDevice] = useState(useSelector((state)=> state.devices?.devices[0]));
const deviceChanger = (device)=>{
  setDevice(device);
}
console.log(sensors?.sensors);
var content = null;
console.log(sensors.sensors)
if(sensors.sensors !== 'no'){
content =  sensors?.sensors.filter(les =>{
  if(les.board_name === device?.deviceName){
  return les;
 }else{
  return false;
 }

}).reduce((rows, key, index) => (index % 6 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []).map((row, idx) => (
  <div className="row" key={idx}>
    {row.map((les , idx)=>(
 <div  key={idx} className="col-2 mb-3">
     <div  className="card">
       <div className="Ecard-body">
        <div id='sName'>
        <p>{les?.name}</p>
        </div>
       {les.sensorType === 1?<Switch data={les.status} id={les.id} bId={les.board_id} /> 
      :les.sensorType === 2? <Temprature data={les.readerData} /> 
      : les.sensorType === 3? <Humidity data={les.readerData} /> 
      :les.sensorType === 4? <Distance  /> 
      : les.sensorType === 5? <Light data={les.status} id={les.id} bId={les.board_id} /> 
      : les.sensorType === 6? <FireDetector  />  
      :les.sensorType === 7? <SmokeDetector  />: '' }
     </div>
   </div>
   </div>
   )
   )
   }
   </div>
    ))
  }
  useEffect(()=>{
    let timerInterval;
Swal.fire({
  title: "!جاري التحميل",
  timer: 400,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    // const timer = Swal.getPopup().querySelector("b");
    // timerInterval = setInterval(() => {
    //   timer.textContent = `${Swal.getTimerLeft()}`;
    // }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    setWaiting(true);
  }
});
  },[]);

//  here we neeed to take status of board connection from event will triggerd from esp32 to laravel
  const [boardStatus , setBoardStatus] = useState(false);
  useEffect(()=>{
    // this connect to pusher using public key
    var pusher = new Pusher('7bc2c2e2db41d26e2652', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('Cloud');
    channel.bind('Board', function (data) {
      // this when trigger event in backend should this function run and update messages for all
      // users
      console.log(data.Board);
      setBoardStatus(data.Board === 'on'? true : false);
      
    
    });
  },[]);
  return (
    <div style={{backgroundColor: '#283141'}} >
  {waiting? <>
  <div className="Csidebar">
  <SideBar ser={1}/>
  </div>
  <div style={{position: 'relative', zIndex: 1000}}  className="Cnavbar">
    <CnavBar deviceChanger={deviceChanger} ser={1}  />
  </div>
   <div style={{position:'relative' , top:80}}  className="content">
  <div style={{backgroundColor: '#283141' , zIndex:-4 ,top:0 ,width:'100%' , height:'100%' , position:'fixed'}}>
<div className="container">
<div className='devEnv-logo'>
<svg width="100" height="100" viewBox="0 0 150 139" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame 29">
<rect x="0.25" y="0.25" width="149.5" height="138.5" stroke="white" strokeWidth="0.5"/>
<path id="Vector" d="M109.324 49.012L76.9706 32.5906C76.2142 32.2032 75.3641 32 74.5 32C73.6359 32 72.7858 32.2032 72.0294 32.5906L39.6765 49.0154C38.8669 49.4262 38.1914 50.0311 37.7205 50.767C37.2496 51.5029 37.0008 52.3427 37 53.1984V85.8026C37.0008 86.6583 37.2496 87.498 37.7205 88.2339C38.1914 88.9698 38.8669 89.5748 39.6765 89.9855L72.0294 106.41C72.7861 106.797 73.636 107 74.5 107C75.364 107 76.2139 106.797 76.9706 106.41L109.324 89.9855C110.133 89.5748 110.809 88.9698 111.28 88.2339C111.75 87.498 111.999 86.6583 112 85.8026V53.1984C112 52.3421 111.751 51.5016 111.28 50.7651C110.81 50.0285 110.134 49.423 109.324 49.012ZM74.1324 36.1769C74.2406 36.122 74.3619 36.0932 74.4853 36.0932C74.6087 36.0932 74.73 36.122 74.8382 36.1769L105.57 51.7734L74.5 67.5369L43.4301 51.7734L74.1324 36.1769ZM41.7794 86.3992C41.6667 86.3389 41.5732 86.2518 41.5086 86.147C41.444 86.0422 41.4106 85.9233 41.4118 85.8026V55.4074L72.2941 71.0891V101.887L41.7794 86.3992ZM107.191 86.3992L76.7059 101.887V71.0823L107.588 55.4006V85.7958C107.591 85.9177 107.558 86.0379 107.493 86.1441C107.429 86.2502 107.334 86.3383 107.221 86.3992H107.191Z" fill="white"/>
</g>
</svg>
</div>
<div className="boardname">
<div className="bName" >
{device !== 'n'? device?.deviceName : 'لايوجد'}
</div>
</div>
<div className="projecticon">
<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="material-symbols-light:construction">
<path id="Vector" d="M23.6974 25L16.7574 18.06L18.0837 16.7337L25.0237 23.6725L23.6974 25ZM6.32744 25L4.99994 23.6725L13.6974 14.9762L9.98494 11.2887L9.30244 11.9712L8.11744 10.7625V13.0125L7.43494 13.695L4.15869 10.4187L4.84119 9.73499H7.09119L5.88994 8.55749L8.59619 5.85124C8.88452 5.56291 9.20036 5.34874 9.54369 5.20874C9.88619 5.06958 10.2516 4.99999 10.6399 4.99999C11.0274 4.99999 11.3924 5.06958 11.7349 5.20874C12.0783 5.34874 12.3941 5.56291 12.6824 5.85124L10.6249 7.90874L11.9949 9.27874L11.3124 9.96124L15.0249 13.6487L18.2212 10.4525C18.0254 10.175 17.8895 9.89124 17.8137 9.60124C17.7379 9.31124 17.6999 8.99291 17.6999 8.64624C17.6999 7.62541 18.0537 6.76124 18.7612 6.05374C19.4687 5.34624 20.3329 4.99249 21.3537 4.99249C21.5704 4.99249 21.7787 5.00791 21.9787 5.03874C22.1804 5.06874 22.3791 5.13041 22.5749 5.22374L19.9849 7.81249L22.1874 10.015L24.7762 7.42499C24.8737 7.62083 24.9366 7.81916 24.9649 8.01999C24.9933 8.22166 25.0074 8.43041 25.0074 8.64624C25.0074 9.66708 24.6533 10.5312 23.9449 11.2387C23.2383 11.9471 22.3745 12.3012 21.3537 12.3012C21.007 12.3012 20.6887 12.2637 20.3987 12.1887C20.1087 12.1154 19.8254 11.9787 19.5487 11.7787L6.32744 25Z" fill="#007ACC"/>
</g>
</svg>
</div>
<div className='projectName'>
<p className="pName">
{device !== 'n'? device?.projectName : 'لايوجد'}
</p>
</div>
<div className={boardStatus? `boardstatuson` : 'boardstatusoff'}>
<div style={{width: 54, height: 25, textAlign: 'right', color: 'white', fontSize: 16, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>
  {boardStatus? 'متصل' : 'منقطع'}
  </div>
</div>
<div style={{width: '100%', height: 1, border: '1px #007ACC solid' , position:'relative' , bottom: '20%'}}></div>
<div className="controllers">

 {content? content : <div>
  <p style={{position: 'relative' , right:435 , top: 80, fontWeight: 'bold' , fontSize: 24, color: 'white' , fontFamily: 'Markazi text'}}>
  لايوجد مستشعرات !
  </p>
  <p style={{position: 'relative' , right:380 , top: 80, fontWeight: 'bold' , fontSize: 18, color: 'white' , fontFamily: 'Markazi text'}}>
  قم باضافة مستشعرات من صفحة المستشعرات
  </p>
  </div>}
  
</div>
</div> 
</div>
  </div>
 </>:''}
</div>
  )
}

export default Enviroment;