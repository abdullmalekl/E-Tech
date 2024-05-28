import React, { useEffect, useState } from 'react'
import '../style.css';
import Pusher from "pusher-js";

import api from '../../../app/api/apiSlice';
import Swal from 'sweetalert2';
const Switch = ({data , id , bId}) => {
  useEffect(()=>{
    // this connect to pusher using public key
    var pusher = new Pusher('7bc2c2e2db41d26e2652', {
      cluster: 'mt1'
    });
    const channel = pusher.subscribe('Cloud');
    channel.bind('Switch', function (data) {
      // this when trigger event in backend should this function run and update messages for all
      // users
      console.log(parseInt(data.Switch));
      setSwitch(parseInt(data.Switch) === 1? false : true);
    });
  },[]);
  const [switch1 , setSwitch] = useState(data == 0 ? true: false);
      const switchControl = async()=>{
        setSwitch(!switch1);
        try {
          const req = JSON.stringify({id,status: switch1 , board_id: bId});
         await api.put('cloud/v1/Monitoring' , req);
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
      // console.log(switch1);!switch1
  return (
    <div className="bauble_box" >
      {switch1?
	<input checked  onClick={switchControl} className="bauble_input" id="bauble_check" name="bauble" type="checkbox"/>
  :
	<input  onClick={switchControl} className="bauble_input" id="bauble_check" name="bauble" type="checkbox"/>
        }
	<label className="bauble_label" htmlFor="bauble_check">Toggle</label>
        </div>
  )
}

export default Switch;