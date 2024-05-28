import React , { useEffect, useState} from 'react';
import SideBar from './sideBar';
import CnavBar from './CnavBar';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import SensorModal from './sensorModal';
// import { fetchSensors } from '../../state/sensorSlice';
import { fetchDevices } from '../../state/devicesSlice';
import Swal from 'sweetalert2';
import api from '../../app/api/apiSlice';
const Csensors = () => {
  const dispatch = useDispatch();
  const [sensors , setSensors] = useState(useSelector((state)=> state.sensors.sensors));
  console.log(sensors);
  const getSensors = async()=>{
    const res = await api.get(`/sensors`);
    if(res.status === 200){
      setSensors(res.data);
    }
  }
  useEffect(()=>{
    getSensors();
    dispatch(fetchDevices())
  },[dispatch]);
  const [devices , setDevices] = useState(useSelector((state)=> state.devices));
  const [existDevice , setExistDevice] = useState(useSelector((state)=> state.devices?.devices[0]?.deviceName));
  const [query , setQuery] = useState('');
  const [deviceInfo , setDeviceInfo] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);

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
      getSensors();
      setShowModal(false);
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم تحديث المستشعر بنجاح",
        icon: "success"
      });
    }else if(i === 0){
      getSensors();
      setShowModal(false);
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم اضافة المستشعر بنجاح",
        icon: "success"
      });
    }else if(i === 2){
      getSensors();
      setShowModal(false);
      Swal.fire({
        title: "!تم بنجاح ",
        text: "!تم حذف المستشعر بنجاح",
        icon: "success"
      });
    }else if(i === 3){
      Swal.fire({
        title: "! حدث خطأ ",
        text: "!لا يمكن تحديث نوع المستشعر قم بحذفه واضافة مستشعر اخر",
        icon: "error"
      });
    }
    setShowModal(false);
    }
    const cardEdit = (les)=>{
      setDeviceInfo(les);
      setShowModal(1);
    }
