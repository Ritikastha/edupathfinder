import Navbar from '../components/Navbar/Navbar';
import React from 'react';
import '../style/editProfile.css';
import '../style/bootstrap.min.css';
import editImage from '../components/Assets/edit.png';
import { createAddmissionApi} from '../api/Api'
import { getAllAddmissionApi } from '../api/Api'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link } from 'react-router-dom'

const Addmission = () => {
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [guardianPhone, setGuardianPhone] = useState()
    const [fatherOccupation, setFatherOccupation] = useState('')
    const [motherOccupation,setMotherOccupation] = useState('')
    const [nationality,setNationality] = useState('')
    const [previousSchool, setPreviousSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [image, setImage] = useState(null);
    const [addmissions, setAddmissions] = useState([]);
    const navigate=useNavigate();
    const [fatherNameError, setFatherNameError] = useState('')
    const [motherNameError, setMotherNameError] = useState('')
    const [guardianPhoneError,setGuardianPhoneError] = useState('')
    const [fatherOccupationError,setFatherOccupationError] = useState('')
    const [motherOccupationError,setMotherOccupationError] = useState('')
    const [nationalityError,setNationalityError] = useState('')
    const [previousSchoolError,setPreviousSchoolError] = useState('')
    const [gradeError,setGradeError] = useState('')
    const validate=()=>{
      let  isValid =true
      setFatherNameError('');
        setMotherNameError('');
        setGuardianPhoneError('');
        setFatherOccupationError('');
        setMotherOccupationError('');
        setNationalityError('');
        setPreviousSchoolError('');
        setGradeError('');
      
        if (!fatherName || fatherName.trim() === '') {
            setFatherNameError('Father Name is required');
            isValid = false;
        }else if (/\d/.test(fatherName)) {
            setFatherNameError('Father Name should not contain numbers');
            isValid = false;
        }
        if (!motherName || motherName.trim() === '') {
            setMotherNameError('Mother Name is required');
            isValid = false;
        }else if (/\d/.test(motherName)) {
            setMotherNameError('Mother Name should not contain numbers');
            isValid = false;
        }
        if (!guardianPhone || guardianPhone.trim() === '') {
            setGuardianPhoneError('Guardian Phone is required');
            isValid = false;
        }else if (!/^\d+$/.test(guardianPhone)) {
            setGuardianPhoneError('Guardian Phone should contain only digits');
            isValid = false;
        }
        if (!fatherOccupation || fatherOccupation.trim() === '') {
            setFatherOccupationError('Father Occupation is required');
            isValid = false;
        }
        if (!motherOccupation || motherOccupation.trim() === '') {
            setMotherOccupationError('Mother Occupation is required');
            isValid = false;
        }
        if (!nationality || nationality.trim() === '') {
            setNationalityError('Nationality is required');
            isValid = false;
        }
        if (!previousSchool || previousSchool.trim() === '') {
            setPreviousSchoolError('Previous School is required');
            isValid = false;
        }else if (/\d/.test(previousSchool)) {
            setPreviousSchoolError('Previous School should not contain numbers');
            isValid = false;
        } 
        if (!grade || grade.trim() === '') {
            setGradeError('Grade is required');
            isValid = false;
        }
    
       return isValid;
     }
  

    const changeFatherName = (e) => {
        setFatherName(e.target.value)
      }
      
      const changeMotherName = (e) => {
        setMotherName(e.target.value)
      }
  
      const changeGuardianPhone = (e) => {
        setGuardianPhone(e.target.value)
      }
      const changeNationality= (e) => {
        setNationality(e.target.value)
      }
                                                                                             
      const changeFatherOccupation = (e) => {
          setFatherOccupation(e.target.value)
      }
  
      const changeMotherOccupation= (e) => {
        setMotherOccupation(e.target.value)
      }
      const changePreviousSchool= (e) => {
        setPreviousSchool(e.target.value)
      }
      const changeGrade= (e) => {
        setGrade(e.target.value)
      }
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };
  
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        // e.preventDefault()
        const isValid=validate()
        if(!isValid){
          return 
        }
        //console.log(fatherName,motherName,fatherOccupation,motherOccupation,guardianPhone,nationality,previousSchool,grade);
    
        const formData = new FormData();
    formData.append('fatherName', fatherName);
    formData.append('motherName', motherName);
    formData.append('fatherOccupation', fatherOccupation);
    formData.append('motherOccupation', motherOccupation);
    formData.append('guardianPhone', guardianPhone);
    formData.append('nationality', nationality);
    formData.append('previousSchool', previousSchool);
    formData.append('grade', grade);
    formData.append('imageUrl', image);
    
        try {
            const res = await createAddmissionApi(formData);
            
            if (res.data.success === false) {
                toast.error(res.data.message);     
            } else {
                toast.success(res.data.message);
                navigate('/dash');
            }
        } catch (error) {
            toast.error("Server error");
            //console.log(error);
        }
    };
 
