import React, { useState } from 'react';
import "./login.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
const Login = (navi) => {
    const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

        return (
            <div className='formation' >
              <div className="Applogin">
            <div className={containerClass} id="logincontainer">
              <SignUpForm navi={navi} handleOnClick={handleOnClick} />
              <SignInForm navi={navi} />
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1 id="h1login">! مرحبا بعودتك</h1>
                    <p id='plogin'  style={{fontWeight: '700' , fontSize:18}} >
                      لكي تبقى متصل معنا الرجاء تسجيل الدخول بمعلوماتك الشخصية
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      style={{border: '1px solid white' ,height:'8%'}}
                      onClick={() => handleOnClick("signIn")}
                    >
                      <p style={{fontSize:18 , fontWeight:'bold' , position: 'relative' , bottom:'28%'}}>
                      تسجيل الدخول

                      </p>
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1 id="h1login"> !مرحبا</h1>
                    <p id='plogin' style={{fontWeight: '700' , fontSize:18}}>ادخل معلوماتك الشخصية لانشاء حساب وأبدأ التعلم</p>
                    <button
                      className="ghost "
                      id="switchButton"
                      onClick={() => handleOnClick("signUp")}
                    >
                      <p id='buttontext'>
                      انشاء حساب
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
  )
}

export default Login;