import React from 'react'
import { NavLink,  useNavigate } from 'react-router-dom';
import styles from './DnavBar.module.css';
const Dnavar = (props) => {
    const navigate = useNavigate();
  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    
    <div style={{width: 30, height: 30, left: 890, top: 13, position: 'absolute'}}>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="radix-icons:dashboard">
<path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M5.6 2H5.5C5.042 2 4.648 2 4.3 2.082C3.76127 2.21073 3.2687 2.48609 2.87686 2.87758C2.48502 3.26906 2.20922 3.76139 2.08 4.3C2 4.648 2 5.04 2 5.5V10.5C2 10.958 2 11.352 2.082 11.7C2.21073 12.2387 2.48609 12.7313 2.87758 13.1231C3.26906 13.515 3.76139 13.7908 4.3 13.92C4.648 14 5.04 14 5.5 14H10.5C10.958 14 11.352 14 11.7 13.918C12.2387 13.7893 12.7313 13.5139 13.1231 13.1224C13.515 12.7309 13.7908 12.2386 13.92 11.7C14 11.352 14 10.96 14 10.5V5.5C14 5.042 14 4.648 13.918 4.3C13.7893 3.76127 13.5139 3.2687 13.1224 2.87686C12.7309 2.48502 12.2386 2.20922 11.7 2.08C11.352 2 10.96 2 10.5 2H5.6ZM4.766 4.028C4.852 4.008 4.986 4 5.6 4H10.4C11.016 4 11.148 4.006 11.234 4.028C11.4137 4.07096 11.5779 4.16285 11.7085 4.29347C11.8391 4.42409 11.931 4.58834 11.974 4.768C11.994 4.852 12 4.984 12 5.6V10.4C12 11.016 11.994 11.148 11.972 11.234C11.929 11.4137 11.8371 11.5779 11.7065 11.7085C11.5759 11.8391 11.4117 11.931 11.232 11.974C11.15 11.992 11.018 12 10.4 12H5.6C4.984 12 4.852 11.994 4.766 11.972C4.58634 11.929 4.42209 11.8371 4.29147 11.7065C4.16085 11.5759 4.06896 11.4117 4.026 11.232C4.008 11.15 4 11.018 4 10.4V5.6C4 4.984 4.006 4.852 4.028 4.766C4.07096 4.58634 4.16285 4.42209 4.29347 4.29147C4.42409 4.16085 4.58834 4.06896 4.768 4.026L4.766 4.028ZM19.6 2H19.5C19.042 2 18.648 2 18.3 2.082C17.7613 2.21073 17.2687 2.48609 16.8769 2.87758C16.485 3.26906 16.2092 3.76139 16.08 4.3C16 4.648 16 5.04 16 5.5V10.5C16 10.958 16 11.352 16.082 11.7C16.2107 12.2387 16.4861 12.7313 16.8776 13.1231C17.2691 13.515 17.7614 13.7908 18.3 13.92C18.648 14 19.04 14 19.5 14H24.5C24.958 14 25.352 14 25.7 13.918C26.2387 13.7893 26.7313 13.5139 27.1231 13.1224C27.515 12.7309 27.7908 12.2386 27.92 11.7C28 11.352 28 10.96 28 10.5V5.5C28 5.042 28 4.648 27.918 4.3C27.7893 3.76127 27.5139 3.2687 27.1224 2.87686C26.7309 2.48502 26.2386 2.20922 25.7 2.08C25.352 2 24.96 2 24.5 2H19.6ZM18.766 4.028C18.852 4.008 18.986 4 19.6 4H24.4C25.016 4 25.148 4.006 25.234 4.028C25.4137 4.07096 25.5779 4.16285 25.7085 4.29347C25.8391 4.42409 25.931 4.58834 25.974 4.768C25.994 4.852 26 4.984 26 5.6V10.4C26 11.016 25.992 11.148 25.972 11.234C25.929 11.4137 25.8372 11.5779 25.7065 11.7085C25.5759 11.8391 25.4117 11.931 25.232 11.974C25.148 11.994 25.016 12 24.4 12H19.6C18.984 12 18.852 11.994 18.766 11.972C18.5863 11.929 18.4221 11.8371 18.2915 11.7065C18.1609 11.5759 18.069 11.4117 18.026 11.232C18.008 11.15 18 11.018 18 10.4V5.6C18 4.984 18.006 4.852 18.028 4.766C18.071 4.58634 18.1628 4.42209 18.2935 4.29147C18.4241 4.16085 18.5883 4.06896 18.768 4.026L18.766 4.028ZM5.5 16H10.5C10.958 16 11.352 16 11.7 16.082C12.2387 16.2107 12.7313 16.4861 13.1231 16.8776C13.515 17.2691 13.7908 17.7614 13.92 18.3C14 18.648 14 19.04 14 19.5V24.5C14 24.958 14 25.352 13.918 25.7C13.7893 26.2387 13.5139 26.7313 13.1224 27.1231C12.7309 27.515 12.2386 27.7908 11.7 27.92C11.352 28 10.96 28 10.5 28H5.5C5.042 28 4.648 28 4.3 27.918C3.76127 27.7893 3.2687 27.5139 2.87686 27.1224C2.48502 26.7309 2.20922 26.2386 2.08 25.7C2 25.352 2 24.96 2 24.5V19.5C2 19.042 2 18.648 2.082 18.3C2.21073 17.7613 2.48609 17.2687 2.87758 16.8769C3.26906 16.485 3.76139 16.2092 4.3 16.08C4.648 16 5.04 16 5.5 16ZM5.6 18C4.984 18 4.852 18.006 4.766 18.028C4.58634 18.071 4.42209 18.1628 4.29147 18.2935C4.16085 18.4241 4.06896 18.5883 4.026 18.768C4.008 18.85 4 18.982 4 19.6V24.4C4 25.016 4.006 25.148 4.028 25.234C4.07096 25.4137 4.16285 25.5779 4.29347 25.7085C4.42409 25.8391 4.58834 25.931 4.768 25.974C4.852 25.994 4.984 26 5.6 26H10.4C11.016 26 11.148 25.992 11.234 25.972C11.4137 25.929 11.5779 25.8372 11.7085 25.7065C11.8391 25.5759 11.931 25.4117 11.974 25.232C11.994 25.148 12 25.016 12 24.4V19.6C12 18.984 11.994 18.852 11.972 18.766C11.929 18.5863 11.8371 18.4221 11.7065 18.2915C11.5759 18.1609 11.4117 18.069 11.232 18.026C11.15 18.008 11.018 18 10.4 18H5.6ZM19.6 16H19.5C19.042 16 18.648 16 18.3 16.082C17.7613 16.2107 17.2687 16.4861 16.8769 16.8776C16.485 17.2691 16.2092 17.7614 16.08 18.3C16 18.648 16 19.04 16 19.5V24.5C16 24.958 16 25.352 16.082 25.7C16.2107 26.2387 16.4861 26.7313 16.8776 27.1231C17.2691 27.515 17.7614 27.7908 18.3 27.92C18.648 28.002 19.042 28.002 19.5 28.002H24.5C24.958 28.002 25.352 28.002 25.7 27.92C26.2384 27.7909 26.7305 27.5154 27.122 27.124C27.5134 26.7325 27.7889 26.2404 27.918 25.702C28 25.354 28 24.96 28 24.502V19.5C28 19.042 28 18.648 27.918 18.3C27.7893 17.7613 27.5139 17.2687 27.1224 16.8769C26.7309 16.485 26.2386 16.2092 25.7 16.08C25.352 16 24.96 16 24.5 16H19.6ZM18.766 18.028C18.852 18.008 18.986 18 19.6 18H24.4C25.016 18 25.148 18.006 25.234 18.028C25.4137 18.071 25.5779 18.1628 25.7085 18.2935C25.8391 18.4241 25.931 18.5883 25.974 18.768C25.994 18.852 26 18.984 26 19.6V24.4C26 25.016 25.992 25.148 25.972 25.234C25.929 25.4137 25.8372 25.5779 25.7065 25.7085C25.5759 25.8391 25.4117 25.931 25.232 25.974C25.148 25.994 25.016 26 24.4 26H19.6C18.984 26 18.852 25.992 18.766 25.972C18.5863 25.929 18.4221 25.8372 18.2915 25.7065C18.1609 25.5759 18.069 25.4117 18.026 25.232C18.008 25.15 18 25.018 18 24.4V19.6C18 18.984 18.006 18.852 18.028 18.766C18.071 18.5863 18.1628 18.4221 18.2935 18.2915C18.4241 18.1609 18.5883 18.069 18.768 18.026L18.766 18.028Z" fill="black"/>
</g>
</svg>

    </div>
    
    <div style={{width: 780, height: 11, left: 0, top: 888, position: 'absolute'}} /> 
    <NavLink  to="/" className="navbar-brand"  >
    <div id={styles.etech}> E-Tech</div>
</NavLink>
  <svg onClick={()=> navigate('/')} className={styles.ebrand}  width="45" height="30" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M43.5378 25.5578V14.2717L44.245 13.9002C44.7047 13.6624 44.9943 13.1909 44.9999 12.6747C45.0055 12.1598 44.7251 11.6827 44.271 11.4344L23.1189 0.172111C22.6958 -0.058732 22.184 -0.0573766 21.758 0.176264L0.72196 11.4526C0.274131 11.7009 -0.00279062 12.1724 2.12119e-05 12.6838C0.00283305 13.1952 0.285422 13.6631 0.738875 13.9066L9.98208 18.8025C9.86609 19.0061 9.79439 19.2383 9.79439 19.4888V31.3275C9.79444 31.5249 9.83643 31.72 9.9176 31.9002C9.99877 32.0803 10.1173 32.2413 10.2654 32.3726C10.5705 32.6419 13.492 35 22.4245 35C31.3254 35 34.3256 32.7713 34.6384 32.5174C34.9653 32.2523 35.1544 31.8549 35.1544 31.4338V19.2915C35.1544 19.0949 35.1129 18.9081 35.0398 18.7388L40.726 15.7497V25.5655C39.8923 26.051 39.3271 26.9415 39.3271 27.9711C39.3271 29.5164 40.5861 30.7692 42.139 30.7692C43.6918 30.7692 44.9508 29.5164 44.9508 27.9711C44.9508 26.9351 44.3778 26.0411 43.5378 25.5578ZM32.3424 30.6321C31.2374 31.161 28.3131 32.2019 22.4244 32.2019C16.4985 32.2019 13.6402 31.0938 12.6062 30.5608V20.1932L21.7362 25.0297C21.9411 25.1399 22.1704 25.1976 22.4033 25.1975C22.6302 25.1977 22.8536 25.1427 23.0543 25.0374L32.3424 20.1554V30.6321ZM22.4146 22.2135L4.33095 12.6579L22.4462 2.99683L40.6177 12.63L22.4146 22.2135Z" fill="black"/>
</svg>
    
    <div style={{width: 418, height: 59, left: 468, top: 10, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 26, fontFamily: 'Markazi text', fontWeight: '600', wordWrap: 'break-word'}}>
        لوحة التحكم
        {props?.ser === 0? '/  الرئيسية' : ''}
       {props?.ser === 1? '/ المستخدمين' : ''}
       {props?.ser === 2? '/ الدروس': ''}
       {props?.ser === 3? '/ المشاريع': ''}
       {props?.ser === 4? '/ الاجهزة': ''}
    </div>
    <div style={{width: 910, height: 0, left: 9, top: 48, position: 'absolute', border: '1px #007ACC solid'}} />
    </div>
  )
}

export default Dnavar;