useEffect(() => {
    getAllAddmissionApi()
      .then((res) => {
        setAddmissions(res.data.Addmission);
      })
      .catch((error) => {
        console.error('Error fetching Addmissions:', error);
        toast.error('Error fetching Addmissions.Please try again later.');
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
                                <img src={editImage} alt="Edit Profile" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="edit-profile-form">
                                <div className="edit-profile-header">
                                    <h2>Admission Form</h2>
                                </div>
                                <form className='form'>
                                     <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label htmlFor="phone">Father/Guardian's Name</label>
                                                <input onChange={changeFatherName} type="text" className="form-control" id="phone" placeholder="Enter your graurian's name" />
                                                
                                                {fatherNameError && <p className='error-message-addmission'>{fatherNameError}</p> }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="age">Mother/Guardian's Name</label>
                                                <input onChange={changeMotherName}type="text" className="form-control" id="age" placeholder="Enter your graurian's name" />
                                               
                                                {motherNameError && <p className='error-message-addmission'>{motherNameError}</p> }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label htmlFor="phone">Father's Occupcation</label>
                                                {/* <input onChange={changeFatherOccupation} type="text" className="form-control" id="phone" placeholder="Enter your Father's Occupation" /> */}
                                                <select
                                                onChange={(e) => setFatherOccupation(e.target.value)}
                                                className="form-control"
                                                id="fatherOccupation"
                                            >
                                                <option value="">Select Occupation</option>
                                                <option value="Engineer">Engineer</option>
                                                <option value="Doctor">Doctor</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Business">Business man</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Government">Government officer</option>
                                                <option value="Lawyer">Lawyer</option>
                                                <option value="Service man">Service man</option>
                                                <option value="Other">Other</option>
                                            </select>
                                                {guardianPhoneError && <p className='error-message-addmission'>{guardianPhoneError}</p> }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="age">Mother's Occupation</label>
                                                {/* <input onChange={changeMotherOccupation}type="text" className="form-control" id="age" placeholder="Enter your Mother's Occupation" /> */}
                                                <select
                                                onChange={(e) => setFatherOccupation(e.target.value)}
                                                className="form-control"
                                                id="motherOccupation"
                                            >
                                                <option value="">Select Occupation</option>
                                                <option value="Engineer">Engineer</option>
                                                <option value="Doctor">Doctor</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Business">Business woman</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Government">Government officer</option>
                                                <option value="Lawyer">Lawyer</option>
                                                <option value="Service woman">Service woman</option>
                                                <option value="Housewife">Housewife</option>
                                                <option value="Other">Other</option>
                                            </select>
                                                {fatherOccupationError && <p className='error-message-addmission'>{fatherOccupationError}</p> }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label htmlFor="phone">Guardian's Phone No</label>
                                                <input onChange={changeGuardianPhone} type="tel" className="form-control" id="phone" placeholder="Enter your graurian's phone number" />
                                                {motherOccupationError && <p className='error-message-addmission'>{motherOccupationError}</p> }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="age">Nationality</label>
                                                {/* <input onChange={changeNationality}type="text" className="form-control" id="age" placeholder="Enter Your Nationality" /> */}
                                                <select
                                                onChange={(e) => setNationality(e.target.value)}
                                                className="form-control"
                                                id="nationality"
                                            >
                                                <option value="">Select Nationality</option>
                                                <option value="Nepalese">Nepalese</option>
                                                <option value="Indian">Indian</option>
                                                <option value="Chinese">Chinese</option>
                                                <option value="American">American</option>
                                                <option value="Other">Other</option>
                                            </select>
                                                {nationalityError && <p className='error-message-addmission'>{nationalityError}</p> }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label htmlFor="address">Previous School</label>
                                           
                                                <input onChange={changePreviousSchool}type="text" className="form-control" id="address" placeholder="Enter Your Previous School" />
                                                {previousSchoolError && <p className='error-message-addmission'>{previousSchoolError}</p> }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="address">Grade Appling For</label>
                                           
                                                {/* <input onChange={changeGrade}type="number" className="form-control" id="address" placeholder="Enter the grade you're appling for" />    */}
                                                <select onChange={changeGrade} className="form-control" id="grade" placeholder="Enter the grade you're appling for">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                                {gradeError && <p className='error-message-addmission'>{gradeError}</p> }                                 
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <label htmlFor="image">Previous Academic Transcipt/Records</label>
                                    <input
                    onChange={handleImageUpload}
                    name="imageUrl"
                    type="file"
                    className="form-control form-group col-md-6 "
                    placeholder="Choose file"
                  ></input>
                  </div>
                                   
                                   
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

export default Addmission;
