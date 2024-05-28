import React, { useState , useEffect } from 'react';
import SideBar from './sideBar';
import CnavBar from './CnavBar';
import {  useDispatch, useSelector } from 'react-redux';

import './style.css';
import AddModal from './modal';
import Swal from 'sweetalert2';
import { fetchProjects } from '../../state/projectSlice';
const CProjects = () => {
  const [query , setQuery] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchProjects());
  },[dispatch]);
  var projects = useSelector((state)=> state.projects);
  const [hoveredItem, setHoveredItem] = useState(null);


  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const [showModal, setShowModal] = useState(0);

  const modalClose = (i)=>{
    if(i === 2){
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم حذف المشروع بنجاح",
        icon: "success"
      });
     }
     if(i === 6){
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم إضافة مشروع جديد",
        icon: "success"
      });
     }
     if(i === 7){
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم تعديل المشروع بنجاح",
        icon: "success"
      });
     }
    setShowModal(false)
    }
    const [project , setProject] = useState('')
    const cardEdit = (les)=>{
      setProject(les);
      setShowModal(1);
    }
// here we need when click on save to handle edit project from dispatch to api

  // show and search projects
  var content = null;
  if(projects.projects !== 'no'){
    content = projects?.projects.filter(les =>{
      if(query ===''){
         return les;
     }else if(les.name.toLowerCase().includes(query.toLowerCase())){
         return les;
     }
    }).map((les , idx)=>(
      <div key={idx}
      onClick={(event)=> cardEdit(les)} 
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseLeave={handleMouseLeave}
      className="col-2 mb-2">
      <div className="card">
        <div className="card-body">
        
          <div className="card-title">
         <h5 className="cardHeader">
         {hoveredItem === idx && les?.id === les?.id ? <i class="fas fa-pen"></i>
  
         : 
                <div>
                   {les?.name?.slice(2,3)}
                </div>
                }
         </h5>
            
            </div>
          <hr style={{color: 'white' , width: 137 , position: 'relative' , left:16}}/>
          <p className="Dcard-text">
            <center>
            {les?.name}
              </center>
            </p>
        </div>
      </div>
    </div>
    ));
  }

  return (
    <div  style={{backgroundColor: '#283141'}} >
    <div className="Csidebar">
    <SideBar ser={2}/>
    </div>
    <div style={{position: 'relative', zIndex: 1000}}  className="Cnavbar">
      <CnavBar  />
    </div>
    <div style={{position:'relative' , top:80}}  className="content">
      <div style={{backgroundColor: '#283141' , zIndex:-4 ,top:0 ,width:'100%' , height:'100%' , position:'fixed'}}>


      {showModal === 2? 
  <AddModal
  saveStatus='project'
  lefting={true}
  state={modalClose}
  title=' اضافة مشروع'
  label1='اسم المشروع '
   input1Direction='rtl'
    input1Placeholder=' اسم المشروع..'
     input1Type='text'
    
  />: ''}

{showModal === 1? 
  <AddModal
  editStatus='project'
  state={modalClose}
  deviceInfo={project}
  deletebtn={true}
  title=' تعديل مشروع'
  label1='اسم المشروع '
  input1Direction='rtl'
   input1Placeholder=' اسم المشروع..'
    input1Type='text'
    
  />: ''}



  <div className="container">
    <div className='project-logo'>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.4454 35.3333L23.7221 23.304L26.1536 21.0052L38.8769 33.0323L36.4454 35.3333ZM4.60043 35.3333L2.16668 33.0323L18.1121 17.9588L11.3058 11.5672L10.0546 12.7502L7.8821 10.655V14.555L6.63085 15.738L0.62439 10.0592L1.87564 8.87401H6.00064L3.79835 6.83301L8.75981 2.14217C9.28842 1.64239 9.86745 1.27117 10.4969 1.0285C11.1248 0.787282 11.7947 0.666671 12.5067 0.666671C13.2171 0.666671 13.8863 0.787282 14.5142 1.0285C15.1436 1.27117 15.7227 1.64239 16.2513 2.14217L12.4792 5.70851L14.9908 8.08317L13.7396 9.26617L20.5459 15.6578L26.4056 10.1177C26.0466 9.63667 25.7976 9.14484 25.6586 8.64217C25.5195 8.13951 25.45 7.58773 25.45 6.98684C25.45 5.21739 26.0986 3.7195 27.3956 2.49317C28.6927 1.26684 30.277 0.653671 32.1486 0.653671C32.5458 0.653671 32.9277 0.680394 33.2944 0.733838C33.6641 0.785838 34.0285 0.892727 34.3875 1.0545L29.6392 5.54167L33.6771 9.35934L38.4231 4.87001C38.6019 5.20945 38.7172 5.55323 38.7692 5.90134C38.8211 6.25089 38.8471 6.61273 38.8471 6.98684C38.8471 8.75628 38.1978 10.2542 36.8992 11.4805C35.6036 12.7083 34.0201 13.3222 32.1486 13.3222C31.513 13.3222 30.9294 13.2572 30.3977 13.1272C29.8661 13.0001 29.3466 12.7632 28.8394 12.4165L4.60043 35.3333Z" fill="white"/>
</svg>
    </div>
<p className="pageName">
جميع المشاريع
</p>
<div className="addproject">
<button onClick={()=> setShowModal(2)} style={{position: 'relative' , left: '84%', top: 18 , marginBottom:50 ,   width: 'auto' , height: 30 , paddingLeft:3}}>
  <span  style={{position: 'relative' , left: 2 , top:-9 , width: 'auto'}} >
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="simple-line-icons:plus" clip-path="url(#clip0_125_256)">
<path id="Vector" d="M15 0C6.71578 0 0 6.71578 0 15C0 23.2847 6.71578 30 15 30C23.2847 30 30 23.2847 30 15C30 6.71578 23.2847 0 15 0ZM15 28.1545C7.76297 28.1545 1.875 22.237 1.875 14.9999C1.875 7.76291 7.76297 1.87494 15 1.87494C22.237 1.87494 28.125 7.76294 28.125 14.9999C28.125 22.2369 22.237 28.1545 15 28.1545ZM21.5625 14.0625H15.9375V8.4375C15.9375 7.92 15.5175 7.5 15 7.5C14.4825 7.5 14.0625 7.92 14.0625 8.4375V14.0625H8.4375C7.92 14.0625 7.5 14.4825 7.5 15C7.5 15.5175 7.92 15.9375 8.4375 15.9375H14.0625V21.5625C14.0625 22.08 14.4825 22.5 15 22.5C15.5175 22.5 15.9375 22.08 15.9375 21.5625V15.9375H21.5625C22.08 15.9375 22.5 15.5175 22.5 15C22.5 14.4825 22.08 14.0625 21.5625 14.0625Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_125_256">
<rect width="30" height="30" fill="white"/>
</clipPath>
</defs>
</svg>
  </span>
  <span style={{position: 'relative' , left: 6 , top:-9 , width: 'auto' , height: 34 , fontFamily: 'markazi text' }} >اضافة مشروع</span>
  </button>
</div>
<span>
  <input onChange={(e)=> setQuery(e.target.value)}  style={{ fontFamily: 'Markazi text' , width: 460 ,height: 30, direction: 'rtl', left: '30%', bottom: 64, position: 'relative', background: 'white', borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
   className="form-control"
    type="search" placeholder="ابحث باسم المشـروع..." aria-label="Search"/>
        <span className='icon-search'></span>
  </span>
<div style={{width: '100%', height: 1, border: '1px #007ACC solid', position:'relative' , top: -40}}>
</div>
<div className="projectsCard">
<div className="row">
{content? content : <div>
      <p style={{position: 'relative' , right:435 , top: 80, fontWeight: 'bold' , fontSize: 24, color: 'white' , fontFamily: 'Markazi text'}}>
      لايوجد مشاريع !
      </p>
      <p style={{position: 'relative' , right:440 , top: 80, fontWeight: 'bold' , fontSize: 18, color: 'white' , fontFamily: 'Markazi text'}}>
      قم باضافة مشاريع
      </p>
      </div>}
      </div>
</div>
</div>
      </div>
      
      </div>
  </div>
  )
}

export default CProjects;