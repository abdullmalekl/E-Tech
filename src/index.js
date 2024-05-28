import React , {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from "react-router-dom";
import Index from './pages';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { Provider } from "react-redux";
import store from './state';
import WithGuard from './components/WithGuard';
import Login from "./state/login";
import Register from "./state/Register";
// import Me from "./state/me";
import './index.css';
// import App from './App';
import Lessons from './pages/Lessons';
import Projects from './pages/Projects';
import Chat from './pages/Chat';

import Devices from './components/dashboard/d-devices';
// import Home from './components/dashboard/d-home';
// dashboard pages
import Dlessons from './components/dashboard/d-lessons';
import Dprojects from './components/dashboard/d-projects';
import Dusers from './components/dashboard/d-users';
//  profile page
import Profile from './pages/profile';
// to add lesson or project
import Flessons from './components/Froala/lessons';
import Fprojects from './components/Froala/projects';
// this for cloud pages
import Enviroment from './pages/cloudPages/enviroment';
import CProjects from './pages/cloudPages/Cprojects';
import CDevices from './pages/cloudPages/CDevices';
import Csensors from './pages/cloudPages/Csensors';
// lesson parts
import Part2 from './components/Froala/lesson_parts/part2';
import Part3 from './components/Froala/lesson_parts/part3';
import Part4 from './components/Froala/lesson_parts/part4';
import Part5 from './components/Froala/lesson_parts/part5';
// project parts
import ProjectPart2 from './components/Froala/prject_parts/part2';
import ProjectPart3 from './components/Froala/prject_parts/part3';
import ProjectPart4 from './components/Froala/prject_parts/part4';
import ProjectPart5 from './components/Froala/prject_parts/part5';
// show lessons & projects
import Lpart1 from './pages/lessonsShow/lessonParts/Lpart1';
import Lpart2 from './pages/lessonsShow/lessonParts/Lpart2';
import Lpart3 from './pages/lessonsShow/lessonParts/Lpart3';
import Lpart4 from './pages/lessonsShow/lessonParts/Lpart4';
import Lpart5 from './pages/lessonsShow/lessonParts/Lpart5';
import Ppart1 from './pages/lessonsShow/projectParts/Ppart1';
import Ppart2 from './pages/lessonsShow/projectParts/Ppart2';
import Ppart3 from './pages/lessonsShow/projectParts/Ppart3';
import Ppart4 from './pages/lessonsShow/projectParts/Ppart4';
import Ppart5 from './pages/lessonsShow/projectParts/Ppart5';
import OwnerGuard from './components/ownerGuard';
 const router = createHashRouter([{
   path: "/",  // thats the element will show in entire life time the app
   errorElement:<ErrorPage/>, // we will redirect to this page when call page not found or any error
   children: [
     {index:true , element: <Index/> }, // mean the path we will go when we stand on root (index) = true
     {path: "/lessons" , element: <Lessons/>}, 
     {path: "/projects" ,element: <Projects />},
     {path: "/register" ,element: <Register/>},
     {path: "/login" ,element: <Login/>},
     {path: "/Dashboard/lessons" ,element: <WithGuard><Dlessons/></WithGuard>},
     {path: "/cloud/devEnviroment" ,element: <WithGuard><Enviroment/></WithGuard>},
     {path: "/cloud/projects" ,element: <WithGuard><CProjects/></WithGuard>},
     {path: "/cloud/devices" ,element: <WithGuard><CDevices/></WithGuard>},
     {path: "/cloud/sensors" ,element: <WithGuard><Csensors/></WithGuard>},
     {path: "/Dashboard/projects" ,element: <OwnerGuard><Dprojects/></OwnerGuard>},
     {path: "/Dashboard/devices" ,element: <OwnerGuard><Devices/></OwnerGuard> },
     {path: "/Dashboard/users" ,element: <OwnerGuard><Dusers/></OwnerGuard>},
     {path: "/Dashboard/lessons/manager" ,element: <OwnerGuard><Flessons/></OwnerGuard>},
     {path: "/Dashboard/projects/manager" ,element: <OwnerGuard><Fprojects/></OwnerGuard>},
     {path: "/Dashboard/lessons/2" ,element: <OwnerGuard><Part2/></OwnerGuard>},
     {path: "/Dashboard/lessons/3" ,element: <OwnerGuard><Part3/></OwnerGuard>},
     {path: "/Dashboard/lessons/4" ,element: <OwnerGuard><Part4/></OwnerGuard>},
     {path: "/Dashboard/lessons/5" ,element: <OwnerGuard><Part5/></OwnerGuard>},
     {path: "/Dashboard/projects/2" ,element: <OwnerGuard><ProjectPart2/></OwnerGuard>},
     {path: "/Dashboard/projects/3" ,element: <OwnerGuard><ProjectPart3/></OwnerGuard>},
     {path: "/Dashboard/projects/4" ,element: <OwnerGuard><ProjectPart4/></OwnerGuard>},
     {path: "/Dashboard/projects/5" ,element: <OwnerGuard><ProjectPart5/></OwnerGuard>},
     {path: "/lessons/contents/part1" ,element: <Lpart1/>},
     {path: "/lessons/contents/part2" ,element: <Lpart2/>},
     {path: "/lessons/contents/part3" ,element: <Lpart3/>},
     {path: "/lessons/contents/part4" ,element: <Lpart4/>},
     {path: "/lessons/contents/part5" ,element: <Lpart5/>},
     {path: "/projects/contents/part1" ,element: <Ppart1/>},
     {path: "/projects/contents/part2" ,element: <Ppart2/>},
     {path: "/projects/contents/part3" ,element: <Ppart3/>},
     {path: "/projects/contents/part4" ,element: <Ppart4/>},
     {path: "/projects/contents/part5" ,element: <Ppart5/>},
     {path: "/profile" ,element: <WithGuard><Profile /></WithGuard>},

     {path: "/chat" , 
     element: 
     // we use suspense to wait the page to loading , u can use fall back to add loading icon
    <Suspense fallback="please loading.."> 
      <WithGuard><Chat /></WithGuard>
      </Suspense>},
   ],
 },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Provider store={store}>
   {/* RouterProvider control the route based on router we take in url to start render it */}
   <RouterProvider router={router} />
   </Provider>
);