import React, { useEffect, useState } from 'react'
import SideBar from '../sideBar';
import '../contentStyle.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Bars/navbar';
import api from '../../../app/api/apiSlice';
import Swal from 'sweetalert2';
const Lpart1 = () => {
  const Navigate = useNavigate();
  const [title , setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content , setContent] = useState('');
  const getDetails = async()=>{
    try {
      await api.get(`/lessons/parts/${parseInt(localStorage.getItem("lessonId"))}`).then((res)=>{
        console.log(res.data.lessonParts);
        setTitle(res.data.lessons[0].title);
        setImage(res.data.lessons[0].image);
        setContent(res.data.lessonParts[0]?.content);
        localStorage.setItem("title" , res.data.lessons[0]?.title);
        localStorage.setItem("savedHtml2" , res.data.lessonParts[1]?.content);
        localStorage.setItem("savedHtml3" , res.data.lessonParts[2]?.content);
        localStorage.setItem("savedHtml4" , res.data.lessonParts[3]?.content);
        localStorage.setItem("savedHtml5" , res.data.lessonParts[4]?.content);
      });

    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-center",
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "فشل الاتصال تحقق من اتصالك بالانترنت "
      }); 
    }
  }
  useEffect(()=>{
    getDetails();
  },[]);
  useEffect(()=>{
    let timerInterval;
    Swal.fire({
      title: "!جاري التحميل",
      timer: 1800,
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
        <img width='300' height='250' id='lImage' alt='' src={image? `https://etech.justhost.ly/storage/app/public/lessons/images/${image}` : null}/>
        <br/>
        <div>
          <h3 id='lTitle'>
            {title? title : ''}
          </h3>
          <br/>
          <hr/>
          <div dir='rtl' dangerouslySetInnerHTML={{ __html: content }} id='lcontent' />
        </div>
      
    </div>
   </div>
  )
}

export default Lpart1;