import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import Swal from "sweetalert2";
import api from "../app/api/apiSlice";
function SignUpForm(props) {
  const [name , setName] = useState('');
  const [last_name , setLast_name] = useState('');
  const [password , setPassword] = useState('');
  const [c_password , setC_password] = useState('');
  const [email , setEmail] = useState('');
  const [waiting , setWaiting] = useState(false);
  const { register, handleSubmit, formState  } = useForm();
  const {errors} = formState;

  const onSubmit = async(data) => {
    
    setWaiting(true);
       try {
        const req = JSON.stringify({name , last_name ,password ,c_password , email});
        const res = await api.post('register' , req);
        if(res.status === 200){
    setWaiting(false);
          console.log(res.data);
          Swal.fire({
            title: "!قم بتسجيل الدخول ",
            text: 'تم تسجيل الحساب بنجاح',
            icon: "success"
          });
          props.handleOnClick("signIn");
          return;
        }
        if(res.status === 204){
          Swal.fire({
            title: "! بريد الالكتروني موجود مسبقا ",
            text: ' قم بإدخال بريد الكتروني اخر ',
            icon: "error"
          });
        }
    setWaiting(false);
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
    setWaiting(false);
       }
  };

  useEffect(() => {
    if (errors.userName) {
      Swal.fire({
        title: "! حدث خطأ ",
        text: errors.userName.message,
        icon: "error"
      });
    }
    if (errors.password) {
      Swal.fire({
        title: "!تحذير ",
        text: errors.password.message,
        icon: "info"
      });
    }
    if (errors.last_name) {
      Swal.fire({
        title: "!تحذير ",
        text: errors.last_name.message,
        icon: "info"
      });
    }
    if (errors.Email) {
      Swal.fire({
        title: "!تحذير ",
        text: errors.Email.message,
        icon: "info"
      });
    }
    if (errors.c_password) {
      Swal.fire({
        title: "!تحذير",
        text: errors.c_password.message,
        icon: "info"
      });
    }
  }, [errors.userName ,errors.last_name , errors.Email , errors.password ,errors.c_password]);

  return (
    <div className="form-container sign-up-container">
        
      <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{position:'relative' , bottom:"-18.85%" ,right: '7.3%' , fontFamily: 'Markazi text' , fontWeight: 'bold' , fontSize:'2rem'}} > E-Tech</div>
  <svg className="eBrand" width="45" height="30" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M43.5378 25.5578V14.2717L44.245 13.9002C44.7047 13.6624 44.9943 13.1909 44.9999 12.6747C45.0055 12.1598 44.7251 11.6827 44.271 11.4344L23.1189 0.172111C22.6958 -0.058732 22.184 -0.0573766 21.758 0.176264L0.72196 11.4526C0.274131 11.7009 -0.00279062 12.1724 2.12119e-05 12.6838C0.00283305 13.1952 0.285422 13.6631 0.738875 13.9066L9.98208 18.8025C9.86609 19.0061 9.79439 19.2383 9.79439 19.4888V31.3275C9.79444 31.5249 9.83643 31.72 9.9176 31.9002C9.99877 32.0803 10.1173 32.2413 10.2654 32.3726C10.5705 32.6419 13.492 35 22.4245 35C31.3254 35 34.3256 32.7713 34.6384 32.5174C34.9653 32.2523 35.1544 31.8549 35.1544 31.4338V19.2915C35.1544 19.0949 35.1129 18.9081 35.0398 18.7388L40.726 15.7497V25.5655C39.8923 26.051 39.3271 26.9415 39.3271 27.9711C39.3271 29.5164 40.5861 30.7692 42.139 30.7692C43.6918 30.7692 44.9508 29.5164 44.9508 27.9711C44.9508 26.9351 44.3778 26.0411 43.5378 25.5578ZM32.3424 30.6321C31.2374 31.161 28.3131 32.2019 22.4244 32.2019C16.4985 32.2019 13.6402 31.0938 12.6062 30.5608V20.1932L21.7362 25.0297C21.9411 25.1399 22.1704 25.1976 22.4033 25.1975C22.6302 25.1977 22.8536 25.1427 23.0543 25.0374L32.3424 20.1554V30.6321ZM22.4146 22.2135L4.33095 12.6579L22.4462 2.99683L40.6177 12.63L22.4146 22.2135Z" fill="black"/>
</svg>
        <h1 id="h1login" style={{position:'relative' , top:'20%'}}>انشاء حساب</h1>
        <input className="form-control" id="signupInput1"
          type="text"
          name="name"
          {...register('userName', { required: {value: true , message:'!اسم المستخدم مطلوب'} })}
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="اسم المستخدم"
        />
      
        
        <input className="form-control" id="signupInput2"
          type="text"
          name="last_name"
          {...register('last_name', { required: {value: true , message:'!الأسم الأخير مطلوب' }})}
          value={last_name}
          onChange={(e)=>setLast_name(e.target.value)}
          placeholder="الاسم الأخير"
        />
        <input className="form-control" id="signupInput3"
          name="email"
          value={email}
          {...register('Email', { required:{ value: true ,message: '!البريد الالكتروني مطلوب'} , 
          pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  ,
           message: '! البريد الالكتروني المدخل غير صحيح'} })}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="البريد الالكتروني"
        />
        <input className="form-control" id="signupInput4"
          name="password"
          type="password"
          {...register('password', { required: {value: true , message:'  !ادخل كلمة المرور'}  ,
           minLength: {value: 8 , message: 'يجب ان لاتقل كلمة المرور على 8 ارقام وحرف واحد على الأقل'} , 
          pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
           , message: 'يجب ان تحتوي كامة المرور على خليط من ارقام ورموز'} })}
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          placeholder="كلمة المرور"
        />
        <input className="form-control" id="signupInput5"
          name="c_password"
          type="password"
          {...register('c_password', { required: {value: true , message:'  !ادخل كلمة المرور'}  ,
           minLength: {value: 8 , message: 'يجب ان لاتقل كلمة المرور على 8 ارقام وحرف واحد على الأقل'} , 
          pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
           , message: 'يجب ان تحتوي كامة المرور على خليط من ارقام ورموز'},
           validate: (value) => value === password || 'يجب أن تكون تأكيد كلمة المرور مطابقة لكلمة المرور '
           })}
          value={c_password}
          onChange={(e)=>setC_password(e.target.value)}
          placeholder="تأكيد كلمة المرور"
        />
        {!waiting? <button style={{position:'relative' , bottom: '16%' , left:'2%'}}>انشاء حساب</button>: <button disabled style={{position:'relative' , bottom: '16%' , left:'2%'}}>...جاري الإنشاء</button>}
      </form>
    </div>
  );
}

export default SignUpForm;
