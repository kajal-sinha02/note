import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Login = (props) => {

  let {alert , showAlert} = props ;
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({email:"" , password:""});
   
    const onchange = (e) =>{
        setCredentials ({...credentials , [e.target.name] : e.target.value})
    }
  
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
          });

          const json =await response.json() ;
          if (response.status === 400) {
            showAlert(json.error, 'danger');
          } else {
            showAlert(json.error, 'success');
          }
          if(json.success === true){
            //redirect
            localStorage.setItem('token' , json.authtoken);
            navigate('/');
            showAlert('Login successful!', 'success');
          }
         
          console.log(json);
    }
  return (
    <div>
      <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange}/>

  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"id="password" name='password' value={credentials.password} onChange={onchange}/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      </div>
    </div>
  )
}

export default Login
