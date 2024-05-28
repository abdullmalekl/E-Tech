import React, { useEffect, useState } from 'react'
import PsideBar from '../PsideBar';
import '../contentStyle.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Bars/navbar';
import Swal from 'sweetalert2';
import axios from 'axios';


const Ppart1 = () => {
  const Navigate = useNavigate();
  const [title , setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content , setContent] = useState('');
  const getDetails = async()=>{
    try {
      await axios.get(`https://etech.justhost.ly/api/projects/parts/${parseInt(localStorage.getItem("projectId"))}`).then((res)=>{
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
        <Navbar ser={2} />
      </div>
     <div dir='rtl' className='sidebar'>
    <PsideBar/>
    </div>
    <br />
    <div id='def'></div>
    <div className='contents'>
        <img width='300' height='250' id='lImage' alt='' src={image? `https://etech.justhost.ly/storage/app/public/projects/images/${image}` : null}/>
        <br/>
        <div>
          <h3 id='PTitle'>
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

export default Ppart1;