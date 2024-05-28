import React, { useState } from 'react'
import SideBar from '../sideBar';
import Navbar from '../../../Bars/navbar';

const Lpart3 = () => {
  const [title , setTitle] = useState(()=>{
    return localStorage.getItem("title") || "";
  });
  const [content , setContent] = useState(()=>{
    return localStorage.getItem("savedHtml3") || "";
  });
  return (
    <div>
     <div id='lNavbar'>
        <Navbar ser={1} />
      </div>
     <div dir='rtl' className='sidebar'>
    <SideBar/>
    </div>
    <br />
    <div id='def'></div>
   <div className='contents'>
   <h3 id='lpTitle'>
            {title? title : ''}
          </h3>
          <br/>
          <hr style={{position:'relative' , left: '0.8%'}}/>
          <br/>

   <div dir='rtl' dangerouslySetInnerHTML={{ __html: content }} id='lpcontent' />
   </div>
  </div>
  )
}

export default Lpart3;