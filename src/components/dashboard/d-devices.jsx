import React, { Fragment , useEffect, useState } from 'react'
import ControlPanel from './Dashboard';
import './style.css';
import Dnavar from './d-navBar';
import Modal from '../modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '../../app/api/apiSlice';
const Devices = () => {
  const [query , setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [devices , setDevices] = useState([]);
  const getDevices = async(i)=>{
   try {
    await api.get('dash/devices').then((res)=>{
      if(res.status === 200){
        setDevices(res.data);
      }else if(res.status === 202){
        Swal.fire({
          text: 'لايوجد اجهزه مضافة',
          icon: "error"
        });
      }
      if(i === 1){
        Swal.fire({
          title: "تم بنجاح !",
          text: "تم الغاء العملية",
          icon: "success"
        });
      }
     });
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
 useEffect(()=>{
   getDevices();
 },[]);
  
  var content =null;
  content = devices;
  var lope;
 const editHandle =(id)=>{
  console.log(id);
  localStorage.setItem("devId" , id);
  setShowModal(true);

 }
 const deleteHandler = async(id)=>{

  Swal.fire({
    title: "هل انت متأكد؟",
    text: "لن تكون قادرا على الرجوع !",
    icon: "تحذير !!",
    showCancelButton: true,
    cancelButtonText: 'لا',
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم "
  }).then(async(result) => {
    if (result.isConfirmed) {
    
      try {
        var res;
      res = await api.delete(`devices/${id}`);
      if(res.status === 200){
       Swal.fire({
         title: "! تم بنجاح",
         text: "!تم حذف الجهاز بنجاح ",
         icon: "success"
       });
       getDevices();
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
          title: "فشل حذف الجهاز تحقق من اتصالك بالانترنت "
        }); 
      }

    }
  });
 }
 const modalClose = (i)=>{
  if(i === 3){
    Swal.fire({
      title: "!خطأ",
      text: "الرمز لايطابق تأكيد الرمز",
      icon: "error"
    });
    return;
  }else if(i === 2){
    const pass =  localStorage.getItem("pass");
    setShowModal(false);
    Swal.fire({
      title: "تم بنجاح !",
      text: `الرمز السري الجديد هو ${pass}`,
      icon: "success"
    });
  }
  localStorage.removeItem("devId");
  localStorage.removeItem("pass");
  setShowModal(false);

  }
  useEffect(()=>{
    let timerInterval;
  Swal.fire({
  title: "جاري التحميل!",
  timer: 1200,
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
  }
  });
  },[]);
//  u need to change attributes based on what u get from backend
  var count = 0;
  var tablecontent = content?.filter(les =>{
    if(query ===''){
       return les;
   }else if(les.deviceName.toLowerCase().includes(query.toLowerCase()) || les.userName.toLowerCase().includes(query.toLowerCase())){
       return les;
   }else{
    return false;
   }
  }).map((les , idx)=>{
    count++;
    return(
      <tr key={idx}>
      <th scope="row">{count}</th>
      <td>{les?.deviceName}</td>
      <td>{les?.projectName}</td>
      <td>{les?.userName}</td>
      <td>
        <span onClick={()=> {editHandle(les.id)}} id='setting' style={{marginLeft:10 , position:'relative' , left:20}}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="tdesign:edit">
<path id="Vector" d="M19.6852 3.68375C20.154 3.21507 20.7897 2.95178 21.4527 2.95178C22.1156 2.95178 22.7513 3.21507 23.2202 3.68375L26.3139 6.7775C26.5462 7.00966 26.7304 7.2853 26.8561 7.58868C26.9818 7.89206 27.0465 8.21723 27.0465 8.54562C27.0465 8.87401 26.9818 9.19919 26.8561 9.50257C26.7304 9.80595 26.5462 10.0816 26.3139 10.3137L11.4477 25.18L3.47266 26.525L4.81891 18.55L19.6852 3.68375ZM19.3989 7.505L22.4927 10.5987L24.5464 8.545L21.4527 5.4525L19.3989 7.505ZM20.7239 12.3675L17.6314 9.27375L7.15141 19.7537L6.52266 23.475L10.2439 22.8475L20.7252 12.3662L20.7239 12.3675Z" fill="black"/>
</g>
</svg>
        </span>
       <span onClick={()=> {deleteHandler(les.id)}} id='setting' style={{ position:'relative' , left:20}}>
       <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ic:outline-delete">
<path id="Vector" d="M26 10.25V22.75H16V10.25H26ZM24.125 2.75H17.875L16.625 4H12.25V6.5H29.75V4H25.375L24.125 2.75ZM28.5 7.75H13.5V22.75C13.5 24.125 14.625 25.25 16 25.25H26C27.375 25.25 28.5 24.125 28.5 22.75V7.75Z" fill="black"/>
</g>
</svg>

        </span> 
      </td>
    </tr>
    )
  }) 
  return (
    <Fragment>
    <div  className='main-content' >
  <div className='sidebar'>
    <ControlPanel />

  </div>
    <div className='content' >
      <div className="scrollable-content">
<Dnavar ser={4} />
<div>
{showModal && (
  <Modal
  state={modalClose}
  lefting={showModal}
  title='تغيير الرمز السري الخاص باللوحة'
  label1='الرمز السري'
   input1Direction='ltr'
    input1Placeholder= '*****'
     input1Type='password'
     label2='تأكيد الرمز السري'
   input2Direction='ltr'
    input2Placeholder= '*****'
     input2Type='password'
  />
)}
  <div style={{position:'relative' , top:80 , left:476}} className="icon"> 

  <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M72.3235 17.012L39.9706 0.59057C39.2142 0.203189 38.3641 0 37.5 0C36.6359 0 35.7858 0.203189 35.0294 0.59057L2.67647 17.0154C1.86693 17.4262 1.19136 18.0311 0.720493 18.767C0.249625 19.5029 0.000775249 20.3427 0 21.1984V53.8026C0.000775249 54.6583 0.249625 55.498 0.720493 56.2339C1.19136 56.9698 1.86693 57.5748 2.67647 57.9855L35.0294 74.4104C35.7861 74.7972 36.636 75 37.5 75C38.364 75 39.2139 74.7972 39.9706 74.4104L72.3235 57.9855C73.1331 57.5748 73.8086 56.9698 74.2795 56.2339C74.7504 55.498 74.9992 54.6583 75 53.8026V21.1984C74.9999 20.3421 74.7513 19.5016 74.2804 18.7651C73.8095 18.0285 73.1336 17.423 72.3235 17.012ZM37.1324 4.1769C37.2406 4.122 37.3619 4.09322 37.4853 4.09322C37.6086 4.09322 37.73 4.122 37.8382 4.1769L68.5699 19.7734L37.5 35.5369L6.43015 19.7734L37.1324 4.1769ZM4.77941 54.3992C4.66666 54.3389 4.57321 54.2518 4.50862 54.147C4.44402 54.0422 4.4106 53.9233 4.41176 53.8026V23.4074L35.2941 39.0891V69.8866L4.77941 54.3992ZM70.1912 54.3992L39.7059 69.8866V39.0823L70.5882 23.4006V53.7958C70.5907 53.9177 70.5579 54.0379 70.4933 54.144C70.4286 54.2502 70.3344 54.3383 70.2206 54.3992H70.1912Z" fill="black"/>
</svg>



</div>

 <div style={{fontFamily: 'Markazi text' , fontWeight: '500' ,fontSize: 28 , position:'relative' , top:80 , marginBottom: 40, left:440}} className="users">
  جميع الأجهزة
 </div>

  <input onChange={(e)=> setQuery(e.target.value)} style={{ fontFamily: 'Markazi text' , width: 460 , direction: 'rtl', left: 270, top: 66, position: 'relative', background: '#D9D9D9', borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
   className="form-control"
    type="search" placeholder="ابحث باسم الجهاز او اسم المسستخدم ..." aria-label="Search"/>
        <span className='icon-search'></span>
 

  <table id='table' style={{position: 'relative' , top: 100 , left: 50 ,width: 850  , direction: 'rtl'}} class="table table-striped">
  <thead  >
    <tr >
      <th className='thead' scope="col">#</th>
      <th className='thead' scope="col">اسم الجهاز</th>
      <th className='thead' scope="col">اسم المشروع</th>
      <th className='thead' scope="col">اسم المستخدم</th>
      <th className='thead' scope="col">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="bytesize:settings" clip-path="url(#clip0_83_131)">
<g id="Group">
<path id="Vector" d="M10.1562 1.5625V4.6875L8.59375 5.46875L6.25 3.125L3.125 6.25L5.46875 8.59375L4.6875 10.1562H1.5625V14.8438H4.6875L5.46875 16.4062L3.125 18.75L6.25 21.875L8.59375 19.5312L10.1562 20.3125V23.4375H14.8438V20.3125L16.4062 19.5312L18.75 21.875L21.875 18.75L19.5312 16.4062L20.3125 14.8438H23.4375V10.1562H20.3125L19.5312 8.59375L21.875 6.25L18.75 3.125L16.4062 5.46875L14.8438 4.6875V1.5625H10.1562Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_2" d="M12.5 15.625C14.2259 15.625 15.625 14.2259 15.625 12.5C15.625 10.7741 14.2259 9.375 12.5 9.375C10.7741 9.375 9.375 10.7741 9.375 12.5C9.375 14.2259 10.7741 15.625 12.5 15.625Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</g>
<defs>
<clipPath id="clip0_83_131">
<rect width="25" height="25" fill="white"/>
</clipPath>
</defs>
</svg>
      </th>
    </tr>
  </thead>
  <tbody>
    {tablecontent}
  </tbody>
</table>

</div>

</div>
    </div>

      </div>

   

    </Fragment>
  )
}

export default Devices;