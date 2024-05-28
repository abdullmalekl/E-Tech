import React, { Fragment } from 'react'
import ControlPanel from './Dashboard';
import './style.css';
import Dnavar from './d-navBar';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <Fragment>
    <div className='main-content' >
  <div className='sidebar'>
    <ControlPanel />

  </div>
    <div className='content' >
      <div className="scrollable-content">
     <Dnavar ser={0} />
      </div>
      <div style={{ 
        position:'relative',
        background: '#D9D9D9',
          width: 910 ,
          height: 600,
            left:8 ,
            top: 66,
            borderRadius:20
            }}>
              
  <div  style={{width: 500, height: 40, left: 126, top: 60, position: 'relative', textAlign: 'right', color: 'black', fontSize: 30, fontFamily: 'Lemonada', fontWeight: '400', wordWrap: 'break-word'}} >
    أقسام لوحة التحكم
  </div>
              
              <div style={{position:'relative' , right:4 , top: 100}} dir='rtl' class="container text-center">
  <div class="row">
    <div class="col">
    <NavLink to='/Dashboard/projects' className='card' style={{position: 'relative' , right:200 , textDecoration: 'none', marginTop:30 , width: 200, height: 180, background: '#a09c9c', boxShadow: '4px 4px 4px 4px  black', borderRadius: 14}}>
       <div style={{position: 'relative' , top:4 , fontFamily: 'Markazi Text' , fontWeight: '700' ,fontSize: 24}}>
الـمشـاريع
<hr/>
<div style={{fontSize:80  , position: 'relative' , bottom:18}}>
  40
</div>
       </div>
    </NavLink>
    </div>
    <div class="col">
    <NavLink to='/Dashboard/lessons' className='card' style={{textDecoration: 'none', marginTop:30,width: 200, height: 180, background: '#a09c9c', boxShadow: '4px 4px 4px 4px black', borderRadius: 14}}>
    <div style={{position: 'relative' , top:4 , fontFamily: 'Markazi Text' , fontWeight: '700' ,fontSize: 24}}>
الـدروس

<hr/>
<div style={{fontSize:80  , position: 'relative' , bottom:18}}>
  12
</div>
       </div>
    </NavLink>

    </div>
    
  </div>
  <div className="row">
  <div class="col">
  <NavLink to='/Dashboard/users' className='card' style={{position: 'relative' , right:200 ,textDecoration: 'none', marginTop:30,width: 200, height: 180, background: '#a09c9c', boxShadow: '4px 4px 4px 4px black', borderRadius: 14}}>
  <div style={{position: 'relative' , top:4 , fontFamily: 'Markazi Text' , fontWeight: '700' ,fontSize: 24}}>
المـستخدمين
       <hr />
       <div style={{fontSize:80  , position: 'relative' , bottom:18}}>
  6
</div>
       </div>
  </NavLink>
     
    </div>
    <div class="col">
  <NavLink to='/Dashboard/devices' className='card' style={{textDecoration: 'none', marginTop:30,width: 200, height: 180, background: '#a09c9c', boxShadow: '4px 4px 4px 4px black', borderRadius: 14}}>
  <div style={{position: 'relative' , top:4 , fontFamily: 'Markazi Text' , fontWeight: '700' ,fontSize: 24}}>
الأجـهـزة
<hr/>
<div style={{fontSize:80  , position: 'relative' , bottom:18}}>
  8
</div>
       </div>
  </NavLink>
     
    </div>
  </div>
</div>
    
      </div>

    </div>
    </div>

   
    </Fragment>
  )
}

export default Home;