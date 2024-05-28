import React, { Fragment, useEffect, useRef, useState } from 'react'
import Navbar from '../../../Bars/navbar'
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import axios from 'axios';
import '../froalastyle.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const ProjectPart5 = () => {
  const Navigate = useNavigate();
  const targetRef = useRef(null);
  const [waiting , setWaiting] = useState(false);
  const [content , setContent] = useState(()=>{
    return localStorage.getItem("savedHtml") || "";
  });
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
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
    const formData = new FormData();
    formData.append('content', content);
    formData.append('part', 5);
    try {
      const res = await axios.post('https://etech.justhost.ly/api/projects/parts', formData);
      setWaiting(false);
      if (res.status === 201) {
        localStorage.removeItem("savedHtml");
        Navigate('/Dashboard/projects');
      }
    } catch (error) {
      setWaiting(false);
      Swal.fire({
        text: 'حدث خطأ اثناء الاتصال بالخادم تحقق من اتصالك بالانترنت وحاول مجددا',
        icon: "error"
      });
    }
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
        Swal.fire({
          title: "تم بنجاح !",
          text: "تم الغاء العملية",
          icon: "success"
        });
    Navigate('/Dashboard/projects');
      }
    });
  }
  return (
 <Fragment>
      <Navbar  ser={2}/>
  <div ref={targetRef} style={{ width:1192.5, height: 2000 , backgroundColor: '#F3F3F3'}}>
      <div style={{
        fontFamily: 'Markazi text',
        fontSize: 24,
        fontWeight: '700',
        position: 'absolute',
        left: 536,
        marginBottom: 10,
        top: 100
    }}>مشروع جديد / الجزءالخامس</div>
 <div style={{width: 166, height: 0, left: 546, top: 138, position: 'absolute', borderRadius: 12, border: '1.6px #2AABEE solid'}}>

</div>
     
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

export default ProjectPart5;