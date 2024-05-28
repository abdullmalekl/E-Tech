import React, { Fragment, useEffect, useState } from 'react'
import ControlPanel from './Dashboard';
import './style.css';
import Dnavar from './d-navBar';
import Modal from '../modal';
import api from '../../app/api/apiSlice';
import Swal from 'sweetalert2';
const Dusers = () => {
  
  const [showModal, setShowModal] = useState(0);
  const [query , setQuery] = useState('');
  const [content , setContent] = useState([]);
  const[id , setId] = useState('');
  const [waiting , setWaiting] = useState(false);
 
  const getUsers = async()=>{
   try {
    const res = await api.get('users');
    console.log(res.data);
    if(res.status === 200){
      setContent(res.data);
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
  useEffect(()=>{
getUsers();
  },[])
  const modalClose = (i)=>{
   if(i === 5){
    const pass =  localStorage.getItem("pass");
    setShowModal(false);
    Swal.fire({
      title: "تم بنجاح !",
      text: ` ${pass}  كلمة المرور الجديدة هي  `,
      icon: "success"
    });
   }
  setShowModal(false)

  }
 const editHandle =(id)=>{
  setId(id);
  setShowModal(1)
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
      res = await api.delete(`user/${id}`);
      if(res.status === 200){
       Swal.fire({
         title: "! تم بنجاح",
         text: "!تم حذف المستخدم بنجاح ",
         icon: "success"
       });
       getUsers();
      }else if(res.status === 204){
       Swal.fire({
         title: "!  خطأ",
         text: "! قم بحذف الأجهزة والحساسات أولا , لايمكن حذف مستخدم",
         icon: "error"
       });
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
        title: "فشل الحذف. تحقق من اتصالك بالانترنت "
      }); 
    }
    }
  });
 
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
  setWaiting(true);
}
});
},[]);

//  u need to change attributes based on what u get from backend
  var count = 0;
  var tablecontent = content?.filter(user =>{
    if(query ===''){
       return user;
   }else if(user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase())){
       return user;
   }else{
    return false;
   }
  }).map((user , idx)=>{
    count++;
    return(
      <tr key={idx}>
      <th scope="row">{count}</th>
      <td>{user.name} {user.last_name}</td>
      <td>{user.email}</td>
      <td>
        <span onClick={()=> {editHandle(user.id)}} id='setting' style={{marginLeft:10 , position:'relative' , left:20}}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="tdesign:edit">
<path id="Vector" d="M19.6852 3.68375C20.154 3.21507 20.7897 2.95178 21.4527 2.95178C22.1156 2.95178 22.7513 3.21507 23.2202 3.68375L26.3139 6.7775C26.5462 7.00966 26.7304 7.2853 26.8561 7.58868C26.9818 7.89206 27.0465 8.21723 27.0465 8.54562C27.0465 8.87401 26.9818 9.19919 26.8561 9.50257C26.7304 9.80595 26.5462 10.0816 26.3139 10.3137L11.4477 25.18L3.47266 26.525L4.81891 18.55L19.6852 3.68375ZM19.3989 7.505L22.4927 10.5987L24.5464 8.545L21.4527 5.4525L19.3989 7.505ZM20.7239 12.3675L17.6314 9.27375L7.15141 19.7537L6.52266 23.475L10.2439 22.8475L20.7252 12.3662L20.7239 12.3675Z" fill="black"/>
</g>
</svg>
        </span>
       <span onClick={()=> {deleteHandler(user.id)}} id='setting' style={{ position:'relative' , left:20}}>
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
  const edit = (<Modal
    idx={id}
    state={modalClose}
    lefting={showModal}
    title='تعديل المستخدم'
       label2='كلمة المرور'
     input2Direction='ltr'
      input2Placeholder= '******'
       input2Type='password'
       label5='تأكيد كلمةالمرور'
       input5Direction='ltr'
        input5Placeholder= '******'
         input5Type='password'
    />)
  return (
    <Fragment>
    <div  className='main-content' >
  <div className='sidebar'>
    <ControlPanel />

  </div>
    <div className='content' >
      <div className="scrollable-content">
<Dnavar ser={1} />
<div>
{showModal ===1? edit : ''}

  <div style={{position:'relative' , top:80 , left:486}} className="icon"> 

  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="solar:users-group-rounded-bold">
<path id="Vector" d="M26.2531 29.1667C32.6964 29.1667 37.9198 23.9433 37.9198 17.5C37.9198 11.0567 32.6964 5.83333 26.2531 5.83333C19.8098 5.83333 14.5864 11.0567 14.5864 17.5C14.5864 23.9433 19.8098 29.1667 26.2531 29.1667Z" fill="black"/>
<path id="Vector_2" d="M26.2531 61.2529C37.5289 61.2529 46.6698 56.0296 46.6698 49.5863C46.6698 43.1429 37.5289 37.9196 26.2531 37.9196C14.9773 37.9196 5.83643 43.1429 5.83643 49.5863C5.83643 56.0296 14.9773 61.2529 26.2531 61.2529Z" fill="black"/>
<path id="Vector_3" d="M61.2498 49.5833C61.2498 54.4163 55.3115 58.3333 48.0635 58.3333C50.1985 56 51.6685 53.0688 51.6685 49.5892C51.6685 46.1038 50.1956 43.1725 48.0548 40.8363C55.3056 40.8333 61.2498 44.7533 61.2498 49.5833ZM52.4998 17.5C52.5007 18.9079 52.1619 20.2953 51.5121 21.5443C50.8623 22.7933 49.9207 23.867 48.7672 24.6744C47.6138 25.4817 46.2825 25.9988 44.8865 26.1817C43.4906 26.3646 42.071 26.2079 40.7485 25.725C42.1734 23.2182 42.9203 20.3834 42.9156 17.5C42.9156 14.5104 42.1281 11.7046 40.7515 9.27792C42.0738 8.7956 43.493 8.6394 44.8886 8.82259C46.2842 9.00579 47.615 9.52296 48.7681 10.3302C49.9211 11.1375 50.8624 12.211 51.5121 13.4597C52.1617 14.7084 52.5005 16.0924 52.4998 17.5Z" fill="black"/>
</g>
</svg>

</div>

 <div style={{fontFamily: 'Markazi text' , fontWeight: '500' ,fontSize: 28 , position:'relative' , top:80 , left:424}} className="users">
  جميع المستخدمين
 </div>

  <span>
  <input onChange={(e)=> setQuery(e.target.value)} style={{ fontFamily: 'Markazi text' , width: 460 , direction: 'rtl', left: 270, top: 87, position: 'relative', background: '#D9D9D9', borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
   className="form-control"
    type="search" placeholder="ابحث باسم المستخدم او بالبريد الالكتروني..." aria-label="Search"/>
    <span className='icon-search'></span>
  </span>

  <table id='table' style={{position: 'relative' , top: 100 , left: 50 ,width: 850  , direction: 'rtl'}} class="table table-striped">
  <thead  >
    <tr >
      <th className='thead' scope="col">#</th>
      <th className='thead' scope="col">اسم المستخدم</th>
      <th className='thead' scope="col">البريد الالكتروني</th>
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

export default Dusers;