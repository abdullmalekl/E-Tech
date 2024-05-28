import React, { Fragment, useEffect, useState } from 'react'
import ControlPanel from './Dashboard';
import './style.css';
import Dnavar from './d-navBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const Dprojects = () => {
  const [lessons , setLessons] = useState([]);
  const getLessons = async(i)=>{
     try {
      await axios.get('https://etech.justhost.ly/api/PlatformProjects').then((res)=>{
      // console.log(res.data);
      if(res.status === 200){
        setLessons(res.data);
      }else if(res.status === 202){
        Swal.fire({
          text: 'لايوجد مشاريع مضافة',
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
    getLessons();
    localStorage.removeItem("title");
    localStorage.removeItem("image");
    localStorage.removeItem("description");
    localStorage.removeItem("savedHtml");
    localStorage.removeItem("savedHtml2");
    localStorage.removeItem("savedHtml3");
    localStorage.removeItem("savedHtml4");
    localStorage.removeItem("savedHtml5");
  },[]);
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
       
        try{
          await axios.delete(`https://etech.justhost.ly/api/PlatformProjects/${id}`).then((res)=>{
          if(res.status === 200){
            getLessons(1);
          }else{
            return;
          }
          })
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
            title: "فشل الحذف. تحقق من اتصالك بالانترنت "
          }); 
        }
      }
    });
    
  }
  const Navigate = useNavigate();
  const [query , setQuery] = useState('');
  
  var content = null;
  content = lessons;
 const editHandle = async(id)=>{
  try {
    await axios.get(`https://etech.justhost.ly/api/projects/parts/${id}`).then((res)=>{
    console.log(res.data.lessonParts);
    localStorage.setItem("id" , res.data.lessons[0].id);
    localStorage.setItem("title" , res.data.lessons[0].title);
    localStorage.setItem("image" , res.data.lessons[0].image);
    localStorage.setItem("description" , res.data.lessons[0].description);
    localStorage.setItem("savedHtml" , res.data.lessonParts[0]?.content);
    localStorage.setItem("savedHtml2" , res.data.lessonParts[1]?.content);
    localStorage.setItem("savedHtml3" , res.data.lessonParts[2]?.content);
    localStorage.setItem("savedHtml4" , res.data.lessonParts[3]?.content);
    localStorage.setItem("savedHtml5" , res.data.lessonParts[4]?.content);
    Navigate('manager');
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
   }else if(les.title.toLowerCase().includes(query.toLowerCase()) || les.description.toLowerCase().includes(query.toLowerCase())){
       return les;
   }else{
    return false;
   }
  }).map((les , idx)=>{
    count++;
    return(
      <tr key={idx}>
      <th scope="row">{count}</th>
      <td>{les.title}</td>
      <td>{les.description.slice(0,30)}...</td>
      <td>
        <span onClick={()=> {editHandle(les.id)}} id='setting' style={{marginLeft:10 , position:'relative' , left:20}}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="tdesign:edit">
<path id="Vector" d="M19.6852 3.68375C20.154 3.21507 20.7897 2.95178 21.4527 2.95178C22.1156 2.95178 22.7513 3.21507 23.2202 3.68375L26.3139 6.7775C26.5462 7.00966 26.7304 7.2853 26.8561 7.58868C26.9818 7.89206 27.0465 8.21723 27.0465 8.54562C27.0465 8.87401 26.9818 9.19919 26.8561 9.50257C26.7304 9.80595 26.5462 10.0816 26.3139 10.3137L11.4477 25.18L3.47266 26.525L4.81891 18.55L19.6852 3.68375ZM19.3989 7.505L22.4927 10.5987L24.5464 8.545L21.4527 5.4525L19.3989 7.505ZM20.7239 12.3675L17.6314 9.27375L7.15141 19.7537L6.52266 23.475L10.2439 22.8475L20.7252 12.3662L20.7239 12.3675Z" fill="black"/>
</g>
</svg>
        </span>
       <span onClick={()=> deleteHandler(les.id)} id='setting' style={{ position:'relative' , left:20}}>
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
<Dnavar ser={3} />
<div>
  <div style={{position:'relative' , top:80 , left:476}} className="icon"> 

  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M65.5506 70L42.2676 45.7191L46.717 41.079L70 65.3555L65.5506 70ZM7.27594 70L2.82231 65.3555L32.0016 34.93L19.5465 22.0286L17.2568 24.4165L13.2812 20.1874V28.0595L10.9915 30.4473L0 18.9848L2.28972 16.5925H9.83825L5.80817 12.4728L14.8874 3.0045C15.8547 1.99571 16.9143 1.24641 18.0661 0.756591C19.2152 0.26969 20.4411 0.0262403 21.744 0.0262403C23.044 0.0262403 24.2685 0.26969 25.4176 0.756591C26.5694 1.24641 27.629 1.99571 28.5963 3.0045L21.6936 10.203L26.2898 14.9962L24.0001 17.3841L36.4552 30.2855L47.1783 19.1028C46.5213 18.132 46.0656 17.1392 45.8112 16.1246C45.5568 15.11 45.4296 13.9962 45.4296 12.7833C45.4296 9.21175 46.6163 6.1883 48.9899 3.71298C51.3635 1.23766 54.2627 0 57.6875 0C58.4144 0 59.1134 0.0539389 59.7843 0.161815C60.4609 0.266776 61.1277 0.482527 61.7847 0.809071L53.0955 9.8663L60.4847 17.5722L69.1697 8.51056C69.4968 9.19572 69.7078 9.88962 69.8029 10.5923C69.898 11.2978 69.9455 12.0282 69.9455 12.7833C69.9455 16.3549 68.7573 19.3784 66.3809 21.8537C64.0101 24.3319 61.1123 25.571 57.6875 25.571C56.5245 25.571 55.4565 25.4398 54.4836 25.1774C53.5107 24.9209 52.5601 24.4427 51.6319 23.743L7.27594 70Z" fill="black"/>
</svg>

</div>

 <div style={{fontFamily: 'Markazi text' , fontWeight: '500' ,fontSize: 28 , position:'relative' , top:80 , left:440}} className="users">
  جميع المشاريع
 </div>
<button onClick={()=> Navigate('manager')} style={{position: 'relative' , left: 740 , top:102 , width: 'auto' , height: 34 , paddingLeft:4}}>
  <span  style={{position: 'relative' , left: 2 , top:-7 , width: 'auto'}} >
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
  <span>
  <input onChange={(e)=> setQuery(e.target.value)} style={{ fontFamily: 'Markazi text' , width: 460 , direction: 'rtl', left: 240, top: 66, position: 'relative', background: '#D9D9D9', borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
   className="form-control"
    type="search" placeholder="ابحث باسم  المشروع او الوصف..." aria-label="Search"/>
        <span className='icon-search'></span>
  </span>

  <table id='table' style={{position: 'relative' , top: 100 , left: 50 ,width: 850  , direction: 'rtl'}} class="table table-striped">
  <thead  >
    <tr >
      <th className='thead' scope="col">#</th>
      <th className='thead' scope="col">العنوان</th>
      <th className='thead' scope="col">وصف مختصر</th>
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

export default Dprojects;