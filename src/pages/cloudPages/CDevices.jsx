import React, { useState , useEffect } from 'react'
import SideBar from './sideBar';
import CnavBar from './CnavBar';
import './style.css';
import AddModal from './modal';
import {  useDispatch, useSelector } from 'react-redux';
// import { fetchDevices } from '../../state/devicesSlice';
// import { fetchProjects } from '../../state/projectSlice';
import Swal from 'sweetalert2';
const CDevices = () => {
  const dispatch = useDispatch();
  const [query , setQuery] = useState('');
  const [deviceInfo , setDeviceInfo] = useState('');
  const [is , setIs] = useState(false);
  
  // console.log(devices);
  // useEffect(()=>{
  //   dispatch(fetchDevices());
  //   dispatch(fetchProjects());
    
  // },[dispatch])
  var devices = useSelector((state)=> state.devices)
  const [projects , setProjects]  = useState(useSelector((state)=> state.projects));
  const [existproject , setExistProject] = useState(devices.devices[0]?.projectName);

  const [hoveredItem, setHoveredItem] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  // MODAL
  const [showModal, setShowModal] = useState(0);
  const modalClose = (i)=>{
    if(i === 1){
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم إضافة جهاز جديد بنجاح",
        icon: "success"
      });
     }
     if(i === 2){
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم تعديل الجهاز  بنجاح",
        icon: "success"
      });
     }
     if(i === 3){
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم حذف الجهاز  بنجاح",
        icon: "success"
      });
     }
    setShowModal(false);
    setIs(!is);

    }
    const cardEdit = (les)=>{
      const info = {id: les.id, name: les.deviceName}
      setDeviceInfo(info);
      setShowModal(1);
    }
 var content = null;
  if(devices.devices !== 'no'){
    content = devices?.devices.filter(les =>{
      if(les.projectName === existproject && les.deviceName.toLowerCase().includes(query.toLowerCase())){
      return les;
     }
   }).map((les , idx)=>(
     <div onClick={(event)=> cardEdit(les)} key={idx}
     onMouseEnter={() => handleMouseEnter(idx)}
     onMouseLeave={handleMouseLeave}
     className="col-2 mb-2">
         <div  className="card">
           <div className="card-body">
             <div className="card-title">
            <h5 className="cardHeader">
             {hoveredItem === idx && les?.id === les?.id ? <i class="fas fa-pen"></i>: 
             <div id='board_id'>
               {les?.id}
             </div>
             }
            </h5>
               </div>
             <hr style={{color: 'white' , width: 137 , position: 'relative' , left:16}}/>
             <p className="Dcard-text">
               <center>
               {les?.deviceName}
                 </center>
               </p>
           </div>
         </div>
       </div>
   ));
  
  }
  const addDevice = ()=>{

    if(projects.projects === 'no'){
      Swal.fire({
        title: 'لايوجد مشاريع',
        text: 'يجب اضافة مشروع أولا',
        icon: "info"
      });
      return;
    }
    setShowModal(2);
  }
  return (
    <div  style={{backgroundColor: '#283141'}} >
    <div className="Csidebar">
    <SideBar ser={3}/>
    </div>
    <div style={{position: 'relative', zIndex: 1000}}  className="Cnavbar">
      <CnavBar  />
    </div>
    <div style={{position:'relative' , top:80}}  className="content">
    <div style={{backgroundColor: '#283141' , zIndex:-4 ,top:0 ,width:'100%' , height:'100%' , position:'fixed'}}>
   {is}
        
{showModal === 2? 
  <AddModal
  saveStatus = 'device'
  lefting={true}
  state={modalClose}
  title=' اضافة جهاز'
  label1='اسم الجهاز '
   input1Direction='rtl'
    input1Placeholder= 'يجب كتابة اسم الجهاز باللغة الانجليزية...'
     input1Type='text'
     label2='كلمة المرور '
     input2Direction='rtl'
      input2Placeholder= '****'
       input2Type='password'
       label3='تأكيد كلمة المرور '
       input3Direction='rtl'
        input3Placeholder= '****'
         input3Type='password'
       selectMenuLabel={'اختر المشروع'}
    
  />: ''}

{showModal === 1? 
  <AddModal
  editStatus = 'device'
  deviceInfo={deviceInfo}
  bottom={30}
  deletebtn={true}
  projects={devices}
  state={modalClose}
  title=' تعديل جهاز'
  label1='اسم الجهاز '
   input1Direction='rtl'
     input1Type='text'
     label2='كلمة المرور '
     input2Direction='rtl'
      input2Placeholder= '****'
       input2Type='password'
       label3=' كلمة المرور الجديده '
       input3Direction='rtl'
        input3Placeholder= '****'
         input3Type='password'
       selectMenuLabel={'اختر المشروع'}
       label4=' تأكيد المرور الجديده '
       input4Direction='rtl'
        input4Placeholder= '****'
         input4Type='password'
    
  />: ''}
  
      
  <div className="container">
    <div className='project-logo'>
    <svg width="50" height="60" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.2157 10.6609L26.6471 0.370091C26.1428 0.127332 25.5761 0 25 0C24.4239 0 23.8572 0.127332 23.3529 0.370091L1.78431 10.663C1.24462 10.9204 0.794241 11.2995 0.480329 11.7607C0.166416 12.2218 0.000516833 12.7481 0 13.2843V33.7163C0.000516833 34.2525 0.166416 34.7788 0.480329 35.2399C0.794241 35.7011 1.24462 36.0802 1.78431 36.3376L23.3529 46.6305C23.8574 46.8729 24.424 47 25 47C25.576 47 26.1426 46.8729 26.6471 46.6305L48.2157 36.3376C48.7554 36.0802 49.2058 35.7011 49.5197 35.2399C49.8336 34.7788 49.9995 34.2525 50 33.7163V13.2843C49.9999 12.7477 49.8342 12.221 49.5203 11.7595C49.2064 11.2979 48.7557 10.9184 48.2157 10.6609ZM24.7549 2.61753C24.827 2.58312 24.908 2.56509 24.9902 2.56509C25.0724 2.56509 25.1533 2.58312 25.2255 2.61753L45.7132 12.3913L25 22.2698L4.28677 12.3913L24.7549 2.61753ZM3.18627 34.0902C3.11111 34.0523 3.04881 33.9978 3.00574 33.9321C2.96268 33.8664 2.9404 33.792 2.94118 33.7163V14.6687L23.5294 24.4958V43.7956L3.18627 34.0902ZM46.7941 34.0902L26.4706 43.7956V24.4916L47.0588 14.6644V33.712C47.0605 33.7884 47.0386 33.8638 46.9955 33.9303C46.9524 33.9968 46.8896 34.052 46.8137 34.0902H46.7941Z" fill="white"/>
</svg>

    </div>
<p className="pageName">
جميع الأجهزة
</p>
<div className="addproject">
<button onClick={addDevice} style={{position: 'relative' , left: '84%', top: 18 , marginBottom:50 ,   width: 'auto' , height: 30 , paddingLeft:3}}>
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
  <span style={{position: 'relative' , left: 6 , top:-9 , width: 'auto' , height: 34 , fontFamily: 'markazi text' }} >اضافة جهاز</span>
  </button>
</div>
<span>
  <input onChange={(e)=> setQuery(e.target.value)}  style={{ fontFamily: 'Markazi text' , width: 460 ,height: 30, direction: 'rtl', left: '30%', bottom: 60, position: 'relative', background: 'white', borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
   className="form-control"
    type="search" placeholder="ابحث باسم الجهـاز..." aria-label="Search"/>
        <span className='icon-search'></span>
  </span>
<div style={{width: '100%', height: 1, border: '1px #007ACC solid', position:'relative' , top: -40}}>
</div>
    <select  defaultValue={existproject} onChange={(e)=>setExistProject(e.target.value)} style={{position:'absolute' , bottom:340 , left:40 , height:36 , width: 134 , borderRadius: 18}} dir='rtl' class="form-select" aria-label="Default select example">
      {projects.projects !== 'no'?projects?.projects.map((project , idx)=>(
        <option key={idx}>{project?.name}</option>
      )): 'لايوجد'}
</select>
<div className="projectsCard">
<div className="row">
      {content? content : <div>
      <p style={{position: 'relative' , right:435 , top: 80, fontWeight: 'bold' , fontSize: 24, color: 'white' , fontFamily: 'Markazi text'}}>
      لايوجد أجهزة !
      </p>
      <p style={{position: 'relative' , right:440 , top: 80, fontWeight: 'bold' , fontSize: 18, color: 'white' , fontFamily: 'Markazi text'}}>
      قم باضافة جهاز !
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

export default CDevices;