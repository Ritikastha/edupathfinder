import React, { useState, useEffect } from "react";
import { createEventApi, deletedEventApi, getAllEventApi} from '../../api/Api'
import { toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from '../../components/Navbar/AdminNavbar';
import "../../style/admin.css";

const EventDashboard = () => {
  const [event, setEvent] = useState('')
  const [school, setSchool] = useState()
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState(null);
  const [eventPackage, setEventPackage] = useState([]);
  const {id} = useParams()
  const navigate = useNavigate();
  
  const handleAdd = (event ,school, location, date,imageUrl) => {
    const eventData = { event ,school, location, date,imageUrl};
    navigate('/event', { state: eventData });
}
  
const changeEvent = (e) => {
    setEvent(e.target.value)
  }

  const changeSchool = (e) => {
    setSchool(e.target.value)
  }

  const changeLocation = (e) => {
    setLocation(e.target.value)
  }

  const changeDate = (e) => {
    setDate(e.target.value)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event ,school, location, date, image);

    const formData = new FormData();
    formData.append("event", event);
    formData.append("school", school);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("imageUrl", image);

    try {
      const res = await createEventApi(formData);

      if (res.data.status && res.data.status.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        fetchEvents(); 
      }
    } catch (error) {
      toast.error("Server error");
      console.log("Error response from server:", error.response);
    }

  };

  const fetchEvents = () => {
    getAllEventApi()
      .then((res) => {
        console.log('API response:', res.data); 
        // Package is array name of the array
        setEventPackage(res.data.Event || []);
      })
      .catch((error) => {
        console.error('Error fetching Events:', error);
        toast.error('Error fetching Events.Please try again later.');
      });
  };


  useEffect(() => {
    fetchEvents(); // Initial fetch of events
  }, []);

  // for delete product function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure want to delete this Event?')
    if (!confirmDialog) {
      return;
    } else {
      // make api call
      deletedEventApi(id).then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message)
          window.location.reload()
        } else {
          toast.error(res.data.message)
        }
      })
    }
  }

  // useEffect(()=>{
  //   //Api call
  //   getSinglePackageApi(id).then((res)=>{
  //     console.log(res.data);
  //     setDestination(res.data.Package.destination);
  //     setPrice(res.data.Package.price);
  //     setCategory(res.data.Package.category);
  //     setDescription(res.data.Package.description);
  //   })
 
  // },[id])

  return (
    <div>
      <AdminNavbar/>
      <div className="d-flex align-items-center mb-3">
        <h2>Admin Dasboard</h2>
        <button
          type="button"
          className="btn btn-package ms-auto"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Event
        </button>
      </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create new Event
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* name */}
                  <label className="form-label">Event</label>
                  <input
                    onChange={changeEvent}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Event Name"
                  ></input>
                  {/* price */}
                  <br></br>
                  <label className="form-label">School</label>
                  <input
                    onChange={changeSchool}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter School Name"
                  ></input>
                  {/* category */}
                  <br></br>
                  <label className="form-label">Location</label>
                  <input
                    onChange={changeLocation}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Location"
                  ></input>
                  <label className="form-label">Date</label>
                  <input
                    onChange={changeDate}
                    type="date"
                    className="form-control mb-2"
                    placeholder="Enter Date"
                  ></input>
                  {/* description */}
                  {/* <br></br>
                  <label className="form-label"> Description </label>
                  <textarea
                    onChange={changeDescription}
                    // value={description}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Description"
                  ></textarea> */}
                  <br></br>
                  {/* image */}
                  <label className="form-label">Upload Image</label>
                  <input
                    onChange={handleImageUpload}
                    name="imageUrl"
                    type="file"
                    className="form-control mb-2"
                    placeholder="Choose file"
                  ></input>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      
      
    

      <table className="table mt-2 ">
        <thead className="table-dark">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Event</th>
            <th scope="col">School</th>
            <th scope="col">Location</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(eventPackage) && eventPackage.length > 0 ? (
            eventPackage.map((item) => (
                <tr key={item._id}>
              <td>
                <img
                  src={item.imageUrl}
                  alt=""
                  width={"50px"}
                  height={"30px"}
                ></img>
              </td>
              <td>{item.event}</td>
              <td>{item.school}</td>
              <td>{item.location}</td>
              <td>{item.date}</td>
              
              <td>
                <div className="btn-group" role="group">
                  {/* <button onClick={()=>handleAdd (item.school, item.fee, item.level, item.imageUrl)} className=" btn btn-success">Add</button> */}
                 
                  <button onClick={()=>handleDelete(item._id)} className=" btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
            ))
         ) : (
            <tr>
              <td colSpan="6" className="text-center">No Events Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  );
};

export default EventDashboard;