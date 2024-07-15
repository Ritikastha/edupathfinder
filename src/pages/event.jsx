import '../style/dash.css'
import '../style/Navbar.css'
import '../style/events.css'
import '../style/bootstrap.min.css'
import Navbar from '../components/Navbar/Navbar';
import React, { useState, useEffect } from "react";
// import { createSchooApi, deletedSchoolApi, getAllSchoolApi} from '../api/Api'
import { getAllEventApi } from '../api/Api';
import { toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";

const Events = () => {
    // const [schools, setSchools] = useState([]);
    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();
    const [eventPackage, setEventPackage] = useState([]);

  // Events Api Use Effect
    useEffect(() => {
      getAllEventApi()
        .then((res) => {
            setEventPackage(res.data.Event);
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
          toast.error('Error fetching events. Please try again later.');
        });
    }, []);

    const handleSubmit = (event,school, location, date) => {
      
    setTimeout(() => {
        toast.success('Applied for event successfully!');
        navigate('/event', { state: { event, school, location, date } });
    }, 1000); // Example: Simulated delay for demonstration
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
        <div className="container-dash-fluid  py-5 mb-5 hero-header-event">
            <div className="container-descrip py-5">
                <div className="row justify-content-start py-5">
                    {/* <div className="col-lg-5 d-flex flex-column justify-content-center align-items-start text-left"> */}
                        {/* <h2 className="text-black mb-3 ">Direct Admissions</h2>
                        <h1 className="text-black mb-3 ">Get accepted without an application.</h1>
                        <p1 className="fs-4 text-dark mb-1">No application. No waiting</p1> 
                        <p2 className="fs-4 text-dark mb-1">With Direct Admissions, colleges can accept you based on</p2>
                        <p3 className="fs-4 text-dark mb-1">information you provided.</p3> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
        <div className="grey-background">
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="section-title text-center text-primary px-3">Events</h1>
            {/* <h4 className="mb-1 ms-4 text-start">Top Rated School</h4> */}
          </div>
          <div className="scroll-container">
          <div className="scroll-content">
         
            {eventPackage.map((eventData, index) => (
              <div key={index} className="scroll-item">
                 <div className="box-container">
               {/* <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`0.${index}s`}> */}
                <div className="col">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={eventData.imageUrl} alt='' />
                  </div>
                  <div className="school text-center p-3">
                  <h5 className="mb-0">{eventData.event}</h5>
                    <small className="flex-fill text-center py-2"><i className=" text-primary me-2"></i>{eventData.school}</small><br></br>
                    {/* <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small> */}
                    <small className="flex-fill text-center py-2"><i className="fa fa-map-marker-alt text-primary me-2"></i>{eventData.location}</small><br></br>
                    <small className="flex-fill text-center py-2"><i className="fa fa-calendar text-primary me-2"></i> {new Date(eventData.date).toLocaleDateString()}</small>
                  </div>
                  <div className="text-start pt-0 p-4">
                   
                    <div className="d-flex justify-content-center mb-2">
                      {/* <a href="#" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: "30px 30px 30px 30px" }}>Detail</a> */}
                      <a onClick={() => handleSubmit(eventData.event, eventData.school, eventData.location,eventData.date)} href="#" className="btn-detail px-3" style={{ borderRadius: "30px 30px 30px 30px" }}>Apply</a>
                    </div>
                  </div>
                </div>
               </div>
               </div>
             ))} 
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

export default Events;
