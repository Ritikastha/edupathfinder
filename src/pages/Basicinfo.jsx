import Navbar from '../components/Navbar/Navbar';
import React from 'react';
import '../style/Navbar.css';
import '../style/editProfile.css';
import '../style/bootstrap.min.css';
import editImage from '../components/Assets/edit.png';
import { createBasicinfoApi} from '../api/Api'
import { getAllBasicinfoApi } from '../api/Api'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axios from 'axios';

const BasicInfo = () => {
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [level, setLevel] = useState()
    const [gender, setGender] = useState('')
    const [address,setAddress] = useState('')
    const [currentschool,setCurrentSchool] = useState('')
    const [fullName, setFullName] = useState('');
    const [basicinfo, setBasicInfo] = useState([]);
    const navigate=useNavigate();
    const [phoneError, setPhoneError] = useState('')
    const [ageError, setAgeError] = useState('')
    const [levelError,setLevelError] = useState('')
    const [genderError,setGenderError] = useState('')
    const [addressError,setAddressError] = useState('')
    const [currentSchoolError,setCurrentSchoolError] = useState('')
    const validate=()=>{
        let  isValid =true
        setPhoneError('');
        setAgeError('');
        setLevelError('');
        setGenderError('');
        setAddressError('');
        setCurrentSchoolError('');
        
          if (!phone || phone.trim() === '') {
            setPhoneError('Phone is required');
              isValid = false;
          }
          if (!age || age.trim() === '') {
            setAgeError('Age is required');
              isValid = false;
          }
          if (!level || level.trim() === '') {
            setLevelError('Level is required');
              isValid = false;
          }
          if (!gender || gender.trim() === '') {
            setGenderError('Gender is required');
              isValid = false;
          }
          if (!address || address.trim() === '') {
            setAddressError('Address is required');
              isValid = false;
          }
          if (!currentschool || currentschool.trim() === '') {
            setCurrentSchoolError('current school is required');
              isValid = false;
          }
         return isValid;
       }

    const changePhone = (e) => {
        setPhone(e.target.value)
      }
      
      const changeAge = (e) => {
          setAge(e.target.value)
      }
  
      const changeLevel = (e) => {
          setLevel(e.target.value)
      }
                                                                                             
      const changeGender = (e) => {
          setGender(e.target.value)
      }
  
      const changeAddress= (e) => {
        setAddress(e.target.value)
      }
      const changeCurrentSchool= (e) => {
        setCurrentSchool(e.target.value)
      }
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
    
        console.log(phone,age, level,gender,address,currentschool);
    
        const formData = new FormData();
    formData.append("phone", phone);
    formData.append("age", age);
    formData.append("level", level);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("currentschool", currentschool);
 
        try {
            const token = localStorage.getItem('token');
            const res = await createBasicinfoApi(formData,token);
      
            if (res.data.status && res.data.status.success === false) {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
            }
          } catch (error) {
            toast.error("Server error");
            console.log("Error response from server:", error.response);
          }
      
        };
 
useEffect(() => {
    getAllBasicinfoApi()
      .then((res) => {
        setBasicInfo(res.data.Basicinfo);
      })
      .catch((error) => {
        console.error('Error fetching Basicinfo:', error);
        toast.error('Error fetching Basicinfo.Please try again later.');
      });
  }, []);
         
    return (
        <div>
            <Navbar />
            <div className="container-dash-fluid position-relative p-0">
                <div className="container-dash-fluid ">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="edit-profile-picture">
                                <img src={editImage} alt="Edit Profile"className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="edit-profile-form">
                                <div className="edit-profile-header">
                                    <h2>Basic Information</h2>
                                </div>
                                <form className='form'>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label htmlFor="phone">Phone Number</label>
                                                <input onChange={changePhone} type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                                                {phoneError && <p className='error-message-addmission'>{phoneError}</p> }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="age">Age</label>
                                                <input onChange={changeAge}type="number" className="form-control" id="age" placeholder="Enter your age" />
                                                {ageError && <p className='error-message-addmission'>{ageError}</p> }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label htmlFor="level">Level</label>
                                           
                                                <select onChange={changeLevel} className="form-control" id="level">
                                                <option value="">Select Level</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                                {levelError && <p className='error-message-addmission'>{levelError}</p> }
                                               
                                        </div>
                                        <div className="form-group col-md-6">
                                        <label>Gender</label><br />
                                            <div className="form-check form-check-inline custom-form-check">
                                                <input onChange={changeGender} className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === 'male'} />
                                                <label className="form-check-label" htmlFor="male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline custom-form-check">
                                                <input onChange={changeGender} className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === 'female'} />
                                                <label className="form-check-label" htmlFor="female">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline custom-form-check">
                                                <input onChange={changeGender} className="form-check-input" type="radio" name="gender" id="other" value="other" checked={gender === 'other'} />
                                                <label className="form-check-label" htmlFor="other">Other</label>
                                            </div>
                                            {genderError && <p className='error-message-addmission'>{genderError}</p> }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="address">Address</label>
                                           
                                                <input onChange={changeAddress}type="text" className="form-control" id="address" placeholder="Enter your address" />
                                                {addressError && <p className='error-message-addmission'>{addressError}</p> }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="currentSchool">Current School</label>
                                            
                                                <input onChange={changeCurrentSchool}type="text" className="form-control" id="currentSchool" placeholder="Enter your current school" />
                                                {currentSchoolError && <p className='error-message-addmission'>{currentSchoolError}</p> }
                                        </div>
                                    </div>
                                    {/* <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="level">Level</label>
                                           
                                                <select className="form-control" id="level">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                               
                                        </div>
                                    </div> */}
                                    <button onClick={handleSubmit} type="submit" className="btn-save">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInfo;
