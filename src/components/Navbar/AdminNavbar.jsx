import React from 'react';
import {Link, NavLink ,useNavigate} from 'react-router-dom';
import "../../style/Navbar.css";
import "../../style/adminnav.css";
import logo from '../Assets/logo.png';

const AdminNavbar = () => {
    const user =JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const handleLogout =(e)=>{
        e.preventDefault()
        localStorage.clear()
        navigate('/login')
     }
    return (
        <div className="container-fluid position-relative p-0">
            <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
              
                <Link className="navbar-brand p-0" to="/adminsch">
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
                        <NavLink className="nav-item nav-link" to="/adminsch" activeClassName="active">
                            School
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/adminfea" activeClassName="active">
                            Features
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/adminevent" activeClassName="active">
                            Events
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/adminscholar" activeClassName="active">
                            Scholarships
                        </NavLink>
                    </div>
                    <button onClick={handleLogout} class="btn-nav" to="/logout">
                            Log Out
                          </button>
                   
                </div>
            </nav>
        </div>
    );
}

export default AdminNavbar;
