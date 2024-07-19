import '../style/dash.css'
import '../style/Navbar.css'
import '../style/bootstrap.min.css'
import '../style/footer.css'
import Navbar from '../components/Navbar/Navbar';
import React, { useState, useEffect } from "react";
// import { createSchoolApi, deletedSchoolApi, getAllSchoolApi} from '../api/Api'
import { getAllSchoolApi } from '../api/Api';
import { getAllFeatureApi } from '../api/Api';
import { toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
    // const [schools, setSchools] = useState([]);
    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();
    const [schoolPackage, setSchoolPackage] = useState([]);
    const [featurePackage, setFeaturePackage] = useState([]);

    const handleImageClick = (schoolData) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
          toast.error('Please login first.');
          return;
      }
      navigate('/detail', { state: { schoolData } });
    };

    const handleFeatureImageClick = (featureData) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
          toast.error('Please login first.');
          return;
      }
      navigate('/featuredetail', { state: { featureData } });
    };
    
    const handleSubmit = (school, fee, location, level, description, transportation, amenities, cafe, hostel) => {
      const schoolData = { school, fee, location, level, description, transportation, amenities, cafe, hostel };
      navigate('/detail', { state: { schoolData } });
    };
    
  // School Api Use Effect
    useEffect(() => {
      getAllSchoolApi()
        .then((res) => {
          setSchoolPackage(res.data.School);
        })
        .catch((error) => {
          console.error('Error fetching schools:', error);
          toast.error('Error fetching schools. Please try again later.');
        });
    }, []);

    // Feature Api use effect
    useEffect(() => {
      getAllFeatureApi()
        .then((res) => {
          setFeaturePackage(res.data.Feature);
        })
        .catch((error) => {
          console.error('Error fetching Feature schools:', error);
          toast.error('Error fetching Feature schools. Please try again later.');
        });
    }, []);
    const handleDetailClick = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
          toast.error('Please login first.');
          return;
      }
      navigate('/addmission');
  };
  


  return (
    
      <div>
         {/* <Navbar/> */}
    <div className="container-dash-fluid position-relative p-0">
    <Navbar/>
        <div className="container-dash-fluid bg-primary py-5 mb-5 hero-header">
            <div className="containerr py-5">
                <div className="row justify-content-center py-5">
                    <div className="col-lg-10 text-right">
                        <h2 className="text-white mb-3 ">FIND THE SCHOOL</h2>
                        <h1 className="text-white mb-3 ">THAT FITS YOU THE BEST</h1>
                        <p className="fs-4 text-white mb-4 ">Discovering the ideal school for grades K-8 is effortless<br></br> Navigating the perfect educational path for your child through<br></br> our school finding website is simple and effective.</p> 
                    </div>
                </div>
            </div>
        </div>
        <div className="container-dash-fluid bg-primary py-5 mb-5 hero-header-2">
            <div className="container-descrip py-5">
                <div className="row-dash justify-content-start py-5">
                    {/* <div className="col-lg-5 d-flex flex-column justify-content-center align-items-start text-left"> */}
                        <h2 className="text-black mb-3 ">Direct Admissions</h2>
                        <h1 className="text-black mb-3 ">Get accepted without an application.</h1>
                        <p className="fs-4 text-dark mb-1">No application. No waiting</p> 
                        <p className="fs-4 text-dark mb-1">With Direct Admissions, schools can accept you based on information you provided.</p>
                    {/* </div> */}
                </div>
            </div>
        </div>
        <div  className="grey-background">
         {/* <div className="container-xxl py-5 ">
        <div className="container" >
          <div  className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="section-title text-center text-primary px-3">Schools</h1>
            <h4 className="mb-1 ms-4 text-start">Top Rated School</h4>
          </div>
          <div className="scroll-container">
          <div className="scroll-content">
         
            {schoolPackage.map((schoolData, index) => (
              <div key={index} className="scroll-item">
                 <div className="box-container">
             
                <div className="col">
              
                  <div  className="image-item" onClick={() => handleImageClick(schoolData)}>
                  <img className="img-fluid " src={schoolData.imageUrl} alt={schoolData.school} />
                </div>
                    
                  <div className="school text-center p-3">
                  <h5 className="mb-0">{schoolData.school}</h5>
                    <small className="flex-fill text-center py-2"><i className="fa fa-map-marker-alt text-primary me-2"></i>{schoolData.location}</small><br></br>
                    {/* <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small> */}
                    {/* <small className="flex-fill text-center py-2"><i className="fa fa-hourglass text-primary me-2"></i>Level-{schoolData.level}</small>
                  </div>
                  <div className="text-start pt-0 p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                   <div>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                   </div>
                   <p href="/rateandreview"className="mb-0 ms-4">Reviews</p>
                 
                  </div>
                   
                    <div className="d-flex justify-content-center mb-2">
                     
                      <button
                     
                     onClick={handleDetailClick} className=" btn-detail px-3" style={{ borderRadius: "30px 30px 30px 30px" }}>Apply</button>
                    </div>
                  </div>
                </div>
               </div>
               </div>
             ))} 
          </div>
          <div className="scroll-indicator position-absolute top-50 end-0 translate-middle-y">
        <i className="fa fa-chevron-right text-primary"></i>
      </div>
          </div>
        </div>
      </div>   */}
    
    
{/* ---- */}
<div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h1 className="section-title text-center text-primary px-3">Schools</h1>
      <h4 className="mb-1 ms-4 text-start">Top Rated School</h4>
    </div>
    <div className="scroll-wrapper position-relative">
      <div className="scroll-container">
        <div className="scroll-content">
          {schoolPackage.map((schoolData, index) => (
            <div key={index} className="scroll-item">
              <div className="box-container">
                <div className="col">
                  <div className="image-item" onClick={() => handleImageClick(schoolData)}>
                    <img className="img-fluid" src={schoolData.imageUrl} alt={schoolData.school} />
                  </div>
                  <div className="school text-center p-3">
                    <h5 className="mb-0">{schoolData.school}</h5>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>{schoolData.location}
                    </small>
                    <br />
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-hourglass text-primary me-2"></i>Level-{schoolData.level}
                    </small>
                  </div>
                  <div className="text-start pt-0 p-4">
                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                      </div>
                      <p href="/rateandreview" className="mb-0 ms-4">Reviews</p>
                    </div> */}
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        onClick={handleDetailClick}
                        className="btn-detail px-3"
                        style={{ borderRadius: "30px" }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="scroll-indicator position-absolute top-50 translate-middle-y  text-white">
        <i className="fa fa-chevron-right "></i>
      </div> */}
    </div>
  </div>
</div>
      {/* next */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h4 className="mb-1 ms-4 text-start">Featured School</h4>
          </div>
          <div className="scroll-container">
          <div className="scroll-content">

            {featurePackage.map((featureData, index) => (
              <div key={index} className="scroll-item">
                 <div className="box-container">
               {/* <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`0.${index}s`}> */}
                <div className="col">
                  <div className="overflow-hidden" onClick={() => handleFeatureImageClick(featureData)}>
                    <img className="img-fluid" src={featureData.imageUrl} alt="" />
                  </div>
                  <div className="school text-center p-3">
                  <h5 className="mb-0">{featureData.school}</h5>
                  <small className="flex-fill text-center py-2"><i className="fa fa-map-marker-alt text-primary me-2"></i>{featureData.location}</small><br></br>
                    {/* <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small> */}
                    <small className="flex-fill text-center py-2"><i className="fa fa-hourglass text-primary me-2"></i>Level-{featureData.level}</small>
                  </div>
                  <div className="text-start pt-0 p-4">
                  {/* <div className="d-flex justify-content-between align-items-center mb-3">
                   <div>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                     <small className="fa fa-star text-primary"></small>
                   </div>
                   <p className="mb-0 ms-4">Reviews</p>
                  </div> */}
                    {/* <p>{packageData.description}</p> */}
                    <div className="d-flex justify-content-center mb-2">
                      {/* <a href="#" className="btn-detail px-3 " style={{ borderRadius: "30px 30px 30px 30px" }}>Detail</a> */}
                      <button 
                      // onClick={() => handleSubmit(featureData.school, featureData.fee, featureData.level)}
                       onClick={handleDetailClick} className="btn-detail px-3" style={{ borderRadius: "30px 30px 30px 30px" }}>Apply</button>
                    </div>
                  </div>
                </div>
               </div>
               </div>
             ))} 
          </div>
          </div>
          {/* <div className="scroll-indicator position-absolute top-50 translate-middle-y  text-white">
                  <i className="fa fa-chevron-right"></i>
                </div> */}
        </div>
      </div>
      </div>
  

    {/* Footer Section */}
  
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
};

export default Dashboard;

