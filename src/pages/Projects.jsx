import React, {  useState , useEffect, useRef } from 'react'
import Footer from '../components/footer';
import {motion} from 'framer-motion';
import styles from './Lessons.module.css';
import projectsicon from '../images/projects icon.png';
import moment from 'moment';
import 'moment/locale/ar';
import Navbar from '../Bars/navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../app/api/apiSlice';
import  axios  from 'axios';
import Swal from 'sweetalert2';

const Projects = () => {
  const Navigate = useNavigate();
  const [waiting , setWaiting] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const [projects , setProjects] = useState('');
    const getProjects = async()=>{
      try {
        const res = await api.get('/PlatformProjects');
      console.log(res.data);
      setProjects(res.data);
      } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-center",
          showConfirmButton: false,
          timer: 2000,
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
    useEffect(() => {
        scrollToBottom();
        getProjects();
      }, []);
    const [query , setQuery] = useState('');
    var con = null;
    con = projects;
    //    for publish time
    const currentDate = moment();
    
      const time = (updated_at)=>{
        const  pb = moment(updated_at);
        var daysago = currentDate.diff(pb , 'day');
        daysago > 10 ? daysago = daysago + ' يوم ' : daysago = daysago + ' أيام '
        console.log(daysago);
        return daysago;

      } 
    //   for sorting posts based on publish date
    const [order , setOrder] = useState(false);
    const sortData = con? con.sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        
        return !order ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    }) : '';
    const navigateHandler = async(id)=>{
      localStorage.setItem("projectId" , id);
      Navigate('contents/part1');     
    }
    useEffect(()=>{
      let timerInterval;
  Swal.fire({
    title: "جاري التحميل!",
    timer: 2000,
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
    return (
        <div ref={messagesEndRef}>
        <Navbar ser={2} />


      <div   style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
        <img style={{width: 140, height: 140, left: 540, top: 34, position: 'absolute'}} src={projectsicon} />
    <div style={{width: 25, height: 25, left: 1110, top: 272, position: 'absolute'}}> 
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ion:home">
<path id="Vector" d="M12.7715 4.94531C12.6988 4.87577 12.6021 4.83696 12.5015 4.83696C12.4009 4.83696 12.3041 4.87577 12.2314 4.94531L3.24219 13.5327C3.20401 13.5692 3.17364 13.6131 3.15291 13.6617C3.13218 13.7103 3.12152 13.7626 3.12158 13.8154L3.12012 21.875C3.12012 22.2894 3.28474 22.6868 3.57776 22.9799C3.87079 23.2729 4.26822 23.4375 4.68262 23.4375H9.375C9.5822 23.4375 9.78091 23.3552 9.92743 23.2087C10.0739 23.0622 10.1563 22.8635 10.1563 22.6563V16.0156C10.1563 15.912 10.1974 15.8127 10.2707 15.7394C10.3439 15.6662 10.4433 15.625 10.5469 15.625H14.4531C14.5567 15.625 14.6561 15.6662 14.7293 15.7394C14.8026 15.8127 14.8438 15.912 14.8438 16.0156V22.6563C14.8438 22.8635 14.9261 23.0622 15.0726 23.2087C15.2191 23.3552 15.4178 23.4375 15.625 23.4375H20.3154C20.7298 23.4375 21.1273 23.2729 21.4203 22.9799C21.7133 22.6868 21.8779 22.2894 21.8779 21.875V13.8154C21.878 13.7626 21.8673 13.7103 21.8466 13.6617C21.8259 13.6131 21.7955 13.5692 21.7573 13.5327L12.7715 4.94531Z" fill="black"/>
<path id="Vector_2" d="M23.9702 11.9214L20.3179 8.42725V3.125C20.3179 2.9178 20.2356 2.71909 20.0891 2.57257C19.9426 2.42606 19.7438 2.34375 19.5366 2.34375H17.1929C16.9857 2.34375 16.787 2.42606 16.6405 2.57257C16.4939 2.71909 16.4116 2.9178 16.4116 3.125V4.6875L13.5835 1.9834C13.3189 1.71582 12.9253 1.5625 12.5 1.5625C12.0762 1.5625 11.6836 1.71582 11.419 1.98389L1.03322 11.9204C0.729511 12.2134 0.691425 12.6953 0.967792 13.0127C1.03719 13.0928 1.12217 13.158 1.21755 13.2042C1.31293 13.2504 1.41672 13.2768 1.5226 13.2816C1.62848 13.2864 1.73424 13.2697 1.83344 13.2324C1.93264 13.195 2.02321 13.1379 2.09963 13.0645L12.2315 3.38281C12.3042 3.31327 12.4009 3.27446 12.5015 3.27446C12.6021 3.27446 12.6988 3.31327 12.7715 3.38281L22.9043 13.0645C23.0536 13.2076 23.2535 13.2857 23.4603 13.2817C23.667 13.2777 23.8638 13.1918 24.0073 13.043C24.3071 12.7324 24.2822 12.2197 23.9702 11.9214Z" fill="black"/>
</g>
</svg>

    </div>
    <div >
    <input onChange={(e)=> setQuery(e.target.value)} style={{width: 460 , direction: 'rtl', left: 376, top: 272, position: 'absolute', background: '#D9D9D9', borderRadius: 13.25, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
     className="form-control" 
     type="search"
      placeholder="ابحث بإسم المشروع أو الوصف...." aria-label="Search"/>
        <span className='icon-search'></span>
    </div>
    <div style={{width: 170, height: 39, left: 61, top: 272, position: 'absolute', background: 'rgba(217, 217, 217, 0.97)' , borderRadius: 13.25, overflow: 'hidden'}}>
        <motion.div animate={{x: order? -90 : 0}} className={styles.oldest} onClick={()=> setOrder(!order)}  style={{ width: 94 ,height: 39, paddingTop: 5, paddingBottom: 4.18, paddingLeft: 23, paddingRight: 5.06, left: 80, top: 0, position: 'absolute', background:  '#2AABEE' , borderRadius: 30.92, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{width: 83.94, height: 29.82, color:  'white', fontSize: 24, fontFamily: 'Markazi Text', fontWeight: '700',position: 'relative' , top:-2 ,    wordWrap: 'break-word'}}>{!order? 'الأقدم' : 'الأحدث'}</div>
        </motion.div>
        <motion.div className={styles.newst} animate={{x: order? 90 : 0}} onClick={()=> setOrder(!order)} style={{width: 83.94, height: 29.82, left: 9, top: 4, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>{order? 'الأقدم' : 'الأحدث'}</motion.div>
    </div>
    <div style={{width: 156, height: 42, left: 536, top: 170, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>جميع المشاريع</div>
    <div ref={messagesEndRef}  style={{width: 169, height: 21, left: 950, top: 272, position: 'absolute'}}>
      <NavLink to='/' id={styles.hompage} style={{textDecoration: 'none' , color: 'black', fontSize: 24, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>
      {' '} الرئيسية {'>'} {' '}
      </NavLink>
      <span style={{color: 'black', fontSize: 24, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}> 
      </span>
      <span style={{color: 'black', fontSize: 24, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>
        المشاريع
        </span>
        </div>

   
<div  style={{top: 360, left: 40 ,  position: 'absolute'}}  className="container">
{waiting? <div id={styles.ls} className="row row-cols-auto mb-4 justify-content-end ">
   {sortData && sortData.filter(les =>{
     if(query ===''){
        return les;
    }else if(les.title.toLowerCase().includes(query.toLowerCase()) || les.description.toLowerCase().includes(query.toLowerCase())){
        return les;
    }
   }).map((les , idx)=>(
        <div id='boxing' onClick={()=>navigateHandler(les.id)}  key={idx} className="col mb-4">
        <div style={{width: 320, height: 278,  background: 'rgba(217,217,217,0.64)', boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 14}}>
        <img style={{width: 147, height: 130, left: 90, top: 18, position: 'relative'}}  src={`https://etech.justhost.ly/storage/app/public/projects/images/${les.image}`} />
        <div style={{width: 154, height: 32, left: 45, top: 30, position: 'relative', color: 'black', fontSize: 20, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word' , direction: 'rtl'}}>{les.title}</div>
        <div style={{width: 300, height: 26, right: 50 , top: 38, position: 'relative', color: 'black', fontSize: 16, fontFamily: 'Markazi Text', fontWeight: '500', wordWrap: 'break-word', direction: 'rtl'}}>{les.description}</div>
        <div style={{width: 20, height: 0, left: 92, top: 57, position: 'relative'}}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.99996 0.666656C13.6025 0.666656 17.3333 4.39749 17.3333 8.99999C17.3333 13.6025 13.6025 17.3333 8.99996 17.3333C4.39746 17.3333 0.666626 13.6025 0.666626 8.99999C0.666626 4.39749 4.39746 0.666656 8.99996 0.666656ZM8.99996 2.33332C7.23185 2.33332 5.53616 3.0357 4.28591 4.28594C3.03567 5.53619 2.33329 7.23188 2.33329 8.99999C2.33329 10.7681 3.03567 12.4638 4.28591 13.714C5.53616 14.9643 7.23185 15.6667 8.99996 15.6667C10.7681 15.6667 12.4638 14.9643 13.714 13.714C14.9642 12.4638 15.6666 10.7681 15.6666 8.99999C15.6666 7.23188 14.9642 5.53619 13.714 4.28594C12.4638 3.0357 10.7681 2.33332 8.99996 2.33332ZM8.99996 3.99999C9.20407 4.00002 9.40107 4.07495 9.5536 4.21059C9.70613 4.34622 9.80358 4.53311 9.82746 4.73582L9.83329 4.83332V8.65499L12.0891 10.9108C12.2386 11.0608 12.3254 11.262 12.3318 11.4736C12.3383 11.6853 12.2639 11.8914 12.1239 12.0502C11.9839 12.209 11.7887 12.3086 11.5779 12.3287C11.3671 12.3487 11.1566 12.2878 10.9891 12.1583L10.9108 12.0892L8.41079 9.58916C8.28128 9.45953 8.19809 9.29082 8.17413 9.10916L8.16663 8.99999V4.83332C8.16663 4.61231 8.25442 4.40035 8.4107 4.24407C8.56698 4.08779 8.77894 3.99999 8.99996 3.99999Z" fill="black"/>
    </svg>
        </div>
        <div style={{width: 88, height: 22, left: 0, top: 60, position: 'relative', textAlign: 'right', color: 'black', fontSize: 16, fontFamily: 'Markazi Text', fontWeight: '600', wordWrap: 'break-word'}}>{`منذ ${time(les.updated_at)} `}</div>
        <div style={{width: 156, height: 22, left: 116, top: 37, position: 'relative', direction: 'rtl' ,  textAlign: 'right', color: 'black', fontSize: 18, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>الناشر: {les.username}</div>
        <div style={{width: 20, height: 20, left: 276, top: 17, position: 'relative', mixBlendMode: 'darken', border: '1px black solid'}}>
        <svg style={{position: 'relative' , top:-5 , left: 2.2}} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3209 13.6667H1.67921C1.30921 13.6667 0.992541 13.5347 0.729207 13.2708C0.465318 13.0075 0.333374 12.6908 0.333374 12.3208V1.67918C0.333374 1.30918 0.465318 0.99251 0.729207 0.729177C0.992541 0.465288 1.30921 0.333344 1.67921 0.333344H12.3209C12.6909 0.333344 13.0075 0.465288 13.2709 0.729177C13.5348 0.99251 13.6667 1.30918 13.6667 1.67918V12.3208C13.6667 12.6908 13.5348 13.0075 13.2709 13.2708C13.0075 13.5347 12.6909 13.6667 12.3209 13.6667ZM1.80754 8.63501H12.1925V7.70501H1.80754V8.63501ZM1.80754 10.8783H12.1925V10.1408H1.80754V10.8783Z" fill="black"/>
    </svg>
        </div>
    </div>
        </div>
        ))
   }
    
  </div> : ''}
  
</div>


  
</div>
{/* when 1 row 740 and when 2 row is */}
<Footer top={con.length <= 3? 740 : 1000} />
    </div>
  )
}

export default Projects;