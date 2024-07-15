import '../style/detail.css';
import '../style/Navbar.css';
import '../style/bootstrap.min.css';
import Navbar from '../components/Navbar/Navbar';
import React, {  useEffect , useState } from 'react';
import { useLocation } from "react-router-dom";
import { toast} from 'react-toastify'
import { createReviewApi, getAllReviewApi} from '../api/Api'


const Rateandreview = () => {
  const location = useLocation();
  const schoolData = location.state?.schoolData;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState("");

const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!schoolData || !schoolData._id) {
      toast.error('School data is missing');
      return;
    }

    const formData = {
      schoolId: schoolData._id,
      rating: rating,
      review: review,
    };
    try {
      const res = await createReviewApi(formData);

      if (res.data.status && res.data.status.success === false) {
        toast.error(res.data.message);
      }else {
        toast.success(res.data.message);
        setReviews([...reviews, res.data.data]);
        setRating(0); // Reset rating
        setReview(''); // Reset review
      }
    } catch (error) {
      toast.error("Server error");
      console.log("Error response from server:", error.response);
    }
  };

  useEffect(() => {
    getAllReviewApi()
      .then((res) => {
        // Package is array name of the array
        setReviews(res.data.Review);
      })
      .catch((error) => {
        console.error('Error fetching Reviews:', error);
        toast.error('Error fetching Reviews.Please try again later.');
      });
  }, []);


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
                  <p className="mb-0 reviews">Reviews</p>
                </div>
                <a onClick={''} href="#" className="btn btn-apply-detail px-3">Apply</a>
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
              <h6 className="section-title">Give a Rating and Review</h6>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                <div id="rating" className="star-rating">
                    {[...Array(5)].map((_, index) => (
                      <small
                        key={index}
                        className={`fa fa-star ${index < rating ? 'text-primary' : ''}`}
                        onClick={() => handleRatingChange(index + 1)}
                      ></small>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="review">Review:</label>
                  <textarea
                    id="review"
                    className="form-control"
                    value={review}
                    onChange={handleReviewChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn-submit-rate mt-2">Submit</button>
              </form>
            </div>
             {/* Display reviews */}
        <div className="reviews-section">
          <h6 className="section-title">Reviews</h6>
          {/* Example review */}
          <div className="review">
          {reviews.map((item, index) => (
                <div key={index} className="review">
                  <div className="rating">
                    {[...Array(item.rating)].map((_, i) => (
                      <small key={i} className="fa fa-star text-primary"></small>
                    ))}
                  </div>
                  <p>{item.review}</p>
                 </div>
                ))}
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

export default Rateandreview;
