import React, { Fragment ,useState } from 'react'
import Navbar from '../Bars/navbar';
import {   useSelector } from "react-redux";
import {  selectFirstName ,selectLastName ,selectImage, login   } from "../state/authSlice";
import { useDispatch } from 'react-redux';
import { logOut } from '../state/authSlice';
import { useNavigate } from 'react-router-dom';
import  './style.css';
import api from '../app/api/apiSlice';
import Swal from 'sweetalert2';
import multiPart from '../app/api/multipartSlice';
const Profile = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [firstName, setFirstName] = useState(useSelector(selectFirstName));
  const [lastName, setLastName] = useState(useSelector(selectLastName));
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [image, setImage] = useState(null);
  const [new1 , setNew] = useState('');
  const [previousImage , setPreviousImage] = useState(useSelector(selectImage));
  const [waiting , setWaiting] = useState(false);
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setWaiting(true);
    if(!firstName){
      Swal.fire({
        text: '!تأكد من ادخال الاسم الأول ',
        icon: "info"
      });
    setWaiting(false);
      return;
    }
    if(password){
      if(password.length < 9){
        Swal.fire({
          text: 'تأكد من ادخال كلمة مرور تحتوي على 8 ارقام وحرف واحد على الأقل ',
          icon: "info"
        });
    setWaiting(false);
        return;
      }
    }
    const req = new FormData();
    req.append('image', new1);
    req.append('name', firstName);
    req.append('lastName', lastName);
    req.append('password', password);
    req.append('newPassword', newPassword);
    const res = await multiPart.post('/userDetails', req);
    console.log(res.data);
    setWaiting(false);
    if(res.status === 200){
      Swal.fire({
        text: 'تم تغيير البيانات الشخصية بنجاح',
        icon: "success"
      });
      const credentials = {
        name: res.data.name,
        last_name: res.data.last_name,
        role: res.data.role,
        image: res.data.image !== null? res.data.image : image  
      }
      dispatch(login(credentials));
      // Navigate('/');
    }
    

  
  }

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
     const file = e.target.files[0];
      setNew(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
    input.click();
  }
  const logoutHandler = async(e)=>{
    e.preventDefault();
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
      
        const res = await api.post('/logout');
    if(res.status === 200){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "info",
        title: "تم تسجيل الخروج من المنصة "
      });
      console.log(res.data);
      localStorage.removeItem('user');
      dispatch(logOut());
      Navigate('/');

    }
      }
    });
    
  }
  const url = `https://etech.justhost.ly/storage/app/public/profile/images/${previousImage}`;
  return (
   <Fragment>
     <Navbar ser={5} />
    <svg style={{position:'absolute' , left:8}} xmlns="http://www.w3.org/2000/svg" width="1180" height="2" viewBox="0 0 1236 2" fill="none">
  <path d="M1236 1H0" stroke="#007ACC"/>
</svg>
<div style={{position: 'relative' , marginRight: 940 , top:-6}}>
<img alt='' defaultValue={url} onChange={(e)=> console.log(e.target) } height='100' width='100' style={{ left: 580, top: 30, position: 'absolute', borderRadius: 100 }} src={image? image : url} />
    <div onClick={handleImageClick}  id='newphoto' style={{width: 186, height: 41, left: 480, top: 134, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 18, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>تغيير الصورة </div>
    <input defaultValue={firstName} onChange={(e)=> setFirstName(e.target.value)} className='form-control' placeholder='ادخل الأسم الأول' style={{borderRadius:24 ,width: 500 ,position:'relative' , top: 180 , left:376 , backgroundColor: '#D9D9D9' ,fontFamily: 'Markazi Text' }} type='text' />
    <input defaultValue={lastName} onChange={(e)=> setLastName(e.target.value)} className='form-control' placeholder='ادخل الأسم التاني' style={{borderRadius:24 ,width: 500 ,position:'relative' , top: 184 , left:376 , backgroundColor: '#D9D9D9' ,fontFamily: 'Markazi Text'}} type='text' />
    <div style={{ position:'relative' , top: 183 , left:690  ,fontFamily: 'Markazi Text' , fontSize:14}} >ادخل الأسم الأول والأخير او اضافة صورة</div>
    <input onChange={(e)=> setPassword(e.target.value)} className='form-control' placeholder=' كلمة المرور ' style={{borderRadius:24 ,width: 500 ,position:'relative' , top: 198 , left:376 , backgroundColor: '#D9D9D9' ,fontFamily: 'Markazi Text'}} type='password' />
    <div style={{ position:'relative' , top: 198 , left:790  ,fontFamily: 'Markazi Text' , fontSize:14}} >ادخل كلمة المرور </div>
    <input onChange={(e)=> setNewPassword(e.target.value)} className='form-control' placeholder=' كلمة المرور الجديدة' style={{borderRadius:24 ,width: 500 ,position:'relative' , top: 202 , left:376 , backgroundColor: '#D9D9D9' ,fontFamily: 'Markazi Text'}} type='password' />
    <div style={{ position:'relative' , top: 202 , left:766  ,fontFamily: 'Markazi Text' , fontSize:14}} >   ادخل كلمة مرور جديدة </div>
    <button onClick={logoutHandler} style={{boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25)' ,position:'relative',left:440, top:214 , backgroundColor: '#D9D9D9' ,  color: '#D20000',fontSize: 14,fontFamily: 'Inter',fontWeight: '800',wordWrap: 'break-word'}}>تسجيل خروج</button>
    {waiting? <button disabled onClick={handleSubmit} style={{boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25)' , width:100 , position:'relative',left:610, top:214, backgroundColor: '#D9D9D9' ,  color: 'green',fontSize: 14,fontFamily: 'Inter',fontWeight: '800'}}> ...انتظر</button> : <button onClick={handleSubmit} style={{boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25)' , width:100 , position:'relative',left:610, top:214, backgroundColor: '#D9D9D9' ,  color: 'green',fontSize: 14,fontFamily: 'Inter',fontWeight: '800'}}> حفظ</button>}
<div style={{position: 'relative' ,top:260}}>.</div>
</div>


   </Fragment>
  )
}

export default Profile