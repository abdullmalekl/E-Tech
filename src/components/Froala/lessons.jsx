import React, { Fragment, useState } from 'react'
import Navbar from '../../Bars/navbar'
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import axios from 'axios';
import Swal from 'sweetalert2';
import './froalastyle.css';
import { useNavigate } from 'react-router-dom';
import multiPart from '../../app/api/multipartSlice';
import api from '../../app/api/apiSlice';
const Flessons = () => {
  const Navigate = useNavigate();
  const [waiting , setWaiting] = useState(false);
  const [title , setTitle] = useState(()=>{
    return localStorage.getItem("title") || "";
  });
  const [image, setImage] = useState(()=>{
    return localStorage.getItem("image") || "";
  });
  const [description , setDescription] = useState(()=>{
    return localStorage.getItem("description") || "";
  });
  const [content , setContent] = useState(()=>{
    return localStorage.getItem("savedHtml") || "";
  });
  const toPart2 = async(e)=>{
    e.preventDefault();
    setWaiting(true);
    if (!content) {
      setWaiting(false);
      Swal.fire({
        text: 'يرجى ملئ حقل المحتوى',
        icon: "error"
      });
      return;
      }
      if (!title) {
        setWaiting(false);
        Swal.fire({
          text: 'يرجى ملئ حقل العنوان',
          icon: "error"
        });
        return;
        }
    if (!description) {
        setWaiting(false);
        Swal.fire({
          text: 'يرجى ملئ حقل الوصف',
          icon: "error"
        });
        return;
        }
    if (!image) {
        setWaiting(false);
        Swal.fire({
          text: 'يرجى وضع صورة  ',
          icon: "error"
        });
        return;
        }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('part', 1);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    try {
      var res = null;
      if(!localStorage.getItem("title")){
       res = await multiPart.post('/lessons', formData);
      }else{
        res = await multiPart.put(`/lessons/${localStorage.getItem("id")}`, formData);
        console.log(res);
      }
      setWaiting(false);
      if (res.status === 201) {
        localStorage.removeItem("savedHtml");
        Navigate('/Dashboard/lessons/2');
      }else if(res.status === 500){
        console.log(res.data);
      }
    } catch (error) {
      setWaiting(false);
      Swal.fire({
        text: 'حدث خطأ اثناء الاتصال بالخادم تحقق من اتصالك بالانترنت وحاول مجددا',
        icon: "error"
      });
      setWaiting(false);
   
    }
  }
  const sendData = async(e)=>{
    e.preventDefault();
    setWaiting(true);
    if (!content.trim()) {
      setWaiting(false);
      Swal.fire({
        text: 'يرجى ملئ حقل المحتوى',
        icon: "error"
      });
      return; 
    }
    if (!title.trim()) {
      setWaiting(false);
      Swal.fire({
        text: 'يرجى ملئ حقل العنوان',
        icon: "error"
      });
      return; 
    }
    if (!description.trim()) {
      setWaiting(false);
      Swal.fire({
        text: 'يرجى ملئ حقل الوصف',
        icon: "error"
      });
      return; 
    }
    if (!image) {
      setWaiting(false);
      Swal.fire({
        text: 'يرجى وضع صورة  ',
        icon: "error"
      });
      return; 
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('part', 1);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);

    try {
      var res = null;
      if(!localStorage.getItem("title")){
       res = await axios.post('https://etech.justhost.ly/api/lessons', formData);
      }else{
        await multiPart.put(`lessons/${localStorage.getItem("id")}`, formData);
      }
      setWaiting(false);
      if (res.status === 201) {
        localStorage.removeItem("savedHtml");
        Navigate('/Dashboard/lessons');
      }
    } catch (error) {
      setWaiting(false);
      Swal.fire({
        text: 'حدث خطأ اثناء الاتصال بالخادم تحقق من اتصالك بالانترنت وحاول مجددا',
        icon: "error"
      });
    }
  }
  const url = `https://etech.justhost.ly/storage/app/public/lessons/images/`;
  const [file , setFile]= useState(()=>{
    return url+localStorage.getItem("image") || "";
  })
  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      }
      reader.readAsDataURL(file);
    }
    input.click();
  }
  const cancelHandler = ()=>{

    Swal.fire({
      title: "هل انت متأكد؟",
      text: "لن تكون قادرا على الرجوع !",
      icon: "تحذير !!",
      showCancelButton: true,
      cancelButtonText: 'لا',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم "
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("savedHtml");
        localStorage.removeItem("title");
        localStorage.removeItem("description");
        localStorage.removeItem("image");
        Swal.fire({
          title: "تم بنجاح !",
          text: "تم الغاء العملية",
          icon: "success"
        });
    Navigate('/Dashboard/lessons');
      }
    });
  }
  return (
 <Fragment>
      <Navbar  ser={1}/>
  <div style={{ width:1192.5, height: 2000 , backgroundColor: '#F3F3F3'}}>
      <div style={{
        fontFamily: 'Markazi text',
        fontSize: 24,
        fontWeight: '700',
        position: 'absolute',
        left: 536,
        marginBottom: 10,
        top: 100
    }}>
     {localStorage.getItem("title")? 'تعديل الدرس  / الجزء الأول' : 'درس جديد / الجزء الأول'}
      </div>
 <div style={{width: 166, height: 0, left: 546, top: 138, position: 'absolute', borderRadius: 12, border: '1.6px #2AABEE solid'}}>

</div>
      <img alt=''  height='150' width='150' style={{ left: 554, top: 100, position: 'relative', border: '1px solid' }} src={file? file : null} />
    <div onClick={handleImageClick} id='newphoto' style={{width: 186, height: 41, left: 500, top: 110, position: 'relative', textAlign: 'right', color: 'black', fontSize: 18, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>اضف صورة تعريفية</div>
    <label dir='rtl' style={{
      position: 'relative',
      left:1108,
      top: 90,
      fontFamily: 'Markazi text',
      fontSize: 18,
      fontWeight: '300',
      }}  >عنوان الدرس:</label>
    <input
    value={title}
    onChange={(e)=> setTitle(e.target.value)}
     placeholder='اضف عنوان...' style={{
      position: 'relative',
      width: 1170 , 
      left:20,
      top:90,
      fontFamily: 'Markazi text',
      fontWeight: '600'
      
    }} className='form-control' /> 
    <label dir='rtl' style={{
      position: 'relative',
      left:1098,
      top: 90,
      fontFamily: 'Markazi text',
      fontSize: 18,
      fontWeight: '300',
      }}  >وصف مختصر:</label>
    <textarea
    value={description}
    onChange={(e)=> setDescription(e.target.value)}
    placeholder='اضف عنوان...' style={{
      direction: 'rtl',
      position: 'relative',
      width: 1170 , 
      left:20,
      top:90,
      fontFamily: 'Markazi text',
      fontWeight: '600'
      
    }} className='form-control' /> 
    <label dir='rtl' style={{
      position: 'relative',
      left:1126,
      top: 100,
      fontFamily: 'Markazi text',
      fontSize: 18,
      fontWeight: '300',
      }}  > المحـتوى:</label>
<div style={{position:'relative' , top: 100 , width: 1170 , left:20 , direction: 'rtl'}}>
<FroalaEditor  
      model={content}
      
      onModelChange={(e)=> setContent(e)}
      config={{
        imageUploadParam: 'image_param',

        // Set the image upload URL.
        imageUploadURL: 'https://etech.justhost.ly/api/froala/upload_image',
    
        // Additional upload params.
        imageUploadParams: {id: 'my_editor'},
    
        // Set request type.
        imageUploadMethod: 'POST',
    
        // Set max image size to 5MB.
        imageMaxSize: 5 * 1024 * 1024,
    
        // Allow to upload PNG and JPG.
        imageAllowedTypes: ['jpeg', 'jpg', 'png' , 'svg'],
    
        placeholderText: "محتوى الدرس",
        charCounterMax: 10000,
        saveInterval: 1000,
        textDirection: 'rtl',
        events: {
          "save.before" : function (html){
            localStorage.setItem("savedHtml" , html);

          },
          'image.uploaded': function (response) {
            console.log(response);
          },
          'image.error': function (error, response) {
            // Bad link.
            if (error.code === 1) { 
              console.log(response)
            }
    
            // No link in upload response.
            else if (error.code === 2) { 
              console.log('no link coming from a server..')

            }
    
            // Error during image upload.
            else if (error.code === 3) { 
              console.log('error when uploadin image..')

            }
    
            // Parsing response failed.
            else if (error.code === 4) { 
              console.log('Parsing response failed.')

            }
    
            // Image too text-large.
            else if (error.code === 5) { 
              console.log('Image too text-large')
            }
    
            // Invalid image type.
            else if (error.code === 6) { 
              console.log('invlid type')

            }
          }
        }
      }}
      />
      {!waiting? <button onClick={toPart2} id='primaryButton' className='btn btn-primary'>
         الجزء التالي {'>>'}
      </button> :<button disabled onClick={toPart2} id='primaryButton' className='btn btn-primary'>
        انتظر...{'>>'}
      </button>}
     {!waiting?  <button onClick={sendData} id='successButton' className='btn btn-success'>
        حفظ الدرس 
      </button> :  <button disabled onClick={sendData} id='successButton' className='btn btn-success'>
      انتظر...
      </button>}
      {!waiting? <button onClick={cancelHandler} id='dangerButton' className='btn btn-danger'>
         الغاء 
      </button> : <button disabled onClick={cancelHandler} id='dangerButton' className='btn btn-danger'>
        انتظر...
      </button>}
      
</div>
    </div>
    </Fragment>
  )
}

export default Flessons;