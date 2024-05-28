import styles from './App.module.css';
import main from './images/main menu.png';
// import lesson from './images/lesson-icon--transformed.png';
// import Footer from './Bars/footertTemp';
// import projects1 from './images/projects icon 1.png';
import { Fragment } from 'react';
// import Navbar from './Bars/navbarTemp';


function App() {
  return (
 <Fragment>
     <div style={{width: '100%', height: '100%', position: 'relative',top:2, background: 'white'}}>
   
   <img style={{width: 1193, height: 600, left: 0, top: 72, position: 'absolute'}} src={main} />
   <div style={{width: 443, height: 35, left: 70, top: 392, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Lemonada', fontWeight: '400', wordWrap: 'break-word'}}>أول منصة عربية لدعم مشاريع انترنت الأشياء</div>
   <div style={{width: 471, height: 35, left: 42, top: 452, position: 'absolute', textAlign: 'right', color: 'white', fontSize: 18, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>منصة التعليمية تقدم دروساً مفيدة في مجال انترنت الأشياء وتقدم ايضاً شروح لمشاريع جاهزة  مع توفير سحابة لأدارة الأجهزة والحساسات</div>
   <div style={{width: 110, paddingTop: 3.31, paddingBottom: 17.87, paddingLeft: 41.33, paddingRight: 42.73, left: 102, top: 534, position: 'absolute', background: '#D9D9D9', boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.25)', borderRadius: 30.92, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
       <div style={{width: 83.94, height: 29.82, color: 'black', fontSize: 30.92, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}} >الدروس</div>
   </div>
   <div style={{width: 110, height: 32, paddingTop: 10, paddingBottom: 8.97, paddingLeft: 41, paddingRight: 42.06, left: 356, top: 534, position: 'absolute', background: '#2AABEE' , boxShadow: '8px 8px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30.92, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
       <div style={{top: 4, position: 'absolute' ,width: 83.94, height: 32.03, color: 'white', fontSize: 30.92, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>السحابة</div>
   </div>

   <div style={{width: 216, height: 78, left: 466, top: 688, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 44, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>اقسام المنصة</div>
   {/* box of lessons */}
   <div style={{width: 314, height: 288, left: 838, top: 790, position: 'absolute', background: 'rgba(217, 217, 217, 0.64)', boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 14}}></div>
   <div style={{width: 110,paddingTop: 2, paddingBottom: 10, paddingLeft: 11, left: 938, top: 1020, position: 'absolute', background: '#2AABEE', boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30.92, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
       <div style={{position: 'relative', top: 5, left: 12, width: 191, height: 30, color: 'white', fontSize: 20, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>ابدأ التعلم</div>
   </div>
   <div style={{width: 314, height: 288, left: 50, top: 790, position: 'absolute', background: 'rgba(217, 217, 217, 0.64)', boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 14}}></div>
   <div style={{width: 160, height: 140, left: 134, top: 820, position: 'absolute'}}>
   <svg width="140" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
 <g id="mdi:cloud-cog-outline" clip-path="url(#clip0_163_48)">
   <path id="Vector" d="M80 102.917C80 104.758 80.2 106.546 80.5333 108.333H43.3333C33.3333 108.333 24.6 105.625 17.4 99.8292C10.2667 94.1417 6.66666 87.1542 6.66666 78.975C6.66666 71.9334 9.26666 65.65 14.4667 60.125C19.6667 54.6 26.6667 51.0792 35 49.5625C37.8 41.275 43.3333 34.5584 51.6667 29.4125C60 24.2667 69.4667 21.6667 80 21.6667C93 21.6667 104 25.35 113.067 32.7167C122.133 40.0834 126.667 49.0209 126.667 59.5834C134.333 60.2875 140.667 62.9959 145.733 67.7084C146.133 67.9792 146.4 68.4125 146.667 68.7375C140.667 66.3542 133.867 65 126.667 65C122.067 65 117.533 65.5959 113.333 66.5709V59.5834C113.333 52.1084 110 45.7167 103.6 40.4084C97.0667 35.2084 89.2 32.5 80 32.5C70.8 32.5 62.9333 35.2084 56.4 40.4084C50 45.7167 46.6667 52.1084 46.6667 59.5834H43.3333C36.8667 59.5834 31.4 61.425 26.8667 65.1625C22.2667 68.8459 20 73.2875 20 78.5417C20 83.7959 22.2667 88.2375 26.8667 92.0834C31.4 95.6584 36.8667 97.5 43.3333 97.5H80.5333C80.2 99.2875 80 101.075 80 102.917ZM158.867 111.8L152.2 121.171C151.733 121.875 150.867 121.875 150 121.875L141.8 119.167C140 120.142 138.2 121.008 136.2 121.713L134.933 128.863C134.8 129.513 134.067 130 133.333 130H120C119.067 130 118.4 129.513 118.267 128.863L117 121.713C114.933 121.063 113.067 120.142 111.333 119.167L103.067 121.875C102.267 121.875 101.4 121.875 101 121.171L94.3333 111.8C94.1472 111.517 94.0853 111.191 94.1581 110.876C94.2308 110.561 94.4337 110.275 94.7333 110.067L101.8 105.625C101.534 103.826 101.534 102.007 101.8 100.208L94.7333 95.7667C94.4205 95.5656 94.2077 95.2794 94.1342 94.9608C94.0607 94.6423 94.1314 94.3129 94.3333 94.0334L101 84.6625C101.467 83.9584 102.333 83.9584 103.067 83.9584L111.333 86.6667C113.067 85.6917 115 84.825 117 84.1209L118.267 76.9709C118.345 76.646 118.562 76.3539 118.879 76.1458C119.196 75.9378 119.593 75.8272 120 75.8334H133.333C134.067 75.8334 134.8 76.3209 134.867 76.9709L136.133 84.1209C138.2 84.7709 140 85.6917 141.8 86.6667L150 83.9584C150.867 83.9584 151.733 83.9584 152.133 84.6625L158.8 94.0334C159.2 94.6292 159 95.3334 158.4 95.7667L151.333 100.208C151.533 101.129 151.6 101.996 151.6 102.917C151.6 103.838 151.467 104.704 151.333 105.625L158.467 110.067C159.067 110.5 159.267 111.204 158.867 111.8ZM136.667 102.917C136.667 98.4209 132.133 94.7917 126.667 94.7917C121.2 94.7917 116.667 98.4209 116.667 102.917C116.667 107.413 121.067 111.042 126.667 111.042C132.267 111.042 136.667 107.413 136.667 102.917Z" fill="black"/>
 </g>
     <defs>
         <clipPath id="clip0_163_48">
         <rect width="160" height="130" fill="white"/>
         </clipPath>
       </defs>
   </svg>
   </div>
   
   <div style={{width: 314, height: 288, left: 444, top: 790, position: 'absolute', background: 'rgba(217, 217, 217, 0.64)', boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 14}}></div>
   <div style={{width: 110,paddingTop: 2, paddingBottom: 10, paddingLeft: 11, left: 544, top: 1020, position: 'absolute', background: '#2AABEE', boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30.92, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
       <div style={{position: 'relative', top: 5,left: 4,width: 191, height: 30, color: 'white', fontSize: 20, fontFamily: 'Markazi Text', fontWeight: '700', wordWrap: 'break-word'}}>استكشف الآن</div>
   </div>
   {/* <img style={{width: 149.63, height: 120, left: 528, top: 820, position: 'absolute'}} src={projects1}/> */}
   <img style={{width: 200, height: 200, left: 900, top: 780, position: 'absolute'}} src={lesson} />
   <div style={{width: 300, left: 844, top: 960, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 22, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>شروحات ودروس للبدء في مجال انترنت الاشياء</div>
   <div style={{width: 317, height: 62, left: 441, top: 960, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 22, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>شروحات وتطبيقات لتنفيد مشاريع انترنت الاشياء</div>
   <div style={{width: 317, height: 62, left: 52, top: 960, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 22, fontFamily: 'Markazi Text', fontWeight: '400', wordWrap: 'break-word'}}>نوفر لكم سحابة لربط وادارة الأجهزة عبر الانترنت</div>
   <div style={{width: 166, height: 0, left: 507, top: 748, position: 'absolute', borderRadius: 12, border: '1.7px #2AABEE solid'}}></div>
</div>
<div>
<Footer />

</div>
   <Navbar />
 </Fragment>
  );
}

export default App;
{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */}
