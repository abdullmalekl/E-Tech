import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { AddProject, deleteProject, updateProject } from '../../state/projectSlice';
import { addDevice, deleteDevice, fetchDevices, updateDevice } from '../../state/devicesSlice';
import Swal from 'sweetalert2';

const AddModal = (
  { title, state, lefting, bottom, deletebtn, saveStatus,editStatus,
    label1 , input1Direction , input1Placeholder , input1Type,
    label2 , input2Direction , input2Placeholder , input2Type,
    label3 , input3Direction , input3Placeholder , input3Type,
    label4 , input4Direction , input4Placeholder , input4Type,
    label5 , input5Direction , input5Placeholder , input5Type,
     selectMenuLabel , deviceInfo 
  }
) => {
  const [input1 , setInput1] = useState(null);
  const [input2 , setInput2] = useState('');
  const [input3 , setInput3] = useState('');
  const [input4 , setInput4] = useState('');
  const [input5 , setInput5] = useState('');
  const dispatch = useDispatch();

  var loading , error = null;
  var {Ploading , Perror , projects} = useSelector((state)=> state.projects);
  var {Derror , Dloading} = useSelector((state)=> state.devices);
  
  const [selectInput, setSelectInput] = useState({ id: projects[0]?.id, name: projects[0]?.name });
  if(saveStatus === 'project' || editStatus === 'project'){
    loading = Ploading; 
    Perror !== null? error = Perror : error =null;
  }
   if(saveStatus === 'device' || editStatus === 'device'){
    loading = Dloading; 
    Derror !== null? error = Derror : error = null;
    
  }
  // when save
  const handleSave = (e)=>{
    e.preventDefault();
    if(saveStatus === 'project'){
      dispatch(AddProject({name: input1}));
      setTimeout(() => {
        if(!Perror){
          state(6);
        }
      }, 400);
    }
    if(saveStatus === 'device'){
      if(!input1){
        Swal.fire({
          title: "! اسم الجهاز مطلوب ",
          text: "!قم بالتأكد من ادخال اسم الجهاز ",
          icon: "info"
        });
        return;
      }
      if(!input2){
        Swal.fire({
          title: "! كلمة المرور مطلوبة ",
          text: "!قم بالتأكد من ادخال كلمة المرور ",
          icon: "info"
        });
        return;
      }
      if(input2 !== input3){
        Swal.fire({
          title: "! عدم تطابق كلمة المرور ",
          text: "!قم بالتأكد من كلمة المرور والمطابقة",
          icon: "info"
        });
        return;
      }
      const item = JSON.stringify({
        name: input1,
        password: input2,
        c_password: input3,
        project_id: selectInput.id,
        projectName: selectInput.name
      });
      console.log(item);
      dispatch(addDevice(item));
      setTimeout(() => {
       if(!error){
         state(1);
       }
     
      }, 400);
    }
  
  }
  // when edit
  const handleEdit = (e)=>{
    e.preventDefault();
    if(editStatus === 'project'){
      dispatch(updateProject({id: deviceInfo.id , name: input1}));
      setTimeout(() => {
        state(7);
      }, 400);
    }
    if(editStatus === 'device'){
      console.log('edit')
      const item = {
        id: deviceInfo.id,
         name: input1,
         Auth_code: input2,
         password: input3,
         c_password: input4,
         project_id: selectInput.id,
         projectName: selectInput.name
      };
      
      dispatch(updateDevice(item));
      setTimeout(() => {
        if(!error){
          state(2);
        }
      }, 400);
    }
  }
  // when delete
  const deleteHandle = (e)=>{
    e.preventDefault();
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "! لن تكون قادرا على الرجوع  ",
      icon: "!! تحذير ",
      showCancelButton: true,
      cancelButtonText: 'لا',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم "
    }).then(async(result) => {
      if (result.isConfirmed) {
      
        if(editStatus === 'project'){
          dispatch(deleteProject(deviceInfo.id));
          setTimeout(() => {
            state(2);
          }, 400);
        }
        if(editStatus === 'device'){
          dispatch(deleteDevice(deviceInfo.id));
          setTimeout(() => {
            if(!error){
              state(3);
            }
          }, 400);
        }
  
      }
    });
    
  }
  // editStatus !== 'sensor' || saveStatus !== 'sensor'

  
  return (
    <div>
    
      <div className="modal fade show mt-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' , position: 'relative' , top: bottom? -bottom :  0}} data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <div  class="modal-title" id="staticBackdropLabel">
          <div style={{position: 'relative' , left:190}} className='modaltitle'>
          {title}

          </div>
          </div>
       
      </div>
      <div class="modal-body">
       <center>
        <p style={{color: 'red'}}> {error? error : ''}</p>
       </center>
 {label1 &&  <div class="form-group">
    <label style={{ fontWeight: '600' , fontFamily: 'Markazi text' , position: 'relative' ,direction: 'rtl' , right: 20 , maxWidth:500 , width: 480}}  for="exampleInputEmail1">{label1}</label>
    <input onChange={(e)=> setInput1(e.target.value)} defaultValue={deviceInfo?.name} style={{direction: input1Direction}} placeholder={input1Placeholder} type={input1Type} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <small id="emailHelp" class="form-text text-muted"></small>
  </div>}
{label2 &&   <div class="form-group">
  <label style={{ fontWeight: '600' , paddingLeft:400 , fontFamily: 'Markazi text' , width: lefting === true? 490 : 'auto' , position:'relative', right:lefting === true? 30 :0}} dir='rtl' for="exampleInputEmail1">{label2}</label>
    <input defaultValue={null} onChange={(e)=> setInput2(e.target.value)} style={{direction: input2Direction}} placeholder={input2Placeholder} type={input2Type} class="form-control" id="exampleInputPassword1"/>
  </div>}
 {label3 &&  <div class="form-group">
  <label style={{position: 'relative' , left:lefting? 376 :356   , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{label3}</label>
    <input onChange={(e)=> setInput3(e.target.value)} style={{direction: input3Direction}} placeholder={input3Placeholder} type={input3Type} class="form-control" id="exampleInputPassword1"/>
  </div>}
 {label4 &&  <div class="form-group">
  <label style={{position: 'relative' , left:lefting? 400 :354 , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{label4}</label>
    <input onChange={(e)=> setInput4(e.target.value)} style={{direction: input4Direction}} placeholder={input4Placeholder} type={input4Type} class="form-control" id="exampleInputPassword1"/>
  </div>}
  {label5 && <div class="form-group">
  <label style={{position: 'relative' , left:374 , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{label5}</label>
    <input onChange={(e)=> setInput5(e.target.value)} style={{direction: input5Direction}} placeholder={input5Placeholder} type={input5Type} class="form-control" id="exampleInputPassword1"/>
  </div>}
  {selectMenuLabel? 
  <div  className="selectMenu">
    <label style={{position: 'relative' , left:390 , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{selectMenuLabel}</label>
    <select
  defaultValue={projects.length > 0 ? projects[0].name : ""}
  dir='rtl'
  className="form-select"
  aria-label="Default select example"
  onChange={(e) => {
    const selectedProject = projects.find((project) => project.id === parseInt(e.target.value));
    setSelectInput({ id: selectedProject.id, name: selectedProject.name });
    console.log(selectInput);
  }}
>
  {projects !== 'no'? projects?.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  )) : <option >
    لايوجد
</option> }
</select>

  </div>
  : ''}

      </div>
      <div class="modal-footer">
        <button onClick={state} style={{position: 'relative' , right: !deletebtn? 210 : 80}} type="button" class="btn btn-secondary" data-dismiss="modal">الغاء</button>
        {!loading? <button onClick={saveStatus? handleSave : handleEdit} style={{position: 'relative' , right: !deletebtn? 120 : 30}} type="button" class="btn btn-primary">حفظ</button> :
        <button disabled onClick={handleSave} style={{position: 'relative' , right: !deletebtn? 120 : 30}} type="button" class="btn btn-primary">انتظر..</button>}
      </div>
     {deletebtn?  !loading? <button onClick={deleteHandle} style={{direction: 'rtl' , bottom: 54 ,  position: 'relative' , left:'10%' , maxWidth:78 ,width: 58  }} type="button" class="btn btn-danger">  
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

export default AddModal;