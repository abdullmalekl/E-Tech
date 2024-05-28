import React, { useState } from 'react';
import './style.css'
import {useSelector } from 'react-redux';
import api from '../../app/api/apiSlice';
import Swal from 'sweetalert2';

const SensorModal = (
    { title, state, saveStatus, editStatus ,deviceInfo , deletebtn }
) => {
  const[waiting , setWaiting] = useState(false)
  const types = [
    {
      id:1,
      name: 'مستقبل اشارة'
    },
    {
      id:2,
      name: 'مرسل اشارة'
    }
  ];
  const [sensorType , setSensorType] = useState(deviceInfo? deviceInfo?.sensorClass : types[0].id);
  const [input1 , setInput1] = useState(deviceInfo?.name? deviceInfo?.name : '');
  const [input2 , setInput2] = useState(deviceInfo?.pin? deviceInfo.pin : '');
  const [input3 , setInput3] = useState('');

  var {devices} = useSelector((state)=> state.devices);
  // when save
  const handleSave = async(e)=>{
    e.preventDefault();
    setWaiting(true);
    console.log(selectDevice)
    const req = JSON.stringify({ sensorType ,
      name: input1 ,
       type: sensorData ,
        board_id: selectDevice,
         pin: input2? parseInt(input2) : ''
       });
       console.log(req);
  const res =  await  api.post("/sensors", req);
  setWaiting(false);

  if(res.status === 201){
console.log(res);
  state(0);

  }
    
          // state();
        
    }
    
    // when edit
    const handleEdit = async(e)=>{
      e.preventDefault();
    setWaiting(true);
    const req = JSON.stringify({id: deviceInfo?.id,
        sensorType ,
        name: input1 ,
        type: sensorData ,
        board_id: selectDevice,
        pin: input2? parseInt(input2) : ''});
      const res = await api.put(`/sensors/${deviceInfo?.id}`, req);
      if(res.status === 201){
        setWaiting(false);
        state(1);
      }else if(res.status === 202){
        setWaiting(false);
        state(3);
      }
  }
  // when delete
    const deleteHandle = async(e)=>{
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
      
        setWaiting(true);
     const req = JSON.stringify({ sensorClass: sensorType});
     console.log(req)
     const res = await api.post(`/sensors/delete/${deviceInfo?.id}`,req);
     setWaiting(false);
     if(res.status === 200){
       state(2);
     }
  
      }
    });
   
  }
  

  const controllers = [{
    id:1,
    type: 'محول'
  },
  {
    id:5,
    type: 'اضاءة',
  },
];
const readers = [
  {
    id:2,
    type: 'قارئ حرارة',
  },
  {
    id:3,
    type: 'قارئ رطوبة',
  },
  {
    id:4,
    type: 'قارئ مسافة',
  },
  {
  id:6,
  type: 'مستشعر دخان',
  },
  {
  id:7,
  type: 'مستشعر غاز',
  },
  ];

    const [sensorData, setSensorData] = useState(deviceInfo?.sensorType? deviceInfo?.sensorType : sensorType === 1? controllers[0].id : readers[0].id);
    const [selectDevice, setSelectDevice] = useState(devices? devices[0].id : '');
    
    
    

