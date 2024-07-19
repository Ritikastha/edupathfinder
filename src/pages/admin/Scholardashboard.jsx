import React, { useState, useEffect } from "react";
import { createScholarApi, deletedScholarApi, getAllScholarApi} from '../../api/Api'
import { toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from '../../components/Navbar/AdminNavbar';
import "../../style/admin.css";
const ScholarDashboard = () => {
    const [scholar, setScholar] = useState('')
  const [school, setSchool] = useState('')
  const [level, setLevel] = useState()
  const [duedate, setDueDate] = useState('')
  const [examdate, setExamDate] = useState('')
  const [examtime, setExamTime] = useState('')
  const [image, setImage] = useState(null);
  const [scholarPackage, setScholarPackage] = useState([]);
  const {id} = useParams()
 
  // const [selectedPackages, setSelectedPackages] = useState(null);
  const navigate = useNavigate();
  
  const handleAdd = (scholar,school,level,duedate,examdate,examtime,imageUrl) => {
    const scholarData = { scholar,school,level,duedate,examdate,examtime,imageUrl};
    navigate('/scholar', { state: scholarData });
}
const changeScholar = (e) => {
    setScholar(e.target.value)
  }

  const changeSchool = (e) => {
    setSchool(e.target.value)
  }

  const changeLevel = (e) => {
    setLevel(e.target.value)
  }

  const changeDueDate = (e) => {
    setDueDate(e.target.value)
  }

  const changeExamDate = (e) => {
    setExamDate(e.target.value)
  }
  const changeExamTime = (e) => {
    setExamTime(e.target.value)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(scholar,school,level,duedate,examdate,examtime,image);

    const formData = new FormData();
    formData.append("scholar", scholar);
    formData.append("school", school);
    formData.append("level", level);
    formData.append("duedate", duedate);
    formData.append("examdate", examdate);
    formData.append("examtime", examtime);
    formData.append("imageUrl", image);

    try {
      const res = await createScholarApi(formData);

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

//   useEffect(() => {
//     getAllFeatureApi()
//       .then((res) => {
//         // Feature is array name of the array
//         setFeaturePackage(res.data.Feature);
//       })
//       .catch((error) => {
//         console.error('Error fetching feature schools:', error.response);
//         toast.error('Error fetching feature Schools.Please try again later.');
//       });
//   }, []);
useEffect(() => {
    getAllScholarApi()
        .then((res) => {
            setScholarPackage(res.data.Scholar);
        })
        .catch((error) => {
            console.error('Error fetching scholarship:', error.response);
            if (error.response) {
                console.error('Data:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            }
            toast.error('Error fetching scholarship. Please try again later.');
        });
}, []);


  // for delete product function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure want to delete this scholarship?')
    if (!confirmDialog) {
      return;
    } else {
      // make api call
      deletedScholarApi(id).then((res) => {
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
          Add Scholar
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
                  Create new Scholarship
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
                  <label className="form-label">School</label>
                  <input
                    onChange={changeSchool}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter School Name "
                  ></input>
                  <br></br>
                  <label className="form-label">Scholarship</label>
                  <input
                    onChange={changeScholar}
                    type="Number"
                    className="form-control mb-2"
                    placeholder="Enter Scholarship"
                  ></input>
                  <br></br>
                 
                  {/* price */}
                 
                  {/* category */}
                  <br></br>
                  <label className="form-label">Level</label>
                  <select
                    onChange={changeLevel}
                    className="form-control mb-2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                  <label className="form-label">Due Date</label>
                  <input
                    onChange={changeDueDate}
                    type="date"
                    className="form-control mb-2"
                    placeholder="Enter Due Date"
                  ></input>
                   <label className="form-label">Exam Date</label>
                  <input
                    onChange={changeExamDate}
                    type="date"
                    className="form-control mb-2"
                    placeholder="Enter Exam Date"
                  ></input>
                   <label className="form-label">Exam Time</label>
                  <input
                    onChange={changeExamTime}
                    type="time"
                    className="form-control mb-2"
                    placeholder="Enter Exam Time"
                  ></input>
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
            <th scope="col">School</th>
            <th scope="col">Scholarship</th>
            <th scope="col">Level</th>
            <th scope="col">Due-Date</th>
            <th scope="col">Exam-Date</th>
            <th scope="col">Exam-Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {scholarPackage.map((item) => (
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
              <td>{item.scholar}</td>
              <td>{item.level}</td>
              <td>{item.duedate}</td>
              <td>{item.examdate}</td>
              <td>{item.examtime}</td>
              <td>
                <div className="btn-group" role="group">
                  {/* <button onClick={()=>handleAdd (item.school, item.fee, item.level, item.imageUrl)} className=" btn btn-success">Add</button> */}
                 
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

export default ScholarDashboard;