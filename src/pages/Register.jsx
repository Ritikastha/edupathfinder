// import React from 'react'
import React, {useState} from 'react'
import person_icon from '../components/Assets/person.png'
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
import '../style/register.css'
import '../index.css'
import { toast } from 'react-toastify'
import { createUserApi } from '../api/Api'
import { useNavigate } from'react-router-dom'

const Register = () => {
  const [action,setAction]=useState("Sign Up");
  const [fullName, setFullName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [fullnameError, setFullNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const [confirmpasswordError,setConfirmPasswordError] = useState('')
  const validate=()=>{
    let  isValid =true
     setFullNameError('')
     setEmailError('')
     setPasswordError('')
     setConfirmPasswordError('')

     if(fullName.trim()===""){
      setFullNameError("Full Name is required")
      isValid=false
    } else if (/^\d+$/.test(fullName)) { // Check if fullName contains only numbers
      setFullNameError("Full Name cannot contain numbers");
      isValid = false;
  }
     if(email.trim()===""){
       setEmailError("Email is required")
       isValid=false
     }else if (!/\S+@\S+\.\S+/.test(email)) { // Check if email is in valid format
      setEmailError("Email is not valid");
      isValid = false;
  }
     if(password.trim()===""){
       setPasswordError("Password is required")
       isValid=false
     }else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      isValid = false;
  }
  if (confirmpassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
  } else if (confirmpassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
  }
     return isValid
   }

  const changeFullName = (e) => {
    setFullName(e.target.value)
  }

  // const changeLastname = (e) => {
  //   setLastName(e.target.value)
  // }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid=validate()
    if(!isValid){
      return 
    }
    console.log(fullName, email, password,confirmpassword)

    const data = {
        fullName : fullName,
        // lastName : lastName,
        email : email,
        password : password,
        confirmpassword:confirmpassword
      }

      createUserApi(data).then((res) => {
        if(res.data.success == false){
          toast.error(res.data.message)
        } else {
          toast.success(res.data.message)
          navigate('/basicinfo',{state : {message : "Ritika"}})
        }
      }).catch(err => {
        toast.error("Server Error")
        console.log(err.message)
      })
    }


  return (
    <div className='container-top'>
      <div className='container-register-btw'>
      <div className='container-img-login'></div>
    <div className='container-login'>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
         
          <div className="inputs">
            <div className="input">
              <img src={person_icon} alt="" />
              <input onChange={(e)=> setFullName(e.target.value)} type="text" placeholder='Full Name' />
              {
                fullnameError && <p className='error-message-register'>{fullnameError}</p>
              }
            </div>
            {/* <div className="input">
              <img src={person_icon} alt="" />
              <input onChange={changeLastname}  type="text" placeholder='last name' />
            </div> */}
            <div className="input">
              <img src={email_icon} alt="" />
              <input  onChange={(e)=> setEmail(e.target.value)} type="email"placeholder='Email'/>
              {
                emailError && <p className='error-message-register'>{emailError}</p>
              }
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input  onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' />
               {
                passwordError && <p className='error-message-register'>{passwordError}</p>
              }
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input  onChange={(e)=> setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' />
              {
                confirmpasswordError && <p className='error-message-register'>{confirmpasswordError}</p>
              }
            </div>
            {/* <div className="forgot-password">Lost password? <span>Click Here</span></div> */}
          </div>
          <div className="submit-container">
        
            <div onClick={handleSubmit} className={action==="Click"?"submit gray":"submit"}>Sign Up</div>
            
            
          </div>
          <p className="create-account-login">Already have an account? <a href="/login">Sign In</a></p>
    
    
        </div>
        
        </div>
        </div>

      );
    }
export default Register
  