// sensor map show under specific device
  var content = null;
  if(sensors !== 'no'){
    content = sensors?.filter(les =>{
      if(les.board_name === existDevice && les.name.toLowerCase().includes(query.toLowerCase())){
      return les;
     }
   }).map((les , idx)=>(
     <div onClick={(event)=> cardEdit(les)} key={idx}
     onMouseEnter={() => handleMouseEnter(idx)}
     onMouseLeave={handleMouseLeave}
     className="col-2 mb-2">
         <div  className="card">
           <div className="card-body">
             <div className="card-title-sensors">
            <h5 className="cardHeader-sensors">
             {hoveredItem === idx && les?.id === les?.id ? <i class="fas fa-pen"></i>: 
             <div>
              {/* here we need to set icon based on sensor type */}
               {les?.name.slice(0,1)}
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
  const addSensor = ()=>{
      if(devices.devices === 'no'){
        Swal.fire({
          title: 'لايوجد أجهزة',
          text: 'يجب اضافة جهاز أولا',
          icon: "info"
        });
        return;
      }
      setShowModal(2);
    }

  return (
      <div  style={{backgroundColor: '#283141'}} >
    <div className="Csidebar">
    <SideBar ser={4}/>
    </div>
    <div style={{position: 'relative', zIndex: 1000}}  className="Cnavbar">
      <CnavBar  />
    </div>
    <div style={{position:'relative' , top:80}}  className="content">
    <div style={{backgroundColor: '#283141' , zIndex:-4 ,top:0 ,width:'100%' , height:'100%' , position:'fixed'}}>

    {showModal === 2? 
  <SensorModal
  saveStatus = 'sensor'
  lefting={true}
  state={modalClose}
  title=' اضافة مستشعر'
    
  />: ''}

{showModal === 1? 
  <SensorModal
  editStatus = 'sensor'
  deviceInfo={deviceInfo}
  state={modalClose}
  deletebtn={true}
  title=' تعديل مستشعر'
    
  />: ''}


    <div className="container">
    <div className='project-logo'>
    <svg width="50" height="60" viewBox="0 0 142 99" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M14.2 49.5C14.2 56.4594 15.2058 63.0161 17.2175 69.1701C19.2292 75.3242 22.1283 80.8842 25.915 85.8502C27.2167 87.5901 27.8675 89.4865 27.8675 91.5395C27.8675 93.5925 27.1575 95.3622 25.7375 96.8485C24.3175 98.3398 22.6017 99.0556 20.59 98.996C18.5783 98.9363 16.9217 98.0341 15.62 96.2893C10.65 89.827 6.80417 82.6514 4.0825 74.7625C1.36083 66.8735 0 58.4527 0 49.5C0 40.5522 1.36083 32.1016 4.0825 24.148C6.80417 16.1945 10.65 9.0487 15.62 2.71071C16.9217 0.970867 18.5783 0.0686358 20.59 0.00401319C22.6017 -0.0606095 24.3175 0.655212 25.7375 2.15147C27.1575 3.64277 27.8675 5.41243 27.8675 7.46047C27.8675 9.50851 27.2167 11.4049 25.915 13.1498C22.1283 18.245 19.2292 23.8697 17.2175 30.0237C15.2058 36.1778 14.2 42.6699 14.2 49.5ZM42.6 49.5C42.6 52.3583 42.955 55.0625 43.665 57.6126C44.375 60.1627 45.3808 62.5538 46.6825 64.7857C47.7475 66.5256 48.2516 68.4518 48.1948 70.5645C48.138 72.6772 47.3972 74.4791 45.9725 75.9704C44.5525 77.4617 42.8367 78.1775 40.825 78.1179C38.8133 78.0582 37.275 77.156 36.21 75.4112C33.725 71.8072 31.8033 67.7683 30.4448 63.2945C29.0863 58.8206 28.4047 54.2224 28.4 49.5C28.4 44.6533 29.0816 40.0253 30.4448 35.6161C31.808 31.2068 33.7297 27.1977 36.21 23.5888C37.3933 21.849 38.9624 20.979 40.9173 20.979C42.8722 20.979 44.5572 21.7247 45.9725 23.216C47.3925 24.7073 48.1333 26.4794 48.1948 28.5324C48.2563 30.5854 47.7522 32.4794 46.6825 34.2143C45.3808 36.4512 44.375 38.8447 43.665 41.3948C42.955 43.9449 42.6 46.6467 42.6 49.5ZM71 64.4129C67.095 64.4129 63.7533 62.9539 60.9748 60.036C58.1963 57.118 56.8047 53.606 56.8 49.5C56.8 45.3989 58.1916 41.8894 60.9748 38.9715C63.758 36.0535 67.0997 34.592 71 34.5871C74.905 34.5871 78.2491 36.0485 81.0323 38.9715C83.8155 41.8944 85.2047 45.4039 85.2 49.5C85.2 53.6011 83.8108 57.113 81.0323 60.036C78.2538 62.9589 74.9097 64.4179 71 64.4129ZM99.4 49.5C99.4 46.6417 99.045 43.9375 98.335 41.3874C97.625 38.8373 96.6192 36.4462 95.3175 34.2143C94.2525 32.4744 93.7792 30.5482 93.8975 28.4355C94.0158 26.3228 94.785 24.5209 96.205 23.0296C97.625 21.5383 99.2817 20.8249 101.175 20.8896C103.068 20.9542 104.607 21.8539 105.79 23.5888C108.275 27.1927 110.199 31.2018 111.562 35.6161C112.925 40.0303 113.605 44.6583 113.6 49.5C113.6 54.2224 112.918 58.8206 111.555 63.2945C110.192 67.7683 108.27 71.8072 105.79 75.4112C104.725 77.151 103.187 78.021 101.175 78.021C99.1633 78.021 97.4475 77.2753 96.0275 75.784C94.6075 74.2927 93.8691 72.5231 93.8123 70.475C93.7555 68.427 94.2572 66.5306 95.3175 64.7857C96.6192 62.5488 97.625 60.1578 98.335 57.6126C99.045 55.0675 99.4 52.3633 99.4 49.5ZM127.8 49.5C127.8 42.5406 126.794 35.9864 124.783 29.8373C122.771 23.6882 119.872 18.1257 116.085 13.1498C114.783 11.4099 114.102 9.51349 114.04 7.46047C113.979 5.40746 114.66 3.6378 116.085 2.15147C117.505 0.660183 119.252 -0.0556385 121.325 0.00401319C123.398 0.0636649 125.083 0.965896 126.38 2.71071C131.35 9.0487 135.196 16.1945 137.917 24.148C140.639 32.1016 142 40.5522 142 49.5C142 58.4478 140.639 66.8686 137.917 74.7625C135.196 82.6564 131.35 89.832 126.38 96.2893C125.078 98.0291 123.422 98.9314 121.41 98.996C119.398 99.0606 117.682 98.3448 116.262 96.8485C114.842 95.3572 114.133 93.5876 114.133 91.5395C114.133 89.4915 114.783 87.5951 116.085 85.8502C119.872 80.755 122.771 75.1328 124.783 68.9837C126.794 62.8346 127.8 56.3401 127.8 49.5Z" fill="white"/>
</svg>


    </div>
<p className="SpageName">
جميع المستشعرات
</p>
<div className="addproject">
<button onClick={addSensor}  style={{position: 'relative' , left: '84%', top: 18 , marginBottom:50 ,   width: 'auto' , height: 30 , paddingLeft:3}}>
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
  <span style={{position: 'relative' , left: 6 , top:-9 , width: 'auto' , height: 34 , fontFamily: 'markazi text' }} >اضافة مستشعر</span>
  </button>
</div>
<span>
  <input onChange={(e)=> setQuery(e.target.value)}   style={{ fontFamily: 'Markazi text' , width: 460 ,height: 30, direction: 'rtl', left: '30%', bottom: 64, position: 'relative', background: 'white', borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', display: 'inline-flex'}} 
   className="form-control"
    type="search" placeholder="ابحث باسم الحساس..." aria-label="Search"/>
        <span className='icon-search'></span>
  </span>
<div style={{width: '100%', height: 1, border: '1px #007ACC solid', position:'relative' , top: -40}}>
</div>
<select defaultValue={existDevice} onChange={(e)=>setExistDevice(e.target.value)} style={{position:'absolute' , bottom:340 , left:40 , height:36 , width: 130 , borderRadius: 18}} dir='rtl' class="form-select" aria-label="Default select example">
      {devices.devices !== 'no'? devices?.devices.map((device , idx)=>(
        <option key={idx}>{device?.deviceName? device.deviceName : ''}</option>
      )): ''}
</select>
<div className="projectsCard">
<div className="row">
        {content? content : <div>
      <p style={{position: 'relative' , right:435 , top: 80, fontWeight: 'bold' , fontSize: 24, color: 'white' , fontFamily: 'Markazi text'}}>
      لايوجد مستشعرات مضافة !
      </p>
      <p style={{position: 'relative' , right:480 , top: 80, fontWeight: 'bold' , fontSize: 18, color: 'white' , fontFamily: 'Markazi text'}}>
      قم باضافة مستشعر!
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

export default Csensors;