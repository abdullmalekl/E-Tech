import React, { useState } from 'react'
import PsideBar from '../PsideBar';
import '../contentStyle.css';
import Navbar from '../../../Bars/navbar';
const Ppart5 = () => {
const [title , setTitle] = useState(()=>{
  return localStorage.getItem("title") || "";
});
const [content , setContent] = useState(()=>{
  return localStorage.getItem("savedHtml5") || "";
});
return (
  <div>
   <div id='lNavbar'>
        <Navbar ser={2} />
      </div>
     <div dir='rtl' className='sidebar'>
    <PsideBar/>
    </div>
    <br />
    <div id='def'></div>
  <div className='contents'>
  <h3 id='PTitle'>
            {title? title : ''}
          </h3>
          <br/>
          <hr style={{position:'relative' , left: '0.8%', top:'100%' , marginBottom: '4%'}}/>
          <br/>
   <div dir='rtl' dangerouslySetInnerHTML={{ __html: content }} id='lpcontent' />
  </div>
 </div>
)
}

export default Ppart5;