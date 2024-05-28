import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
// import styles from './Components.module.css';
import api from "../app/api/apiSlice";

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [waiting ,setWaiting] = useState(true);
    const navigate = useNavigate();

    const registerHandler = async(e)=>{
        e.preventDefault();
        setWaiting(false);
        const credentials = JSON.stringify({name , email , password});
        console.log(credentials);
        await api.post('/register', credentials)
        .then(({data})=>{
            setWaiting(true);
            console.log(data.data);
            navigate('/login');
            }).catch(({response})=>{
            if(response.status === 422 ){
            console.log(response.data.errors);
            }else{
            console.log(response.data);
            }
            })
        }
    return ( <div> 
        <form onSubmit={registerHandler}>
            <label htmlFor="email" >Email: </label>
            <input name="email" 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <label htmlFor="name" >Name: </label>
            <input name="name" 
            type="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />

            <label htmlFor="password" >Password: </label>
            <input name="password" 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            {waiting && <button type="submit" className="btn btn-dark">Login</button>}
            {!waiting && <button type="submit" className="btn btn-dark" disabled>Wait...</button>}
        </form>

    </div> );
}
 
export default Register;