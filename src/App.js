import Register from './pages/Register';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/admin/Admindashboard';
import FeaturedDashboard from './pages/admin/Featureddashboard';
import EventDashboard from './pages/admin/Eventdashboard';
import Events from './pages/event';
import ScholarDashboard from './pages/admin/Scholardashboard';
import Auditdashboard from './pages/admin/Auditdashboard';
import Scholarship from './pages/scholarship';
import Detail from './pages/detail';
import Rateandreview from './pages/rateandreview';
import EditProfile from './pages/EditProfile';
import BasicInfo from './pages/Basicinfo';
import Addmission from './pages/addmission';
import AdminRoutes from './protected/AdminRoutes';
import UserRoutes from './protected/UserRoutes';
import FeatureDetail from './pages/featuredetail';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
      <Route path="/" element={<Dashboard></Dashboard>} />
      <Route path='/register' element={<Register></Register>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/basicinfo' element={<BasicInfo></BasicInfo>}/>

      <Route element={<AdminRoutes />}>
        <Route path='/adminsch' element={<AdminDashboard />} />
        <Route path='/adminfea' element={<FeaturedDashboard />} />
        <Route path='/adminevent' element={<EventDashboard />} />
        <Route path='/adminscholar' element={<ScholarDashboard />} />
        <Route path='/auditlog' element={<Auditdashboard/>}/>
      </Route>

      <Route element={<UserRoutes/>}>
        <Route path='/dash' element={<Dashboard></Dashboard>}/>
        <Route path='/event' element={<Events></Events>}/>
        <Route path='/scholarship' element={<Scholarship></Scholarship>}/>
        <Route path='/detail' element={<Detail></Detail>}/>
        <Route path='/featuredetail' element={<FeatureDetail></FeatureDetail>}/>
        <Route path='/rateandreview' element={<Rateandreview></Rateandreview>}/>
        <Route path='/editprofile' element={<EditProfile></EditProfile>}/>
        <Route path='/changepassword' element={<ChangePassword></ChangePassword>}/>
        <Route path='/addmission' element={<Addmission></Addmission>}/>
      </Route>
      </Routes>                                   
    </Router>
  );
}

export default App;