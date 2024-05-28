import React, {  Fragment, useEffect, useRef, useState } from 'react'
import Navbar from '../Bars/navbar';
import Pusher from "pusher-js";
import api from '../app/api/apiSlice';
import Swal from 'sweetalert2';
const Chat = () => {
  const[id , setId] = useState(localStorage.getItem("menow"));
  const [waiting , setWaiting] = useState(false);
  const [messages, setMessages] = useState([]);
  const getMessages = async()=>{
    try{
      const res = await api.get('/messages');
      if(res.status === 200){
        setMessages(res.data);
        console.log(res.data);
      }
    }catch(e){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-center",
        showConfirmButton: false,
        timer: 800,
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
    getMessages();
    }
  }
  useEffect(()=>{
    // this connect to pusher using public key
    var pusher = new Pusher('7bc2c2e2db41d26e2652', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      // this when trigger event in backend should this function run and update messages for all
      // users
      getMessages();
      
    
    });
  },[]);
  useEffect(()=>{
    getMessages();
  },[]);
  const [text , setText] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async() => {
    const newMessage = { user_id: id, message: text , created_at: '2024-04-29T13:38:10.000000Z'};
    setMessages([...messages, newMessage]);
    setText('');
    console.log(newMessage);
    try {
      await api.post('messages' , JSON.stringify({message:text}));
    } catch (error) {
      setMessages(messages.slice(0, -1));
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
        title: "فشل الارسال تحقق من اتصالك بالانترنت "
      }); 
    }
  };
  const handleKeyPress = (event) => {
    
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  useEffect(()=>{
    let timerInterval;
Swal.fire({
  title: "!جاري التحميل",
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    // const timer = Swal.getPopup().querySelector("b");
    // timerInterval = setInterval(() => {
    //   timer.textContent = `${Swal.getTimerLeft()}`;
    // }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    setWaiting(true);
  }
});
  },[]);
  return (
    <Fragment>
      <Navbar ser={3} />
      {waiting? <div className="chat-container">
         <div style={{height: 22, paddingTop: 0.1, paddingRight: 10, left: 580, top: 80, position: 'absolute', background: 'rgba(217, 217, 217, 0.97)', borderRadius: 40, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div 
        style={{width: 80, height: 17, textAlign: 'right', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '900', wordWrap: 'break-word'}}>
          {messages[messages.length - 1]?.created_at?.slice(0,10).toString()}
          </div>
    </div>
      <div className="message-list">
        {messages.map((message,idx) => (
          <div ref={messagesEndRef} key={idx} className={`message ${id === message.user_id? 'user': 'other' }`}>
            {id !== message.user_id? (
              <img alt='avatar' src={`https://etech.justhost.ly/storage/app/public/profile/images/${message?.user_image}`} className="avatar"></img>
            ): ''} 
            <div className={`text-${id === message.user_id? 'user': 'other'}`}>{message?.message}</div>
            <br/>
            {id !== message.user_id ? <div style={{position:'absolute' , marginTop:48 ,  fontSize:10 , fontWeight: 'bold'}}>{message?.username}</div> : ''}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input className='form-control' style={{borderRadius:20}} onKeyDown={handleKeyPress} onChange={(e)=> setText(e.target.value)} value={text} type="text" placeholder="اكتب رسالتك هنا.."  />
        <button onClick={handleSendMessage}>إرسال</button>
      </div>
    </div>: ''}
    </Fragment>
     
  
    
  )
};

export default Chat;