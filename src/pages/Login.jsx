import { useState } from "react"
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
// import { useNavigate } from'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from "../api/Api"
// import { toast} from 'react-toastify'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/login.css'
const Login =()=>{
    const [action,setAction]=useState("Login");
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

      // use state(setting error message)
  const [emailError, setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')
 
  const validate=()=>{
    let  isValid =true;
 
     setEmailError('');
     setPasswordError('');
 
     if(email.trim()===""){
       setEmailError("Email is required");
       isValid=false;
     }
     if(password.trim()===""){
       setPasswordError("Password is required");
       isValid=false;
     }
     return isValid;
   }
 
   const navigate = useNavigate();
 
   const handleSubmit=(e)=>
   {
     e.preventDefault();
     const isValid=validate()
     if(!isValid){
       return ;
     }
     console.log(email,password)
 
     const data ={
       email:email,
       password:password
     }
    
     loginUserApi(data).then((res)=>{
       if(res.data.success==false){
         toast.error(res.data.message)
         if (res.data.passwordExpired) {
          navigate('/changepassword'); // Navigate to the change password page
          return; // Ensure no further processing is done
      }
       }else{
         toast.success(res.data.message)
         // set token and user data in local storage
         localStorage.setItem('token',res.data.token)
         // set user data
         const jsonDecode=JSON.stringify(res.data.userData)
         localStorage.setItem('user',jsonDecode)
       }if (res.data.userData.isAdmin === true) {
         window.location.replace('/adminsch');
       } else {
        //  window.location.replace('/dash');
        navigate('/dash');
       }
     }).catch(err =>{
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
    } else {
        toast.error("Server Error");
    }
    console.log(err.message);
});
 }
    return (
      <div className='container-top'>
        <div className="container-btw-login">
        <div className="container-img-login"></div>
    <div className='container-login'>
          <div className="header-login">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>  
          <div className="inputs-login">
            <div className="input-container">
              <img src={email_icon} alt="" />
              <input  onChange={(e)=> setEmail(e.target.value)} type="email"placeholder='Email'/>
              {
                emailError && <p className='error-message'>{emailError}</p>
              }
            </div>
            <div className="input-container">
              <img src={password_icon} alt="" />
              <input  onChange={(e)=> setPasword(e.target.value)} type="password" placeholder='Password' />
               {
                passwordError && <p className='error-message'>{passwordError}</p>
              }
            </div>
            {/* <p className="forgot-password-login">Lost password? <span>Click Here</span></p> */}
            
          </div>
          <div className="submit-container">
            {/* <div  className={action==="Sign Up"?"submit gray":"submit"}>Login</div> */}
            <div onClick={handleSubmit} className={action==="Sign Up"?"submit gray":"submit"}>Login</div>
          </div>
          <p className="create-account-login">Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
        {/* <div className="container-img-login"></div> */}
        </div>
        </div>
      )
}
export default Login;

  