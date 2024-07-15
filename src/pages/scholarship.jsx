import '../style/scholar.css'
import '../style/Navbar.css'
import '../style/bootstrap.min.css'
import Navbar from '../components/Navbar/Navbar';
import React, { useState, useEffect } from "react";
// import { createSchooApi, deletedSchoolApi, getAllSchoolApi} from '../api/Api'
import { getAllScholarApi } from '../api/Api';
import { toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";

const Scholarship = () => {
    // const [schools, setSchools] = useState([]);
    // const [imageData, setImageData] = useState(null);
    const [scholarPackage, setScholarPackage] = useState([]);
    const navigate = useNavigate();



  // Events Api Use Effect
    useEffect(() => {
        getAllScholarApi()
        .then((res) => {
            setScholarPackage(res.data.Scholar);
        })
        .catch((error) => {
          console.error('Error fetching scholarships:', error);
          toast.error('Error fetching scholarships. Please try again later.');
        });
    }, []);

    // const handleSubmit = (scholar,school,level,duedate,examdate,examtime) => {
    //     const scholarData = { scholar,school,level,duedate,examdate,examtime};
    //     navigate('/scholar', { state: scholarData });
    //   };

      const handleSubmit = (scholar,school,level,duedate,examdate,examtime) => {
      
        setTimeout(() => {
            toast.success('Applied for scholarship successfully!');
            navigate('/scholarship', { state: { scholar,school,level,duedate,examdate,examtime } });
        }, 1000); // Example: Simulated delay for demonstration
    };


  return (
      <div>
         {/* <Navbar/> */}
    <div className="container-dash-fluid position-relative p-0">
    <Navbar/>
        <div className="container-dash-fluid bg-primary py-5 mb-5 hero-header-coln">
            {/* <div className="containerr py-5">
                <div className="row justify-content-center py-5">
                    <div className="col-lg-10 text-right">
                        <h2 className="text-white mb-3 ">FIND THE SCHOOL</h2>
                        <h1 className="text-white mb-3 ">THAT FITS YOU THE BEST</h1>
                        <p className="fs-4 text-white mb-4 ">Finding the right school shouldn’t be hard. From K‑12 to <br></br>college to grad school, we make it easy to discover and <br></br>connect with the best ones for you.</p> 
                    </div>
                </div>
            </div> */}
        </div>
        <div className="container-dash-fluid bg-primary py-5 mb-5 hero-header-coln-2">
            <div className="container-descrip py-5">
                <div className="row justify-content-start py-5">
                    {/* <div className="col-lg-5 d-flex flex-column justify-content-center align-items-start text-left"> */}
                        {/* <h2 className="text-black mb-3 ">Scholarships for every bright students</h2> */}
                        
                    {/* </div> */}
                </div>
            </div>
        </div>
        <div className="grey-background">
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="section-title text-center text-primary px-3">Scholarships</h1>
            {/* <h4 className="mb-1 ms-4 text-start">Top Rated School</h4> */}
          </div>
          <div className="scroll-container-coln">
          <div className="scroll-content-coln">
         
          {scholarPackage && scholarPackage.length > 0 ? (
            scholarPackage.map((scholarData, index) => (
              <div key={index} className="scroll-item-coln">
                 {/* <div className="box-container-coln"> */}
               {/* <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`0.${index}s`}> */}
                {/* <div className="col"> */}
                  {/* <div className="overflow-hidden"> */}
                   
                  {/* </div> */}
                    {/* <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small> */}
                    <img className="img-fluid" src={scholarData.imageUrl} alt='' />
                <div className="text-content">
                  <h5 className=" mb-0 py-2">Discount up Rs.{scholarData.scholar}</h5>
                  <small className="flex-fill text-start py-2">
                    <i className="fa fa-school text-primary me-2"></i>School of Study -{scholarData.school}
                  </small>
                  {/* <div className="d-flex justify-content-between apply-button text-end"> */}
                  <small className="flex-fill text-start py-2">
                    <i className="fa fa-hourglass text-primary me-2"></i>Level -{scholarData.level}
                  </small>
                      {/* <a onClick={() => handleSubmit(scholarData.scholar, scholarData.school, scholarData.level,scholarData.duedate,scholarData.examdate,scholarData.examtime)} href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: "30px 30px 30px 30px" }}>Apply</a> */}
                  {/* </div> */}
                  <small className="flex-fill text-start py-2">
                    <i className="fa fa-calendar text-primary me-2"></i>Due Date -{new Date(scholarData.duedate).toLocaleDateString()}
                  </small>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="flex-fill text-start py-2">
                      <i className="fa fa-calendar text-primary me-2"></i>Exam Date -{new Date(scholarData.examdate).toLocaleDateString()}
                    </small>
                    <small className="flex-fill text-start py-2">
                      <i className="fa fa-clock text-primary me-2"></i>Exam Time-{scholarData.examtime}
                    </small>
                  </div>
                  {/* </div> */}
                  {/* <div className="text-start pt-0 p-4"> */}
                   
                    {/* <div className="apply-button text-end">
                    
                      <a onClick={() => handleSubmit(scholarData.scholar, scholarData.school, scholarData.level,scholarData.duedate,scholarData.examdate,scholarData.examtime)} href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: "30px 30px 30px 30px" }}>Apply</a>
                    </div> */}
                  </div>
                  <a onClick={() => handleSubmit(scholarData.scholar, scholarData.school, scholarData.level,scholarData.duedate,scholarData.examdate,scholarData.examtime)} href="#" className="btn-apply btn-sm btn-primary px-3" style={{ borderRadius: "30px 30px 30px 30px" }}>Apply</a>
                </div>
              //  </div>
              //  </div>
              ))
            ) : (
                <p>No scholarship events found.</p>
            )}
          </div>
          </div>
        </div>
      </div>

      </div>
      <footer className="footer-container">
    <div className="container-footer">
      <div className="row">
      <div className="col-lg-4 mx-auto">
      <h3>About Us</h3>
          <p>
            Edupathfinder is a school finding website which make it convient for you to search for schools best for your child from home.
            You can also have haselfree admission and apply for various scholarships and events from home.
          </p>
      </div>
        <div className="col-lg-4 mx-auto">
          <h3>Contact Info</h3>
          <p1>Email: ritika@example.com</p1><br></br>
          <p1>Phone: +977-9800000000</p1>
        </div>
        <div className="col-lg-4 mx-auto social-icons">
          <h3>Follow Us</h3>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
  
    </div>
     </div>
  );
}

export default Scholarship;