return (
    <div>
    
      <div className="modal fade show mt-4" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' , position: 'relative' , top: 0 ,overflowY: 'scroll'}} data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog">
    <div class="modal-content">
      <div style={{height:50}} class="modal-header">
        <div  class="modal-title" id="staticBackdropLabel">
          <div style={{position: 'relative' , left:180}} className='modaltitle'>
          {title}
          
          </div>
          </div>
       
      </div>
      <div class="modal-body">
       <center>
       </center>
    <label style={{ fontWeight: '500' ,fontSize: 16, fontFamily: 'Markazi text' , position: 'relative' ,direction: 'rtl' ,bottom:4, right: 20 , maxWidth:500 , width: 480}}  for="exampleInputEmail1">نوع الحساس</label>
       <select
       defaultValue={deviceInfo?.sensorType == 1? deviceInfo?.sensorClass :types[0].id }
  dir='rtl'
  className="form-select"
  aria-label="Default select example"
  
  onChange={(e) => {
    setSensorType(parseInt(e.target.value));
    console.log(sensorType);
  }}
>
  
{types && types.map((type) => (
    <option key={type.id} value={type.id}>
      {type.name}  
    </option>
  ))}
  
</select>
<div class="form-group">
    <label style={{ fontWeight: '500' ,fontSize:16, marginBottom:4 , marginTop:4, fontFamily: 'Markazi text' , position: 'relative' ,direction: 'rtl' , right: 20 , maxWidth:500 , width: 480}}  for="exampleInputEmail1">{sensorType === 1? 'اسم المتحكم':'اسم القارئ'}</label>
    <input onChange={(e)=> setInput1(e.target.value)} defaultValue={deviceInfo?.name} style={{direction: 'rtl'}} placeholder={sensorType === 1? ' متال:  اضاءة دار النوم':'متال: رطوبة المطبخ '} type='text' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <small id="emailHelp" class="form-text text-muted"></small>
  </div>

  <label style={{ fontWeight: '500' ,fontSize: 16, fontFamily: 'Markazi text' , position: 'relative' ,direction: 'rtl' ,marginBottom:4, right: 20 , maxWidth:500 , width: 480}}  for="exampleInputEmail1">{sensorType === 1? 'نوع المتحكم':'نوع القارئ'}</label>
      {sensorType === 1?  <>
        <select
        defaultValue={deviceInfo?.sensorClass}
  dir='rtl'
  className="form-select"
  aria-label="Default select example"
  onChange={(e)=> {
    console.log(e.target.value);
    setSensorData(parseInt(e.target.value))
    }}
>
  {controllers && controllers.map((controller) => (
    <option key={controller.id} value={controller.id}>
      {controller.type}  
    </option>
  ))}
</select>
 <label style={{ fontWeight: '500' ,fontSize: 18, fontFamily: 'Markazi text' , position: 'relative' ,direction: 'rtl' ,marginBottom:4 , marginTop:8, right: 20 , maxWidth:500 , width: 480}}  for="exampleInputEmail1">رقم pin</label>
 <input defaultValue={deviceInfo?.pin} onChange={(e)=> setInput2(e.target.value)} style={{direction: 'rtl'}} placeholder='رقم المأخد في الجهاز المستخدم...' type='text' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
 <small id="emailHelp" class="form-text text-muted"></small>
      </>
 :
 <select
 defaultValue={deviceInfo?.sensorClass}
  dir='rtl'
  className="form-select"
  aria-label="Default select example"
  onChange={(e)=> {
    console.log(parseInt(e.target.value));
    setSensorData(parseInt(e.target.value))
    }}
>

  {readers && readers.map((reader) => (
    <option  key={reader.id} value={reader.id}>
      {reader.type} 
    </option>
  ))}
</select>
  }
  <div  className="selectMenu">
    <label style={{position: 'relative' , left:410 ,fontSize: 16, fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">اختر جهاز</label>
    <select
  defaultValue={deviceInfo?.board_name}
  dir='rtl'
  className="form-select"
  aria-label="Default select example"
  onChange={(e) => {
    console.log(e.target.value);
    setSelectDevice(e.target.value);
    
  }}
>
  {devices !== 'no'? devices.map((device) => (
    <option key={device.id} value={device.id}>
      {device.deviceName}
    </option>
  )): <option>
  لايوجد
</option>}
</select>
</div>
      </div>
      
      <div class="modal-footer">
        <button onClick={state} style={{position: 'relative' , right: !deletebtn? 210 : 80}} type="button" class="btn btn-secondary" data-dismiss="modal">الغاء</button>
        {!waiting? <button onClick={saveStatus? handleSave : handleEdit} style={{position: 'relative' , right: !deletebtn? 40 : 30}} type="button" class="btn btn-primary">حفظ</button> :
        <button disabled onClick={handleSave} style={{position: 'relative' , right: !deletebtn? 120 : 30}} type="button" class="btn btn-primary">انتظر..</button>}
      </div>
      {editStatus?  !waiting? <button onClick={deleteHandle} style={{direction: 'rtl' , bottom: 54 ,  position: 'relative' , left:'10%' , maxWidth:78 ,width: 58  }} type="button" class="btn btn-danger">  
     حذف
      </button>: <button disabled style={{direction: 'rtl' , bottom: 54 ,  position: 'relative' , left:'10%' , maxWidth:78 ,width: 58  }} type="button" class="btn btn-danger">  
     انتظر..
      </button> : ''}
      
    </div>
  </div>
      </div>
   

     <div className="modal-backdrop fade show"></div>
  </div>
  )
}

export default SensorModal;