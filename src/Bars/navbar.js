import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.css';
import { NavLink , useNavigate } from "react-router-dom";
import {   useDispatch, useSelector } from "react-redux";
import {  login, selectFirstName ,selectImage, selectRole  } from "../state/authSlice";
import api from '../app/api/apiSlice';
import malek from '../components/dashboard/Rectangle 8.png';
import Swal from 'sweetalert2';
const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var firstName = useSelector(selectFirstName);
  var image = useSelector(selectImage);
  var role = useSelector(selectRole);
  const getInfo = async()=>{
    try{
      const res = await api.get('/me');
      if(res.status === 200 && firstName === null){
        console.log(res.data);
        const credentials = {
          name: res.data.name,
          last_name: res.data.last_name,
          role: res.data.role,
          image: res.data.image !== null? res.data.image : malek  
          }
          dispatch(login(credentials));
      }
    }catch{
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 10,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "شبكة الاتصال غير مستقرة"
      }); 
    }
  };
 
  const token = localStorage.getItem('user');
  useEffect(()=>{
    if(token){
      getInfo();
    }
  },[]);
  const [les , setLes] = useState(0);
  const homeHandler = ()=>{
    navigate('/');
    setLes(0);
   
  }
  return (
    <div >

<nav id={styles.navi} className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <NavLink  to="/" onClick={()=> setLes(0)} className="navbar-brand"  >
    <div id={styles.etech}> E-Tech</div>
</NavLink>
  <svg onClick={homeHandler} className={styles.ebrand}  width="45" height="30" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M43.5378 25.5578V14.2717L44.245 13.9002C44.7047 13.6624 44.9943 13.1909 44.9999 12.6747C45.0055 12.1598 44.7251 11.6827 44.271 11.4344L23.1189 0.172111C22.6958 -0.058732 22.184 -0.0573766 21.758 0.176264L0.72196 11.4526C0.274131 11.7009 -0.00279062 12.1724 2.12119e-05 12.6838C0.00283305 13.1952 0.285422 13.6631 0.738875 13.9066L9.98208 18.8025C9.86609 19.0061 9.79439 19.2383 9.79439 19.4888V31.3275C9.79444 31.5249 9.83643 31.72 9.9176 31.9002C9.99877 32.0803 10.1173 32.2413 10.2654 32.3726C10.5705 32.6419 13.492 35 22.4245 35C31.3254 35 34.3256 32.7713 34.6384 32.5174C34.9653 32.2523 35.1544 31.8549 35.1544 31.4338V19.2915C35.1544 19.0949 35.1129 18.9081 35.0398 18.7388L40.726 15.7497V25.5655C39.8923 26.051 39.3271 26.9415 39.3271 27.9711C39.3271 29.5164 40.5861 30.7692 42.139 30.7692C43.6918 30.7692 44.9508 29.5164 44.9508 27.9711C44.9508 26.9351 44.3778 26.0411 43.5378 25.5578ZM32.3424 30.6321C31.2374 31.161 28.3131 32.2019 22.4244 32.2019C16.4985 32.2019 13.6402 31.0938 12.6062 30.5608V20.1932L21.7362 25.0297C21.9411 25.1399 22.1704 25.1976 22.4033 25.1975C22.6302 25.1977 22.8536 25.1427 23.0543 25.0374L32.3424 20.1554V30.6321ZM22.4146 22.2135L4.33095 12.6579L22.4462 2.99683L40.6177 12.63L22.4146 22.2135Z" fill="black"/>
</svg>
    <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
      </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {role !== 'owner'?  <>
          <li  className="nav-item">
     <a className={styles.facebook} href='https://www.facebook.com/khrwat.kh' target="_blank">
     <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="logos:facebook" clipPath="url(#clip0_1_17)">
<path id="Vector" d="M33.8032 16.7759C33.8032 7.62625 26.3859 0.208923 17.2362 0.208923C8.08664 0.208923 0.669312 7.62625 0.669312 16.7759C0.669312 25.0448 6.72763 31.8988 14.6477 33.1415V21.5647H10.4412V16.7759H14.6477V13.126C14.6477 8.97387 17.1211 6.68038 20.9053 6.68038C22.7178 6.68038 24.6137 7.00396 24.6137 7.00396V11.081H22.5247C20.4667 11.081 19.8248 12.3581 19.8248 13.6683V16.7759H24.4196L23.6851 21.5647H19.8248V33.1415C27.7449 31.8988 33.8032 25.045 33.8032 16.7759Z" fill="#1877F2"/>
<path id="Vector_2" d="M23.6851 21.5647L24.4196 16.7758H19.8249V13.6682C19.8249 12.3579 20.4667 11.081 22.5248 11.081H24.6138V7.00393C24.6138 7.00393 22.7179 6.68036 20.9052 6.68036C17.1211 6.68036 14.6477 8.97384 14.6477 13.1259V16.7758H10.4413V21.5647H14.6477V33.1415C15.504 33.2757 16.3695 33.343 17.2363 33.3428C18.1031 33.343 18.9685 33.2757 19.8249 33.1415V21.5647H23.6851Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_17">
<rect width="33.1339" height="33.1339" fill="white" transform="translate(0.669312 0.208923)"/>
</clipPath>
</defs>
</svg>
     </a>
        </li>
        <li  className="nav-item">
       <a className={styles.telegram} href='https://t.me/Le_Castro_32' target="_blank">
       <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="logos:telegram" clip-path="url(#clip0_1_20)">
<path id="Vector" d="M16.9817 0.208923C12.5889 0.208923 8.3721 1.95544 5.26839 5.06122C2.16147 8.16824 0.415656 12.3819 0.414795 16.7759C0.414795 21.1679 2.16209 25.3847 5.26839 28.4905C8.3721 31.5963 12.5889 33.3428 16.9817 33.3428C21.3746 33.3428 25.5914 31.5963 28.6951 28.4905C31.8014 25.3847 33.5487 21.1679 33.5487 16.7759C33.5487 12.3838 31.8014 8.16701 28.6951 5.06122C25.5914 1.95544 21.3746 0.208923 16.9817 0.208923Z" fill="url(#paint0_linear_1_20)"/>
<path id="Vector_2" d="M7.91391 16.6009C12.7442 14.4969 15.9644 13.1096 17.5745 12.4394C22.177 10.5257 23.1322 10.1933 23.756 10.1821C23.8932 10.1799 24.1987 10.2138 24.398 10.3749C24.5637 10.5108 24.6103 10.6946 24.6336 10.8237C24.6543 10.9526 24.6828 11.2464 24.6595 11.4757C24.411 14.0954 23.3315 20.4524 22.7827 23.3866C22.5523 24.6281 22.0942 25.0443 21.6515 25.0849C20.6886 25.1735 19.9586 24.4492 19.0267 23.8385C17.5693 22.8826 16.7462 22.2877 15.3302 21.3551C13.6942 20.2772 14.7555 19.6846 15.6874 18.7165C15.9307 18.4631 20.1708 14.6074 20.2511 14.2577C20.2614 14.2139 20.2718 14.0508 20.1734 13.9649C20.0777 13.8787 19.9353 13.9082 19.8317 13.9315C19.6842 13.9646 17.3571 15.5043 12.8426 18.5503C12.1825 19.0044 11.5845 19.2257 11.0461 19.214C10.4559 19.2013 9.31692 18.8796 8.47045 18.6047C7.43502 18.2674 6.60926 18.089 6.68174 17.5162C6.71798 17.218 7.12956 16.9128 7.91391 16.6009Z" fill="white"/>
</g>
<defs>
<linearGradient id="paint0_linear_1_20" x1="1657.11" y1="0.208923" x2="1657.11" y2="3313.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#2AABEE"/>
<stop offset="1" stopColor="#229ED9"/>
</linearGradient>
<clipPath id="clip0_1_20">
<rect width="33.1339" height="33.1339" fill="white" transform="translate(0.414795 0.208923)"/>
</clipPath>
</defs>
</svg>
       </a>
        </li></>  : <li id={styles.dashboard}  className='nav-item' onClick={()=> navigate('/Dashboard/users')}>لوحة التحكم</li> }
        <li  className="nav-item">
        <NavLink to="/cloud/devEnviroment" id={styles.faq} onClick={()=> setLes(4)} className="nav-link" >
        {les === 4? <div style={{color: '#229ED9 ' , backgroundColor: '#ededed' , borderRadius:24 , paddingLeft:8  , height:35, width:69 }}>السحابة
         </div> : <div>السحابة</div>}
        </NavLink>
        </li>
        <li  className="nav-item">
        <NavLink to="/chat" id={styles.news}  className="nav-link">
         {props.ser === 3? <div style={{color: '#229ED9 ' , backgroundColor: '#ededed' , borderRadius:24 , paddingLeft:5.5  , height:35, width:69 }}>المحادثة
         </div> : <div>المحادثة</div>}
          </NavLink>
        </li>
        <li  className="nav-item">
        <NavLink id={styles.about} to="/projects"  className="nav-link" >
        {props.ser === 2? <div style={{color: '#229ED9 ' , backgroundColor: '#ededed' , borderRadius:24 , paddingLeft:5.5  , height:35, width:69 }}> المشاريع
        </div> : <div>المشاريع</div>}
        </NavLink>
        </li>
      <li  className="nav-item">
          <NavLink to="/lessons"  id={styles.products} className="nav-link" >
          {props.ser === 1 ? <div style={{color: '#229ED9' , backgroundColor: '#ededed' , borderRadius:24 , paddingLeft:5.5  , height:35, width:60 }}>
              الدروس
              </div> : <div> الدروس</div> }
              
            </NavLink>
        </li>
        
      </ul>
      
      {!firstName? <div>
      <span className={styles.login} onClick={()=> navigate('/login')}  >

<div>تسجيل دخول</div>
</span>

 <svg className={styles.loginl} onClick={()=> navigate('/login')}  width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ri:login-circle-fill">
<path id="Vector" d="M16.5084 17.7174H3.70029C4.50885 9.57864 11.3751 3.22131 19.7265 3.22131C28.6222 3.22131 35.8332 10.4323 35.8332 19.3281C35.8332 28.2238 28.6222 35.4348 19.7265 35.4348C11.3751 35.4348 4.50885 29.0775 3.70029 20.9387H16.5051V25.7708L24.5585 19.3281L16.5051 12.8854V17.7174H16.5084Z" fill="#425765"/>
</g>
</svg>
      </div> :<NavLink to='/profile' style={{color: 'white' ,textDecoration: 'none'  , backgroundColor: '#ededed' , left: 4 , top:-2 , height:38 , position: 'relative', width: 'auto', borderRadius: 24   }}>
         <span id={styles.profile} style={{color: props.ser ===5? '#229ED9' : 'black'  ,  fontFamily: 'Markazi Text', fontWeight: '600' , fontSize: 20 , marginRight:5 ,marginLeft:10 }}>
        
        {firstName}
        
        </span>
        <img style={{borderRadius:24}}   height='36' width='36' alt='' src={`https://etech.justhost.ly/storage/app/public/profile/images/${image}`}/>
        </NavLink>
        }
     
      
    </div>
  </div>
        </nav>
        <svg style={{position:'absolute' , left:8}} xmlns="http://www.w3.org/2000/svg" width="1180" height="2" viewBox="0 0 1236 2" fill="none">
  <path d="M1236 1H0" stroke="#007ACC"/>
</svg>
        
    </div>
  )
}

export default Navbar;