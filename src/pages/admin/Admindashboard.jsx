import React, { useState, useEffect } from "react";
import { createSchoolApi, deletedSchoolApi, getAllSchoolApi} from '../../api/Api'
import { toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from '../../components/Navbar/AdminNavbar';
import "../../style/admin.css";

const AdminDashboard = () => {
  const [school, setSchool] = useState('')
  const [level, setLevel] = useState()
  const [location, setLocation] = useState('')
  const [fee, setFee] = useState('')
  const [transportation, setTransportation] = useState('')
  const [cafe, setCafe] = useState('')
  const [amenties, setAmenties] = useState('')
  const [hostel, setHostel] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null);
  const [schoolPackage, setSchoolPackage] = useState([]);
  const {id} = useParams()
 
  // const [selectedPackages, setSelectedPackages] = useState(null);
  const navigate = useNavigate();
  
//   const handleAdd = (school,location, level,fee,description,transportation,amenties,cafe,hostel,imageUrl) => {
//     const schoolData = { school,location, level, fee,description,transportation,amenties,cafe,hostel,imageUrl};
//     navigate('/detail', { state: schoolData });
// }
// const handleAdd = (school, location, level, fee, description, transportation, amenities, cafe, hostel, imageUrl) => {
//   const schoolData = { school, location, level, fee, description, transportation, amenities, cafe, hostel, imageUrl };
//   navigate('/detail', { state: { schoolData } });
// };

const handleAdd = (schoolData) => {
  navigate('/detail', { state: { schoolData } });
};


  const changeSchool = (e) => {
    setSchool(e.target.value)
  }
  const changeLocation = (e) => {
    setLocation(e.target.value)
  }
  const changeLevel = (e) => {
    setLevel(e.target.value)
  }

  const changeFee = (e) => {
    setFee(e.target.value)
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
  }
  const changeTransportation = (e) => {
    setTransportation(e.target.value)
  }

  const changeAmenties= (e) => {
    setAmenties(e.target.value)
  }
  const changeCafe= (e) => {
    setCafe(e.target.value)
  }
  const changeHostel= (e) => {
    setHostel(e.target.value)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(school,location, level,fee,description,transportation,amenties,cafe,hostel, image);

    const formData = new FormData();
    formData.append("school", school);
    formData.append("location", location);
    formData.append("level", level);
    formData.append("fee", fee);
    formData.append("description", description);
    formData.append("transportation", transportation);
    formData.append("amenties", amenties);
    formData.append("cafe", cafe);
    formData.append("hostel", hostel);
    formData.append("imageUrl", image);

    try {
      const res = await createSchoolApi(formData);

      if (res.data.status && res.data.status.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Server error");
      console.log("Error response from server:", error.response);
    }

  };

  useEffect(() => {
    getAllSchoolApi()
      .then((res) => {
        // Package is array name of the array
        setSchoolPackage(res.data.School);
      })
      .catch((error) => {
        console.error('Error fetching Schools:', error);
        toast.error('Error fetching Schools.Please try again later.');
      });
  }, []);

  // for delete product function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure want to delete this Schools?')
    if (!confirmDialog) {
      return;
    } else {
      // make api call
      deletedSchoolApi(id).then((res) => {
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
    <div className="admin-heading d-flex align-items-center mb-3">
      <h2 >Admin Dashboard</h2>
      <button
        type="button"
        className="btn btn-package ms-auto"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Package
      </button>
    </div>

    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Create new School
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
              <label className="form-label">School</label>
              <input
                onChange={changeSchool}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Package Name"
              />
              <br />
              <label className="form-label">Location</label>
              <input
                onChange={changeLocation}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Location"
              />
              <br />
              <label className="form-label">Fee</label>
              <input
                onChange={changeFee}
                type="number"
                className="form-control mb-2"
                placeholder="Enter Fee"
              />
              <br />
              <label className="form-label">Level</label>
              <select onChange={changeLevel} className="form-control mb-2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              <br />
              <label className="form-label">Description</label>
              <textarea
                onChange={changeDescription}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Description"
              />
              <br />
              <label className="form-label">Transportation</label>
              <textarea
                onChange={changeTransportation}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Transportation"
              />
              <br />
              <label className="form-label">Amenities</label>
              <textarea
                onChange={changeAmenties}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Amenities"
              />
              <br />
              <label className="form-label">Cafe</label>
              <textarea
                onChange={changeCafe}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Cafe"
              />
              <br />
              <label className="form-label">Hostel</label>
              <textarea
                onChange={changeHostel}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Hostel"
              />
              <br />
              <label className="form-label">Upload Image</label>
              <input
                onChange={handleImageUpload}
                name="imageUrl"
                type="file"
                className="form-control mb-2"
                placeholder="Choose file"
              />
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
            <th scope="col">School</th>
            <th scope="col">Location</th>
            <th scope="col">Fee</th>
            <th scope="col">Level</th>
            <th scope="col">Description</th>
            <th scope="col">Transportation</th>
            <th scope="col">Amenties</th>
            <th scope="col">Cafe</th>
            <th scope="col">Hostel</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {schoolPackage.map((item) => (
            <tr>
              <td>
                <img
                  src={item.imageUrl}
                  alt=""
                  width={"50px"}
                  height={"30px"}
                ></img>
              </td>
              <td>{item.school}</td>
              <td>{item.location}</td>
              <td>{item.fee}</td>
              <td>{item.level}</td>
              <td>{item.description}</td>
              <td>{item.transportation}</td>
              <td>{item.amenties}</td>
              <td>{item.cafe}</td>
              <td>{item.hostel}</td>
              {/* <td>{item.description}</td> */}
              <td>
                <div className="btn-group" role="group">
                 
                 
                  <button onClick={()=>handleDelete(item._id)} className=" btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // </div>
  );
};

export default AdminDashboard;