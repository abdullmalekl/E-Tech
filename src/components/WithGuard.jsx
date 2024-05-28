import { useSelector } from "react-redux";
import { selectFirstName } from "../state/authSlice";
import Login from "../state/login";
import { useState } from "react";
function WithGuard({children}) {
  const user = useSelector(selectFirstName);
  const token = useState(localStorage.getItem("user"));
  console.log(token[0]);
  return !user? !token[0] ? <Login navi={1} /> : children : children ;
}

export default WithGuard;