import '../style/detail.css';
import '../style/Navbar.css';
import '../style/bootstrap.min.css';
import Navbar from '../components/Navbar/Navbar';
import React from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast} from 'react-toastify'

const Detail = () => {
  const location = useLocation();
  const schoolData = location.state?.schoolData;
  const navigate = useNavigate();
  
  const handleReview = () => {
    navigate('/rateandreview', { state: { schoolData } });
  };
  const handleApplyClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        toast.error('Please login first.');
        return;
    }
    navigate('/addmission');
};

  if (!schoolData) {
    return (
      <div>
        <Navbar />
        <div className="container-dash-fluid position-relative p-0">
          <p>No school data available.</p>
        </div>
      </div>
    );
  }
    // Split the amenities string into an array of amenities
    const amenitiesList = schoolData.amenties?.split('.').filter(item => item.trim() !== '');

  return (
    <div>
      <Navbar />
      <div className="container-dash-fluid position-relative p-0">
        <div className="school-detail">
          <div className="image-container">
          <img className="img-fluid full-screen-image" src={schoolData.imageUrl} alt={schoolData.school} />
          </div>
            
            <div className="overlay">
              <div className="overlay-content">
                <div className="left-content">
                  <h5 className="mb-0">{schoolData.school}</h5>
                  <small className="text-primary"><i className="fa fa-map-marker-alt me-2"></i>{schoolData.location}</small>
                </div>
                <div className="right-content">
                <div className="stars-reviews">
                    <div className="stars">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                    <p onClick={handleReview} className="mb-0 reviews">Reviews</p>
                  </div>
                  <a onClick={handleApplyClick}href="#" className="btn btn-apply-detail  px-3" >Apply</a>
                </div>
              </div>
            </div>
          
         
        </div>
        <div className='school-descrip'>
        <div className="description-container">
            <div className="description-section">
              <h6 className="section-title">Description</h6>
              <p>{schoolData.description}</p>
            </div>
            <div className="description-section">
              <h6 className="section-title">Amenities</h6>
              <ul>
                {amenitiesList.map((amenity, index) => (
                  <li key={index}>{amenity.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="description-section">
              <h6 className="section-title">Transportation</h6>
              <p>{schoolData.transportation}</p>
            </div>
            <div className="description-section">
              <h6 className="section-title">Cafe</h6>
              <p>{schoolData.cafe}</p>
            </div>
            <div className="description-section">
              <h6 className="section-title">Hostel</h6>
              <p>{schoolData.hostel}</p>
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

export default Detail;
