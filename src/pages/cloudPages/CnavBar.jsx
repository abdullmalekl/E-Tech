import React, { Fragment,useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { selectImage } from '../../state/authSlice';
// import moment from 'moment';
import 'moment/locale/ar';
import './style.css';
import { NavLink } from 'react-router-dom';

const CnavBar = (props) => {
  
  const [image , setImage] = useState(useSelector(selectImage));
  const[list , setList] = useState(false);
  const[notify , setNotify] = useState(true);

  const [device, setDevice] = useState(useSelector((state)=> state.devices?.devices[0]?.deviceName));
  var devices = useSelector((state)=> state.devices);


// const notifications = useSelector((state)=> state.notifications);
// console.log(notifications);




  const notyfyHandler = ()=>{

    setList(true);
// this is for red notification alarm
    setNotify(false);
  }
  

 var content = null;

 const [isOpen, setIsOpen] = useState(false);



 const toggleMenu = () => {
   setIsOpen(!isOpen);
 };
 const handleOptionClick = (device) => {
  console.log(device.id);
 props.deviceChanger(device);
 setDevice(device.deviceName);
  setIsOpen(false);
};
  return (
   <Fragment>
     <div  style={{backgroundColor: '#33373E' , position:'fixed' , top:1 , left:3 , height:44 , width:1134 , borderRadius: 8   }}>
       <div style={{position:'relative' , right:544 , bottom:8}} className="dropdown border-top">
      <div className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none " id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={`https://etech.justhost.ly/storage/app/public/profile/images/${image}`} alt="mdo" width="28" height="28" className="rounded-circle"/>
      </div>
      <ul id='dropp' style={{zIndex: 1000 , position: 'absolute'}}  className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
      
        <li><NavLink className="dropdown-item" to="/profile">الملف الشخصي</NavLink></li>
      </ul>
    </div>
    {/* <div onClick={notyfyHandler}  id="drop2" >
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="mdi:bell-outline">
<path id="Vector" d="M12.5 26.25H17.5C17.5 27.625 16.375 28.75 15 28.75C13.625 28.75 12.5 27.625 12.5 26.25ZM26.25 23.75V25H3.75V23.75L6.25 21.25V13.75C6.25 9.875 8.75 6.5 12.5 5.375V5C12.5 3.625 13.625 2.5 15 2.5C16.375 2.5 17.5 3.625 17.5 5V5.375C21.25 6.5 23.75 9.875 23.75 13.75V21.25L26.25 23.75ZM21.25 13.75C21.25 10.25 18.5 7.5 15 7.5C11.5 7.5 8.75 10.25 8.75 13.75V22.5H21.25V13.75Z" fill="white"/>
</g>
</svg>
{notify && <div style={{width: 8, height: 8, background: '#D20000', borderRadius: 100 , position:'relative' , top:-32 , left:22}} />}
    </div> */}
   {props?.ser === 1?  <div dir='rtl' className="deviceSelect">
    <div onClick={toggleMenu}>
        <span style={{marginLeft:5}}>{device}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className='devicelist'>
          {devices.devices !== 'no'? devices?.devices.map((device , idx)=>(
            <li className='optionlist'
             key={idx}
              onClick={() => handleOptionClick(device)}>
                {device?.deviceName}
                </li>
          )): 'لايوجد'}
        </ul>
      )}
    </div> : ''}

    </div>
 {list === true? <div style={{overflowY: 'auto', maxHeight: 400 , direction: 'rtl'}}  className="list">
 <div id='x' onClick={()=> setList(false)} style={{width: 20, height: 20, background: '#D20000', borderRadius: 100 , position:'fixed' , top:24 , left:70 , color: 'white' , zIndex: 2000}}>
  <p style={{position:'relative' , top:-4 , right:6}}> x</p>
  </div>
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 " style={{width: 390}}>
    <div className="list-group list-group-flush border-bottom scrollarea">
    <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"></svg>
      <span style={{fontFamily: 'Markazi text' , position: 'relative' , right:110}} class="fs-5 fw-semibold">الاشعارات</span>
    </a> 
    {content? content : 'لايوجد اشعارات'}
    </div>
  </div>
    </div> : ''}
   </Fragment>
  )
}

export default CnavBar;