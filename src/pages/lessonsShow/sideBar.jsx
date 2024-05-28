import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <>
     <div  className="d-flex flex-column flex-shrink-0 p-3 text-black" id='navigateSideBar'
     style={{    width: 202 , direction: 'rtl' , position: 'fixed' , top:57 , right:0 ,height: '100%' , overflowY: 'auto' }}>
       <h2 style={{color: 'black' , fontFamily: 'Markazi text' , position: 'relative' , right: 10 , fontWeight: 'bolds'}} >
       اجزاء الدرس
       </h2>
    <hr  style={{width:170 ,  position:'relative' , left:0}}/>
    <ul  className="nav nav-pills flex-column ">
      <li style={{ height:98,   position: 'relative' , left:44 , marginBottom:-20 , marginTop: -13.8 }}  className="nav-item">
        <NavLink id='home' to='/lessons/contents/part1' style={{ height: 50 , width:170 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} className="nav-link text-white" aria-current="page">
<span style={{position: 'relative' , left: -12 , color:'black'}}>
  الجزء الأول
</span>
          <hr style={{width:170 , position: 'relative' , top: -5 , left: 15 , color: 'black'}} />
        </NavLink>
      </li>
      <li style={{ height:98,   position: 'relative' , left:44 , marginBottom:-18 , marginTop: -23 }}>
        <NavLink id='lessons' to="/lessons/contents/part2" style={{ height: 50 , width:170 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
     
       <span style={{position: 'relative' , left: -12 , color: 'black'}}>
  
        الجزء الثاني
</span>
          <hr style={{width:170 , position: 'relative' , top: -6 , left: 15 , color: 'black'}} />
        </NavLink>
    
      </li>
      <li style={{ height:100,   position: 'relative' , bottom:0 , left:44 , marginBottom:-18 , marginTop: -25 }}>
        <NavLink id='projects' to='/lessons/contents/part3' style={{ height: 50 , width:170 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
<span style={{position: 'relative' , left: -12 ,color: 'black'}}>
  
  الجزء الثالث
</span>
          <hr style={{width:170 , position: 'relative' , top: -4.5 , left: 15 , color: 'black'}} />
        </NavLink>
       
      </li>
      <li style={{ height:100,   position: 'relative' , bottom:0 , left:44 , marginBottom:-18 , marginTop: -26 }}>
        <NavLink id='devices' to='/lessons/contents/part4' style={{ height: 50 , width:170 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
<span style={{position: 'relative' , left: -12 , color: 'black'}}>
  
          الجزء الرابع
</span>
          <hr style={{width:170 , position: 'relative' , top: -6 , left: 15 , color: 'black'}} />
        </NavLink>
        
      </li>
      <li style={{ height:100,   position: 'relative' , bottom:0 , left:44 , marginBottom:-18 , marginTop: -28 }}>
        <NavLink id='devices' to='/lessons/contents/part5' style={{ height: 50 , width:170 ,fontFamily: 'Markazi Text' , fontWeight: '200' , fontSize: '1.4rem'}} href="#" className="nav-link text-white">
<span style={{position: 'relative' , left: -12 , color: 'black'}}>
  
          الجزء الخامس
</span>
          <hr style={{width:170 , position: 'relative' , top: -6.5 , left: 15 , color: 'black'}} />
        </NavLink>
        
      </li>
    </ul>
    



  </div>
    </>
  )
}

export default SideBar;