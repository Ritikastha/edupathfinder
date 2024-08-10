import { useState } from "react"
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
import { useNavigate } from 'react-router-dom';
import { updateUserApi } from "../api/Api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/login.css'
const ChangePassword =()=>{
    const [action,setAction]=useState("Login");
    const [previousPassword, setPreviousPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    // const [password, setPasword] = useState('')
    const [email, setEmail] = useState('');

  const [passwordError,setPasswordError] = useState('')
 
  const validate=()=>{
    let  isValid =true;
 
     setPasswordError('');
 
     if (!email.trim()) {
        setPasswordError("Email is required");
        isValid = false;
    } else if (!previousPassword.trim()) {
        setPasswordError("Current password is required");
        isValid = false;
    } else if (!newPassword.trim()) {
        setPasswordError("New password is required");
        isValid = false;
    }
     return isValid;
   }
 
   const navigate = useNavigate();
 
   const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
        return;
    }

     try {
        const response = await updateUserApi({ email, oldPassword:previousPassword, newPassword });

        if (response.success) {
            toast.success('Password updated successfully');
            navigate('/login'); // Redirect to login page after successful update
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error('An error occurred while updating the password');
    }
};
     

 
     return (
        <div className='container-top'>
            <div className="container-btw-login">
                <div className="container-img-login"></div>
                <div className='container-login'>
                    <div className="header-login">
                        <div className="text">Change Password</div>
                        <div className="underline"></div>
                    </div>  
                    <div className="inputs-login">
                        <div className="input-container">
                            <img src={email_icon} alt="Email" />
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder='Email'
                            />
                        </div>
                        <div className="input-container">
                            <img src={password_icon} alt="Current Password" />
                            <input
                                onChange={(e) => setPreviousPassword(e.target.value)}
                                type="password"
                                placeholder='Current Password'
                            />
                        </div>
                        <div className="input-container">
                            <img src={password_icon} alt="New Password" />
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                placeholder='New Password'
                            />
                        </div>
                        {
                            passwordError && <p className='error-message'>{passwordError}</p>
                        }
                    </div>
                    <div className="submit-container">
                        <div
                            onClick={handleSubmit}
                            className="submit"
                        >
                            Update
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChangePassword;