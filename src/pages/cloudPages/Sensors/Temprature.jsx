import React, { useEffect, useState } from 'react'
import '../style.css';
import Pusher from "pusher-js";
const Temprature = ({data}) => {
    const [temprature , setTemprature] = useState(data);
    useEffect(()=>{
      // this connect to pusher using public key
      var pusher = new Pusher('7bc2c2e2db41d26e2652', {
        cluster: 'mt1'
      });
  
      const channel = pusher.subscribe('Cloud');
      channel.bind('Temprature', function (data) {
        // this when trigger event in backend should this function run and update messages for all
        // users
        // console.log(data.Temprature);
        setTemprature(data.Temprature);
        
      
      });
    },[]);
  return (
    <div id='temp'>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.2949 14.2871C29.1771 14.1171 29.1315 13.9073 29.1681 13.7038C29.2047 13.5002 29.3206 13.3195 29.4902 13.2012C31.2715 11.9707 34.0645 11.9707 35.8457 13.2012C37.0879 14.0566 39.1856 14.0566 40.4277 13.2012C40.5983 13.0928 40.8042 13.0547 41.0022 13.095C41.2003 13.1352 41.375 13.2506 41.4898 13.4169C41.6045 13.5832 41.6504 13.7875 41.6177 13.9869C41.585 14.1864 41.4763 14.3653 41.3145 14.4863C40.364 15.0885 39.2619 15.4083 38.1367 15.4083C37.0115 15.4083 35.9095 15.0885 34.959 14.4863C33.7168 13.6309 31.6191 13.6309 30.377 14.4863C30.2068 14.6025 29.9976 14.6468 29.7949 14.6095C29.5923 14.5722 29.4126 14.4563 29.2949 14.2871ZM40.4277 19.4512C39.1856 20.3066 37.0879 20.3066 35.8457 19.4512C34.0645 18.2207 31.2715 18.2207 29.4902 19.4512C29.4015 19.5075 29.3251 19.5812 29.2656 19.6678C29.206 19.7544 29.1645 19.8521 29.1436 19.9551C29.1227 20.058 29.1228 20.1642 29.1438 20.2671C29.1649 20.3701 29.2065 20.4678 29.2662 20.5542C29.3259 20.6407 29.4024 20.7143 29.4912 20.7706C29.5799 20.8268 29.6791 20.8645 29.7828 20.8815C29.8865 20.8985 29.9926 20.8944 30.0947 20.8695C30.1968 20.8445 30.2928 20.7992 30.377 20.7363C31.6191 19.8809 33.7168 19.8809 34.959 20.7363C35.9095 21.3385 37.0115 21.6583 38.1367 21.6583C39.2619 21.6583 40.364 21.3385 41.3145 20.7363C41.4763 20.6153 41.585 20.4364 41.6177 20.2369C41.6504 20.0375 41.6045 19.8332 41.4898 19.6669C41.375 19.5006 41.2003 19.3852 41.0022 19.345C40.8042 19.3047 40.5983 19.3428 40.4277 19.4512ZM22.9063 34.9375C22.9064 35.9858 22.6052 37.012 22.0386 37.894C21.472 38.7759 20.6638 39.4764 19.7104 39.9121C18.7569 40.3478 17.6983 40.5003 16.6607 40.3513C15.623 40.2024 14.65 39.7584 13.8576 39.0722C13.0651 38.386 12.4866 37.4865 12.1909 36.4808C11.8951 35.4751 11.8947 34.4056 12.1896 33.3996C12.4845 32.3937 13.0623 31.4937 13.8542 30.8068C14.6461 30.1199 15.6187 29.6751 16.6563 29.5254V8.375C16.6563 8.1678 16.7386 7.96909 16.8851 7.82257C17.0316 7.67606 17.2303 7.59375 17.4375 7.59375C17.6447 7.59375 17.8434 7.67606 17.9899 7.82257C18.1364 7.96909 18.2188 8.1678 18.2188 8.375V29.5254C19.5202 29.7132 20.7104 30.3637 21.5713 31.3577C22.4322 32.3517 22.9061 33.6225 22.9063 34.9375ZM21.3438 34.9375C21.3438 34.1649 21.1147 33.4097 20.6854 32.7673C20.2562 32.1249 19.6461 31.6243 18.9324 31.3286C18.2186 31.0329 17.4332 30.9556 16.6754 31.1063C15.9177 31.257 15.2217 31.6291 14.6754 32.1754C14.1291 32.7217 13.757 33.4177 13.6063 34.1754C13.4556 34.9332 13.5329 35.7186 13.8286 36.4324C14.1243 37.1461 14.6249 37.7562 15.2673 38.1854C15.9097 38.6147 16.6649 38.8438 17.4375 38.8438C18.4735 38.8438 19.4671 38.4322 20.1996 37.6996C20.9322 36.9671 21.3438 35.9735 21.3438 34.9375ZM29.1563 34.9375C29.1563 36.935 28.6456 38.8994 27.6729 40.6441C26.7002 42.3888 25.2976 43.8559 23.5984 44.9061C21.8992 45.9562 19.9598 46.5546 17.9642 46.6444C15.9687 46.7342 13.9834 46.3124 12.1967 45.4191C10.4101 44.5257 8.88142 43.1905 7.75594 41.5403C6.63045 39.89 5.9455 37.9794 5.76611 35.9899C5.58672 34.0004 5.91885 31.9981 6.73096 30.1731C7.54308 28.3481 8.80822 26.761 10.4063 25.5625V8.375C10.4063 6.5102 11.147 4.72177 12.4657 3.40316C13.7843 2.08454 15.5727 1.34375 17.4375 1.34375C19.3023 1.34375 21.0907 2.08454 22.4093 3.40316C23.728 4.72177 24.4688 6.5102 24.4688 8.375V25.5625C25.9235 26.6547 27.1043 28.0703 27.9178 29.6973C28.7314 31.3244 29.1553 33.1184 29.1563 34.9375ZM27.5938 34.9375C27.5929 33.3002 27.1966 31.6873 26.4386 30.236C25.6807 28.7847 24.5834 27.5378 23.2402 26.6016C23.136 26.5288 23.0511 26.4317 22.9929 26.3187C22.9347 26.2057 22.905 26.0802 22.9063 25.9531V8.375C22.9063 6.9246 22.3301 5.5336 21.3045 4.50801C20.2789 3.48242 18.8879 2.90625 17.4375 2.90625C15.9871 2.90625 14.5961 3.48242 13.5705 4.50801C12.5449 5.5336 11.9688 6.9246 11.9688 8.375V25.9531C11.9688 26.0789 11.9384 26.2028 11.8803 26.3144C11.8221 26.4259 11.7379 26.5217 11.6348 26.5938C10.2018 27.5914 9.05016 28.9415 8.29112 30.514C7.53208 32.0864 7.19125 33.828 7.30154 35.5706C7.41182 37.3131 7.96949 38.9978 8.9207 40.462C9.87192 41.9262 11.1846 43.1205 12.7319 43.9294C14.2792 44.7384 16.009 45.1348 17.7542 45.0804C19.4994 45.0259 21.2011 44.5225 22.695 43.6186C24.1889 42.7148 25.4245 41.441 26.2826 39.9204C27.1407 38.3997 27.5923 36.6836 27.5938 34.9375Z" fill="white"/>
</svg>
          {temprature.slice(0,2)}
        </div>
  )
}

export default Temprature;