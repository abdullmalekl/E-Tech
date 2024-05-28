import { NavLink, useNavigate } from 'react-router-dom';
import './style.css';
import { logOut, selectFirstName, selectImage } from '../../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../app/api/apiSlice';
import Swal from 'sweetalert2';


const ControlPanel = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  var previousImage = useSelector(selectImage);
  const logout = async(e)=>{
    e.preventDefault();
   try {
    const res = await api.post('/logout');
    if(res.status === 200){
      console.log(res.data);
      localStorage.removeItem('user');
      dispatch(logOut());
      Navigate('/');
  }
   } catch (error) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "فشل الاتصال، تحقق من اتصالك بالانترنت "
    }); 
   }
}

  
  return (
    <div  className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
     style={{    width: 268 , direction: 'rtl' , position: 'fixed' , top:0 , right:0 ,height: '100%' , overflowY: 'auto' }}>
        <img style={{position: 'relative' , right: 66 , marginTop:10}} src={`https://etech.justhost.ly/storage/app/public/profile/images/${previousImage}`} alt="" width="100" height="100" className="rounded-circle me-2" />
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg className="bi me-2" width="40" height="32"></svg>
      <div  className="dropdown">
      <div  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <strong  style={{marginRight: 6  }}>{useSelector(selectFirstName)} </strong>
      </div>

      <ul  className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li ><NavLink to='/profile'  className="dropdown-item " href="#" style={{height:30}} >
        <p style={{ position: 'relative' , left:32 , top: 0  }}>
          ملفي الشخصي 
         </p>
          </NavLink></li>
        <li>
          <hr className="dropdown-divider"  />
          </li>
        <li><div  className="dropdown-item"  style={{height:30}} >
         <p onClick={logout} style={{ position: 'relative' , left:46 , top: -5  }}>
          تسجيل خروج
         </p>
        </div></li>
      </ul>
    </div>
    <hr />
   
    </a>
    <hr  style={{width:236 ,  position:'relative' , left:0}}/>
    <ul  className="nav nav-pills flex-column ">
      <li style={{ height:98,   position: 'relative' , left:40 , marginBottom:-20 , marginTop: -13.8 }}  className="nav-item">
        <NavLink id='home' to='/Dashboard/users' style={{ height: 50 , width:248 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white" aria-current="page">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="solar:users-group-rounded-bold">
<path id="Vector" d="M13.1263 14.5833C16.348 14.5833 18.9596 11.9717 18.9596 8.75C18.9596 5.52834 16.348 2.91667 13.1263 2.91667C9.90464 2.91667 7.29297 5.52834 7.29297 8.75C7.29297 11.9717 9.90464 14.5833 13.1263 14.5833Z" fill="white"/>
<path id="Vector_2" d="M13.1263 30.6265C18.7642 30.6265 23.3346 28.0148 23.3346 24.7931C23.3346 21.5715 18.7642 18.9598 13.1263 18.9598C7.4884 18.9598 2.91797 21.5715 2.91797 24.7931C2.91797 28.0148 7.4884 30.6265 13.1263 30.6265Z" fill="white"/>
<path id="Vector_3" d="M30.6251 24.7917C30.6251 27.2081 27.656 29.1667 24.032 29.1667C25.0995 28 25.8345 26.5344 25.8345 24.7946C25.8345 23.0519 25.0981 21.5862 24.0276 20.4181C27.6531 20.4167 30.6251 22.3767 30.6251 24.7917ZM26.2501 8.75C26.2506 9.45396 26.0812 10.1476 25.7563 10.7721C25.4314 11.3966 24.9606 11.9335 24.3839 12.3372C23.8071 12.7408 23.1415 12.9994 22.4435 13.0908C21.7455 13.1823 21.0358 13.104 20.3745 12.8625C21.0869 11.6091 21.4604 10.1917 21.4581 8.75C21.4581 7.25521 21.0643 5.85229 20.376 4.63896C21.0371 4.39779 21.7467 4.3197 22.4445 4.41129C23.1423 4.50289 23.8077 4.76148 24.3843 5.16511C24.9608 5.56874 25.4315 6.1055 25.7563 6.72984C26.0811 7.35419 26.2505 8.04622 26.2501 8.75Z" fill="white"/>
</g>
</svg>

<span style={{position: 'relative' , left: -12}}>
  
  المستخدمين
</span>
          <hr style={{width:248 , position: 'relative' , top: -7 , left: 15}} />
        </NavLink>
      </li>
      <li style={{ height:98,   position: 'relative' , left:40 , marginBottom:-18 , marginTop: -23 }}>
        <NavLink id='lessons' to="/Dashboard/lessons" style={{ height: 50 , width:248 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
        <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="streamline:quality-education">
<path id="Vector" d="M15.0001 14.0271C13.3972 12.8421 10.9951 10.77 4.10795 10.77V25.6071C10.9951 25.6071 13.3972 27.6793 15.0001 28.8643M15.0001 14.0271V28.8643M15.0001 14.0271C16.6029 12.8421 19.0051 10.77 25.8922 10.77V25.6071C19.0051 25.6071 16.6029 27.6793 15.0001 28.8643M19.2558 1.23214V6.44357M23.0637 1.11643H8.7558C8.35606 1.11594 7.96416 1.22728 7.62438 1.43785L3.85938 3.78214L7.62438 6.12214C7.96416 6.33272 8.35606 6.44406 8.7558 6.44357H23.0637C23.4197 6.45367 23.7741 6.39227 24.1059 6.26301C24.4378 6.13375 24.7404 5.93925 24.9957 5.69102C25.2511 5.44279 25.4541 5.14586 25.5927 4.8178C25.7314 4.48974 25.8028 4.13721 25.8028 3.78107C25.8028 3.42493 25.7314 3.0724 25.5927 2.74434C25.4541 2.41628 25.2511 2.11935 24.9957 1.87112C24.7404 1.62288 24.4378 1.42838 24.1059 1.29912C23.7741 1.16986 23.4197 1.10633 23.0637 1.11643Z" stroke="white" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
       <span style={{position: 'relative' , left: -12}}>
  
          الدروس
</span>
          <hr style={{width:248 , position: 'relative' , top: -7 , left: 15}} />
        </NavLink>
    
      </li>
      <li style={{ height:100,   position: 'relative' , bottom:0 , left:40 , marginBottom:-18 , marginTop: -25 }}>
        <NavLink id='projects' to='/Dashboard/projects' style={{ height: 50 , width:248 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
        <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="material-symbols-light:construction">
<path id="Vector" d="M23.6974 25L16.7574 18.06L18.0837 16.7337L25.0237 23.6725L23.6974 25ZM6.32744 25L4.99994 23.6725L13.6974 14.9763L9.98494 11.2888L9.30244 11.9713L8.11744 10.7625V13.0125L7.43494 13.695L4.15869 10.4188L4.84119 9.735H7.09119L5.88994 8.5575L8.59619 5.85125C8.88452 5.56292 9.20036 5.34875 9.54369 5.20875C9.88619 5.06958 10.2516 5 10.6399 5C11.0274 5 11.3924 5.06958 11.7349 5.20875C12.0783 5.34875 12.3941 5.56292 12.6824 5.85125L10.6249 7.90875L11.9949 9.27875L11.3124 9.96125L15.0249 13.6488L18.2212 10.4525C18.0254 10.175 17.8895 9.89125 17.8137 9.60125C17.7379 9.31125 17.6999 8.99292 17.6999 8.64625C17.6999 7.62542 18.0537 6.76125 18.7612 6.05375C19.4687 5.34625 20.3329 4.9925 21.3537 4.9925C21.5704 4.9925 21.7787 5.00792 21.9787 5.03875C22.1804 5.06875 22.3791 5.13042 22.5749 5.22375L19.9849 7.8125L22.1874 10.015L24.7762 7.425C24.8737 7.62083 24.9366 7.81917 24.9649 8.02C24.9933 8.22167 25.0074 8.43042 25.0074 8.64625C25.0074 9.66708 24.6533 10.5313 23.9449 11.2388C23.2383 11.9471 22.3745 12.3012 21.3537 12.3012C21.007 12.3012 20.6887 12.2638 20.3987 12.1888C20.1087 12.1154 19.8254 11.9788 19.5487 11.7788L6.32744 25Z" fill="white"/>
</g>
</svg>
<span style={{position: 'relative' , left: -12}}>
  
  المشاريع
</span>
          <hr style={{width:248 , position: 'relative' , top: -6.5 , left: 15}} />
        </NavLink>
       
      </li>
      <li style={{ height:100,   position: 'relative' , bottom:0 , left:40 , marginBottom:-18 , marginTop: -26 }}>
        <NavLink id='devices' to='/Dashboard/devices' style={{ height: 50 , width:248 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
        <svg width="35" height="35" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M23.0531 5.84793L12.7406 0.20301C12.4995 0.0698467 12.2286 0 11.9531 0C11.6777 0 11.4067 0.0698467 11.1656 0.20301L0.853125 5.8491C0.595084 5.99029 0.379747 6.19826 0.229657 6.45122C0.0795678 6.70419 0.000247111 6.99285 0 7.28699V18.4948C0.000247111 18.7889 0.0795678 19.0776 0.229657 19.3306C0.379747 19.5835 0.595084 19.7915 0.853125 19.9327L11.1656 25.5788C11.4068 25.7117 11.6777 25.7815 11.9531 25.7815C12.2285 25.7815 12.4994 25.7117 12.7406 25.5788L23.0531 19.9327C23.3112 19.7915 23.5265 19.5835 23.6766 19.3306C23.8267 19.0776 23.906 18.7889 23.9062 18.4948V7.28699C23.9062 6.99265 23.827 6.70375 23.6769 6.45055C23.5268 6.19736 23.3113 5.98922 23.0531 5.84793ZM11.8359 1.43582C11.8704 1.41695 11.9091 1.40706 11.9484 1.40706C11.9878 1.40706 12.0264 1.41695 12.0609 1.43582L21.8566 6.79715L11.9531 12.2159L2.04961 6.79715L11.8359 1.43582ZM1.52344 18.6999C1.4875 18.6791 1.45771 18.6492 1.43712 18.6132C1.41653 18.5772 1.40588 18.5363 1.40625 18.4948V8.04637L11.25 13.437V24.0237L1.52344 18.6999ZM22.3734 18.6999L12.6562 24.0237V13.4347L22.5 8.04403V18.4925C22.5008 18.5344 22.4903 18.5757 22.4697 18.6122C22.4491 18.6487 22.4191 18.6789 22.3828 18.6999H22.3734Z" fill="white"/>
</svg><span style={{position: 'relative' , left: -12}}>
  
          الأجهزة
</span>
          <hr style={{width:248 , position: 'relative' , top: -6.5 , left: 15}} />
        </NavLink>
        
      </li>
    </ul>
    
    <span id='eDbrand' onClick={()=> Navigate('/')} style={{position: 'absolute' , right:106 , top:476 , fontFamily: 'Markazi text' , fontWeight: 'bold' , fontSize:30}}>E-Tech</span>
   <span style={{position: 'absolute' , right:66 , bottom: 50 }}>
   <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M43.5378 25.5578V14.2717L44.245 13.9002C44.7047 13.6624 44.9943 13.1909 44.9999 12.6747C45.0055 12.1598 44.7251 11.6827 44.271 11.4344L23.1189 0.172111C22.6958 -0.058732 22.184 -0.0573766 21.758 0.176264L0.72196 11.4526C0.274131 11.7009 -0.00279062 12.1724 2.12119e-05 12.6838C0.00283305 13.1952 0.285422 13.6631 0.738875 13.9066L9.98208 18.8025C9.86609 19.0061 9.79439 19.2383 9.79439 19.4888V31.3275C9.79444 31.5249 9.83643 31.72 9.9176 31.9002C9.99877 32.0803 10.1173 32.2413 10.2654 32.3726C10.5705 32.6419 13.492 35 22.4245 35C31.3254 35 34.3256 32.7713 34.6384 32.5174C34.9653 32.2523 35.1544 31.8549 35.1544 31.4338V19.2915C35.1544 19.0949 35.1129 18.9081 35.0398 18.7388L40.726 15.7497V25.5655C39.8923 26.051 39.3271 26.9415 39.3271 27.9711C39.3271 29.5164 40.5861 30.7692 42.139 30.7692C43.6918 30.7692 44.9508 29.5164 44.9508 27.9711C44.9508 26.9351 44.3778 26.0411 43.5378 25.5578ZM32.3424 30.6321C31.2374 31.161 28.3131 32.2019 22.4244 32.2019C16.4985 32.2019 13.6402 31.0938 12.6062 30.5608V20.1932L21.7362 25.0297C21.9411 25.1399 22.1704 25.1976 22.4033 25.1975C22.6302 25.1977 22.8536 25.1427 23.0543 25.0374L32.3424 20.1554V30.6321ZM22.4146 22.2135L4.33095 12.6579L22.4462 2.99683L40.6177 12.63L22.4146 22.2135Z" fill="white"/>
</svg>
   </span>


  </div>
  )
}

export default ControlPanel;