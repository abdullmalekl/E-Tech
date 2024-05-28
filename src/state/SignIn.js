import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../app/api/apiSlice';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import malek from '../components/dashboard/Rectangle 8.png';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import api from '../app/api/apiSlice';
function SignInForm(navi) {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [waiting , setWaiting] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const { register, formState  } = useForm();
  const {errors} = formState;
  const onSubmit = async(e) => {
    e.preventDefault();
    setWaiting(true);
    try {
        const req = JSON.stringify({email,password });
          const res = await api.post('/login' , req);
        if(res.status === 200){
          console.log(res.data);
          setWaiting(false);
          const credentials = {
            name: res.data.name,
            last_name: res.data.last_name,
            role: res.data.role,
            image: res.data.image !== null? res.data.image : malek  
            }
        localStorage.setItem('user', res.data.name);
        localStorage.setItem('xyz', res.data.role);
        localStorage.setItem('menow', res.data.id);

          dispatch(login(credentials));
          
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "تم تسجيل دخولك للمنصة"
          }); 
              Navigate('/'); 
              }else if(res.status === 201){
                setWaiting(false);
                Swal.fire({
                  title: "!خطأ  ",
                  text: '! البريد الالكتروني او كلمة المرور خطأ',
                  icon: "error"
                });
              }
          }catch (error) {
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
              title: "فشل الاتصال، تحقق من اتصالك بالانترنت "
            }); 
            setWaiting(false);
          }
};


      useEffect(() => {
        if (errors.password) {
          Swal.fire({
            title: "!تحذير ",
            text: errors.password.message,
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
      }, [ errors.Email , errors.password ]);
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={onSubmit}>
      <div className="etech" > E-Tech</div>
  <svg className="eBrand" width="45" height="30" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M43.5378 25.5578V14.2717L44.245 13.9002C44.7047 13.6624 44.9943 13.1909 44.9999 12.6747C45.0055 12.1598 44.7251 11.6827 44.271 11.4344L23.1189 0.172111C22.6958 -0.058732 22.184 -0.0573766 21.758 0.176264L0.72196 11.4526C0.274131 11.7009 -0.00279062 12.1724 2.12119e-05 12.6838C0.00283305 13.1952 0.285422 13.6631 0.738875 13.9066L9.98208 18.8025C9.86609 19.0061 9.79439 19.2383 9.79439 19.4888V31.3275C9.79444 31.5249 9.83643 31.72 9.9176 31.9002C9.99877 32.0803 10.1173 32.2413 10.2654 32.3726C10.5705 32.6419 13.492 35 22.4245 35C31.3254 35 34.3256 32.7713 34.6384 32.5174C34.9653 32.2523 35.1544 31.8549 35.1544 31.4338V19.2915C35.1544 19.0949 35.1129 18.9081 35.0398 18.7388L40.726 15.7497V25.5655C39.8923 26.051 39.3271 26.9415 39.3271 27.9711C39.3271 29.5164 40.5861 30.7692 42.139 30.7692C43.6918 30.7692 44.9508 29.5164 44.9508 27.9711C44.9508 26.9351 44.3778 26.0411 43.5378 25.5578ZM32.3424 30.6321C31.2374 31.161 28.3131 32.2019 22.4244 32.2019C16.4985 32.2019 13.6402 31.0938 12.6062 30.5608V20.1932L21.7362 25.0297C21.9411 25.1399 22.1704 25.1976 22.4033 25.1975C22.6302 25.1977 22.8536 25.1427 23.0543 25.0374L32.3424 20.1554V30.6321ZM22.4146 22.2135L4.33095 12.6579L22.4462 2.99683L40.6177 12.63L22.4146 22.2135Z" fill="black"/>
</svg>
        <h1 id="h1login" style={{paddingTop: 100}}>تسجيل الدخول</h1>
        <label style={{ fontWeight: '700' ,fontSize: 16, fontFamily: 'Markazi text',position: 'relative' ,direction: 'rtl' , left:'32%', top: '10%' ,  maxWidth:500 , width: 480}}  for="exampleInputEmail1">البريد الالكتروني</label>
        <input ref={inputRef} id="logininput" style={{marginTop:50 , marginBottom:40 , direction: 'ltr'}}
          // type="email"
          
          className="form-control"
          placeholder="example@email.com"
          name="email"
          value={email}
          {...register('Email', { required:{ value: true ,message: '!البريد الالكتروني مطلوب'} , 
          pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  ,
           message: '! البريد الالكتروني المدخل غير صحيح'} })}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label style={{ fontWeight: '700' ,fontSize: 16, fontFamily: 'Markazi text',position: 'relative' ,direction: 'rtl' , left:'36%', top: '-6.5%' ,  maxWidth:500 , width: 480}}  for="exampleInputEmail1">كلمة المرور</label>

        <input id="logininput" style={{position:'relative', bottom: '6%' , direction: 'ltr'}}
          className="form-control"
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
        
        {!waiting? <button type='submit' style={{marginBottom:84  ,marginTop: 10}}> تسجيل دخول</button> : <button disabled style={{marginBottom:84  ,marginTop: 10}}>...جاري التحقق</button>}
      </form>
    </div>
  );
}

export default SignInForm;
