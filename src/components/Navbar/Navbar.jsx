import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import "../../style/Navbar.css";
import logo from '../Assets/logo.png';
import { getSingleBasicinfoApi } from '../../api/Api'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [name, setName] = useState([]);
    const { id } = useParams()

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/'); // Navigate to dash after logging out
    }

    useEffect(() => {
        //console.log('Fetching basic info for ID:', id);
        const fetchBasicInfo = async () => {
            try {
                const idCha = localStorage.getItem('userId');

                if (idCha) {
                    const res = await getSingleBasicinfoApi(id);
                    //console.log('API Response:', res);
                    if (res.data && res.data.Basicinfo) {
                        const basicinfo = res.data.Basicinfo;
                        setName(basicinfo.fullName);
                        // setAge(basicinfo.age);
                        // setPhone(basicinfo.phone);
                        // setGender(basicinfo.gender);
                        // setLevel(basicinfo.level);
                        // setAddress(basicinfo.address);
                        // setCurrentSchool(basicinfo.currentschool);
                    }
                }
            } catch (error) {
                console.error('Error fetching basic info:', error);
                toast.error('Error fetching basic info. Please try again later.');
            }
        };

        fetchBasicInfo();
    }, [id]);

    return (
        <div className="container-fluid position-relative p-0">
            <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-0 py-lg-0">
                <Link className="navbar-brand p-0" to="/dash">
                    <img src={logo} alt="Logo" style={{ maxHeight: "100px", width: "auto" }} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <NavLink className="nav-item nav-link" to="/dash" activeClassName="active">
                            Dashboard
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/event" activeClassName="active">
                            Events
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/scholarship" activeClassName="active">
                            Scholarships
                        </NavLink>
                    </div>
                    <form className="d-flex ms-auto me-2" role="search">
                        {
                            user ? (
                                <div className="dropdown">
                                    <button
                                        className=" btn-welcome dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Welcome, {name}!
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/editprofile">
                                                <i className="fas fa-user-circle text-primary me-2"></i>Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/changepassword">
                                                <i className="fas fa-update-password text-primary me-2"></i> Change Password
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button onClick={handleLogout} className="dropdown-item">
                                                <i className="fas fa-sign-out-alt text-primary me-2" ></i>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <Link className="nav-btn rounded-pill py-2 px-4" style={{ color: "white" }} to="/login">
                                        Login
                                    </Link>
                                    <Link className="nav-btn btn-hover rounded-pill py-2 px-4" style={{ backgroundColor: "#F1C31D", color: 'white' }} to="/register">
                                        Register
                                    </Link>
                                </>
                            )
                        }
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
