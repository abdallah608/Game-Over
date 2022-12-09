import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import IMAGES from'../../imgs/index.js'


export default function Register() {
const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    'first_name':'',
    'last_name':'',
    'age':'',
    'email':'',
    'password':'',
  })
const [errorList, setErrorList] = useState([])
let validateFormData=()=>{
  const schema = Joi.object({
    first_name:Joi.string().alphanum().required().min(3).max(15).messages({
      "string.empty": "First Name is required",
      "string.min": "You have enter at least 3 characters",
    }),
    last_name:Joi.string().alphanum().required().min(3).max(15).messages({
      "string.empty": "Last Name is required",
      "string.min": "You have enter at least 3 characters",
    }),
    age:Joi.number().required().min(15).max(80).messages({
      "string.empty": "Age is required",
      "string.min": "You have enter your age",
    }),
    email:Joi.string().required().email({tlds:{allow:['com','net']}}).messages({
        "string.empty": "Email is required",
      "string.min": "You have enter your Email",
    }),
    password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)).messages({
      "string.empty": "Password is required",
      "string.min": "Minimum 8 characters",
    })
  })
  return schema.validate(user,{abortEarly:false})
}
  let navigate=useNavigate();
  let goToLogin=()=>{
    navigate('/login')
  };

  const [errorMsg, setErrorMsg] = useState('')

  let  submitFormData=async (e)=>{
    setLoading(false)
    e.preventDefault();
    let validationResponse=validateFormData();
    if(validationResponse.error){
      setErrorList(validationResponse.error.details)
    }
    else{

        let {data}=  await axios.post("https://sticky-note-fe.vercel.app/signup" , user)
      // console.log(data);
      setLoading(true);
 
      if(data.message=="success"){
        setLoading(false);
        goToLogin()
      }else{
        setLoading(false);
        setErrorMsg(data.message)
        
      };
    }
}


  let getInputData=(e)=>{
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    // console.log(myUser);
  }


  return (
    <>
          <Helmet>
         <meta charSet="utf-8" />
        <title>Register</title>
      
      </Helmet>
      <div className="row bg-dark mt-5 rounded-2">
        <div className="col-md-6  bg-game">
        </div>
        <div className="col-md-6 ">
        <div className="ms-3">
        <div className=' w-75 m-auto my-5'>
        <div className="text-center">
        <img className='w-25 ' src={IMAGES.Logo}  alt=""  />
     <h5 className='pt-4 fw-bolder'>Log in to GameOver </h5>
    
        </div>

{errorList.map((err,index)=><div key={index} className='alert alert-danger p-2'>{err.message}</div>)}

{errorMsg?<div className='alert alert-danger p-2'>{errorMsg}</div>:null}


</div>
<form className='pb-3' onSubmit={submitFormData}>
<div className="mb-2  d-flex">
   <input onChange={getInputData} type="text" className="form-control w-50 me-3" name='first_name' placeholder="Enter your first name" />
   <input onChange={getInputData} type="text" className="form-control w-50" name='last_name' placeholder="Enter your last name" />
   
</div>


<div className="mb-3 pt-3">
   <input onChange={getInputData} type="number" className="form-control" name='age' placeholder="Your Age expamle'23" />

</div>
<div className="mb-3 pt-3">
   <input onChange={getInputData} type="email" className="form-control" name='email' placeholder="Email :name@example.com" />
</div>
<div className="mb-3 pt-3">
   <input onChange={getInputData} type="password" className="form-control" name='password' placeholder="Password :Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character" />
</div>
 
 <button className='btn btn-secondary mt-3 w-100'> {loading?`Register`:<i className='fas fa-spinner fa-spin'></i>}</button>
 
</form>
<div className="text-center pt-4 border-top border-secondary">
 
          <h6 className='pt-3'>Already a member?<Link className="text-decoration-none"  to="/login">Log In</Link></h6>        
    </div>
        </div>

        </div>
      </div>
    </>
    )
}
