import axios from 'axios'
import React, { useState } from 'react'
import api from '../app/api/apiSlice';
import Swal from 'sweetalert2';

const Modal = (
  { title, state, lefting, idx,
    label1 , input1Direction , input1Placeholder , input1Type,
    label2 , input2Direction , input2Placeholder , input2Type,
    label3 , input3Direction , input3Placeholder , input3Type,
    label4 , input4Direction , input4Placeholder , input4Type,
    label5 , input5Direction , input5Placeholder , input5Type
  }
) => {
  const [input1 , setInput1] = useState('');
  const [input2 , setInput2] = useState('');
  const [input5 , setInput5] = useState('');
  const [waiting , setWaiting] = useState(false);
  const handleSave = async(e )=>{
    e.preventDefault();
    setWaiting(true);
    const id = localStorage.getItem("devId")
    var res;
    if(input1Placeholder === '*****'){

     try {
      const data = JSON.stringify({d_password: input1 , c_password: input2});
      res = await api.put(`/devices/${id}`, data);
      if(res.status === 200){
      setWaiting(false);
    localStorage.setItem("pass" , input1);
        state(2);
      }
      if(res.status === 220){
        setWaiting(false);
        state(3)
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
    }else if(input2Placeholder === '******'){
      if(input2.length < 9){
        Swal.fire({
          title: "!كلمة المرور قصيرة جدا ",
          text: "!يجب ان تتكون كلمة المرور من 8 ارقام وحرف واحد على الاقل",
          icon: "info"
        });
        return;
      }
      
      console.log(input2);
      console.log(input5);
      if(input2 === input5 && input2 !== ''){
        const req = JSON.stringify({
          id: idx,
          password: input2
        });
        try {
          res = await api.post('/reset',req);
        if(res.status === 200){
          localStorage.setItem("pass" , input2);
          state(5);
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
      }else{
        Swal.fire({
          title: "! خطأ في التطابق  ",
          text: "!كلمة المرور وتأكيد كلمة المرور ليست متطابقات",
          icon: "error"
        });
        return;
      }
     
    
      
    }
  }
  return (
    <div>
      <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }} data-backdrop="static" data-keyboard="false">
      <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 style={{position:'relative' , left: lefting === true? 120 : 170 , fontFamily: 'Markazi text' , fontSize:24}} dir='rtl' className="modal-title" id="staticBackdropLabel">{title}</h5>
       
      </div>
      <div className="modal-body">
 {label1 &&  <div className="form-group">
    <label style={{ fontWeight: '600' , fontFamily: 'Markazi text' , position: 'relative' , left: lefting === 1? 380 : 404  , maxWidth:500 , width: 480}}  for="exampleInputEmail1">{label1}</label>
    <input onChange={(e)=> setInput1(e.target.value)}  style={{direction: input1Direction}} placeholder={input1Placeholder} type={input1Type} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <small id="emailHelp" className="form-text text-muted"></small>
  </div>}
{label2 &&   <div className="form-group">
  <label style={{ fontWeight: '600' , paddingLeft:400 , fontFamily: 'Markazi text' , width: lefting === true? 490 : 'auto' , position:'relative', right:lefting === true? 30 :0}} dir='rtl' for="exampleInputEmail1">{label2}</label>
    <input onChange={(e)=> setInput2(e.target.value)} style={{direction: input2Direction}} placeholder={input2Placeholder} type={input2Type} className="form-control" id="exampleInputPassword1"/>
  </div>}
 {label3 &&  <div className="form-group">
  <label style={{position: 'relative' , left:379 , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{label3}</label>
    <input style={{direction: input3Direction}} placeholder={input3Placeholder} type={input3Type} className="form-control" id="exampleInputPassword1"/>
  </div>}
 {label4 &&  <div className="form-group">
  <label style={{position: 'relative' , left:400 , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{label4}</label>
    <input style={{direction: input4Direction}} placeholder={input4Placeholder} type={input4Type} className="form-control" id="exampleInputPassword1"/>
  </div>}
  {label5 && <div className="form-group">
  <label style={{position: 'relative' , left:374 , fontWeight: '600' , fontFamily: 'Markazi text'}} dir='rtl' for="exampleInputEmail1">{label5}</label>
    <input onChange={(e)=> setInput5(e.target.value)} style={{direction: input5Direction}} placeholder={input5Placeholder} type={input5Type} className="form-control" id="exampleInputPassword1"/>
  </div>}

      </div>
      <div className="modal-footer">
        <button onClick={state} style={{position: 'relative' , right:210}} type="button" className="btn btn-secondary" data-dismiss="modal">الغاء</button>
        {waiting? <button disabled onClick={handleSave} style={{position: 'relative' , right:120}} type="button" className="btn btn-primary">انتظر...</button>  : <button onClick={handleSave} style={{position: 'relative' , right:120}} type="button" className="btn btn-primary">حفظ</button>}
      </div>
    </div>
  </div>
      </div>
   

     <div className="modal-backdrop fade show"></div>
  </div>
  )
}

export default Modal;