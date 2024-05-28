import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom'
import './style.css';
import $ from 'jquery';
function ErrorPage({state}) {
  useEffect(() => {
    const pageX = $(document).width();
    const pageY = $(document).height();
    let mouseY = 0;
    let mouseX = 0;

    $(document).mousemove(function(event) {
        //verticalAxis
        mouseY = event.pageY;
        const yAxis = (pageY / 2 - mouseY) / pageY * 300;
        //horizontalAxis
        mouseX = event.pageX / -pageX;
        const xAxis = -mouseX * 100 - 100;

        $('.box__ghost-eyes').css({ 'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)' });

        //console.log('X: ' + xAxis);
    });
}, []);
    const Error = useRouteError(); // this handle the error in path in url
    const navigate = useNavigate();
    console.error(Error); // to print the error in console
  return (
    <div style={{fontFamily: "Ubuntu"}} className="box">
  <div className="box__ghost">
    <div className="symbol"></div>
    <div className="symbol"></div>
    <div className="symbol"></div>
    <div className="symbol"></div>
    <div className="symbol"></div>
    <div className="symbol"></div>
    
    <div className="box__ghost-container">
      <div className="box__ghost-eyes">
        <div className="box__eye-left"></div>
        <div className="box__eye-right"></div>
      </div>
      <div className="box__ghost-bottom">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div className="box__ghost-shadow"></div>
  </div>
  
  <div className="box__description">
    {state != 401? <div className="box__description-container">
      <div className="box__description-title">404</div>
      <div className="box__description-title">الصفحة غير موجودة</div>
      <div className="box__description-text"> يبدو أنك ادخلت رابط غير صحيح أو الصفحة غير متوفرة حاليا</div>
    </div> : <div className="box__description-container">
      <div className="box__description-title">401</div>
      <div className="box__description-title"> دخول غير مصرح به </div>
      <div className="box__description-text">إذا تم محاولة دخول غير مصرح به مرة أخرى سوف يتم حظرك  </div>
    </div>}
    <button style={{position: 'relative' , left: 44 , bottom:10}} className='btn btn-primary' onClick={()=> navigate("/",{replace:true} )} >الرجوع للرئيسية</button>
    {/* <a href="https://codepen.io/diogo_ml_gomes/" target="_blank" className="box__button">Go back</a> */}
    
  </div>
  
</div>
  )
}

export default ErrorPage;
        // <center>
        // {/* this to show the status code */}
        // <h4>{Error.status}</h4>
        // {/* show the details of error */}
        // <h4>{Error.data}</h4>
        //     {/* show the status in text format like not found */}
        // <h4>{Error.statusText}</h4> 
        // {/* this Button from bootstrap take special attributes */}
        // {/* replace:true in navigate mean clean the page we stand in it from the stack!! */}
        // <Button variant='dark' onClick={()=> navigate("/",{replace:true} )} >Back</Button>
        // </center>