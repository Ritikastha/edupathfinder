import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
// import React from 'react';
import '../style/Navbar.css';
import '../style/editProfile.css';
import '../style/bootstrap.min.css';
import editImage from '../components/Assets/edit.png';
import { getAllBasicinfoApi } from '../api/Api'
import { getSingleBasicinfoApi } from '../api/Api'
import { getUserApi } from '../api/Api'
import { updateBasicinfoApi } from '../api/Api'
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import axios from 'axios';

const EditProfile = () => {

    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [level, setLevel] = useState()
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [currentschool, setCurrentSchool] = useState('')
    const [basicinfo, setBasicInfo] = useState([

    ]);
    const [name, setName] = useState([]);
    // const {id} = useParams()

    const id = localStorage.getItem('userId');



    // const [editableFields, setEditableFields] = useState({});

    // const changeName = (e) => {
    //     setName(e.target.value)
    //   }

    // const changePhone = (e) => {
    //     setPhone(e.target.value)
    //   }

    //   const changeAge = (e) => {
    //       setAge(e.target.value)
    //   }

    //   const changeLevel = (e) => {
    //       setLevel(e.target.value)
    //   }

    //   const changeGender = (e) => {
    //       setGender(e.target.value)
    //   }

    //   const changeAddress= (e) => {
    //     setAddress(e.target.value)
    //   }
    //   const changeCurrentSchool= (e) => {
    //     setCurrentSchool(e.target.value)
    //   }

    //   useEffect(() => {
    //     const fetchBasicInfo = async () => {
    //         try {
    //             const response = await getAllBasicinfoApi();
    //             if (response.data.success) {
    //                 setBasicInfo(response.data.Basicinfo);
    //             } else {
    //                 toast.error(response.data.message);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching basic info:', error);
    //             toast.error('Error fetching basic info. Please try again later.');
    //         }
    //     };

    //     fetchBasicInfo();
    // }, []);

    useEffect(() => {
        //console.log('Fetching basic info for ID:', id);
        const fetchBasicInfo = async () => {
            try {
                const res = await getSingleBasicinfoApi(id);
                //console.log('API Response:', res);
                if (res.data && res.data.Basicinfo) {
                    const basicinfo = res.data.Basicinfo;
                    setName(basicinfo.fullName);
                    setAge(basicinfo.age);
                    setPhone(basicinfo.phone);
                    setGender(basicinfo.gender);
                    setLevel(basicinfo.level);
                    setAddress(basicinfo.address);
                    setCurrentSchool(basicinfo.currentschool);
                } else {
                    toast.error('Basic info not found');
                }
            } catch (error) {
                console.error('Error fetching basic info:', error);
                toast.error('Error fetching basic info. Please try again later.');
            }
        };

        fetchBasicInfo();
    }, [id]);





    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name,phone,age,level,gender,address,currentschool)

        const data = {
            fullName: name,
            phone: phone,
            age: age,
            level: level,
            gender: gender,
            address: address,
            currentschool: currentschool,
            user: id
        };



        // making api call
        updateBasicinfoApi(id, data).then((res) => {
            if (res.data.success = true) {
                toast.success(res.data.message)
                NavigationPreloadManager('/editprofile')
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => {
            toast.error("Server error")
        })
    };


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
                                    <h2>Edit Profile</h2>
                                </div>
                                {/* {basicinfo.map((info) => ( */}
                                <form className='form'>


                                    <div className="form-row">
                                        {/* { name.map((item) => ( */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <div className="input-icon-wrapper">
                                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Your Name" />
                                                <i className="fas fa-edit input-icon"></i>
                                            </div>
                                        </div>
                                        {/* ))} */}

                                        <div className="form-group col-md-6">
                                            <label htmlFor="age">Age</label>
                                            <div className="input-icon-wrapper">
                                                <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="form-control " id="age" placeholder="Enter your age" />
                                                <i className="fas fa-edit input-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone">Phone Number</label>
                                            <div className="input-icon-wrapper">
                                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                                                <i className="fas fa-edit input-icon"></i>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Gender</label><br />
                                            <div className="form-check form-check-inline custom-form-check">
                                                <input onChange={(e) => setGender(e.target.value)} className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === "male"} />
                                                <label className="form-check-label" htmlFor="male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline custom-form-check">
                                                <input onChange={(e) => setGender(e.target.value)} className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === "female"} />
                                                <label className="form-check-label" htmlFor="female">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline custom-form-check">
                                                <input onChange={(e) => setGender(e.target.value)} className="form-check-input" type="radio" name="gender" id="other" value="other" checked={gender === "other"} />
                                                <label className="form-check-label" htmlFor="other">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="address">Address</label>
                                            <div className="input-icon-wrapper">
                                                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="address" placeholder="Enter your address" />
                                                <i className="fas fa-edit input-icon"></i>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="currentSchool">Current School</label>
                                            <div className="input-icon-wrapper">
                                                <input value={currentschool} onChange={(e) => setCurrentSchool(e.target.value)} type="text" className="form-control" id="currentSchool" placeholder="Enter your current school" />
                                                <i className="fas fa-edit input-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="level">Level</label>
                                            <div className="input-icon-wrapper">
                                                <select value={level} onChange={(e) => setLevel(e.target.value)} className="form-control" id="level">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                                <i className="fas fa-edit input-icon"></i>
                                            </div>
                                        </div>
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

export default EditProfile;