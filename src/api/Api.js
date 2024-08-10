import axios from "axios";

const token = localStorage.getItem('token');

const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
};

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: false // Ensure this is set according to your backend requirements
});

export const createUserApi=(data) =>Api.post('/api/user/create',data)
export const getUserApi=(data) =>Api.get('/api/user/get',data)
export const loginUserApi=(data) =>Api.post('/api/user/login',data)
export const updateUserApi=(data) =>Api.post('/api/user/updatePassword',data)

export const auditApi = (data) => axios.post('/api/audit/logs', data);
export const getauditApi = () => axios.get('/api/audit/logs');
export const createSchoolApi=(data) => Api.post('/api/school/create_school',data,config)
export const getAllSchoolApi=()=> Api.get('/api/school/get_school')
// export const getSinglePackageApi=(id) => Api.get(`/api/package/get_package/${id}`)
export const deletedSchoolApi=(id)=> Api.delete(`/api/school/delete_school/${id}`,config)

export const createFeatureApi = (data) => Api.post('/api/feature/create_feature', data, config);
export const getAllFeatureApi = () => Api.get('/api/feature/get_feature');
export const deletedFeatureApi = (id) => Api.delete(`/api/feature/delete_feature/${id}`, config);

export const createEventApi = (data) => Api.post('/api/event/create_event', data, config);
export const getAllEventApi = () => Api.get('/api/event/get_event');
export const deletedEventApi = (id) => Api.delete(`/api/event/delete_event/${id}`, config);

export const createScholarApi = (data) => Api.post('/api/scholar/create_scholar', data, config);
export const getAllScholarApi = () => Api.get('/api/scholar/get_scholar');
export const deletedScholarApi = (id) => Api.delete(`/api/scholar/delete_scholar/${id}`, config);

export const createReviewApi = (data) => Api.post('/api/review/create_review', data, config);
export const getAllReviewApi = () => Api.get('/api/review/:schoolId');

export const createBasicinfoApi = (data,token) =>{
    const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
}; 
Api.post('/api/basicinfo/create_basicinfo', data, config);
};
export const getAllBasicinfoApi = () => Api.get('/api/basicinfo/get_basicinfo',config);
export const updateBasicinfoApi=(id,formData) =>Api.put(`/api/basicinfo/update_basicinfo/${id}`,formData,config)
export const getSingleBasicinfoApi=(id) => Api.get(`/api/basicinfo/get_basicinfo/${id}`,config)

export const createAddmissionApi = (data) => Api.post('/api/addmission/create_addmission', data, config);
export const getAllAddmissionApi = () => Api.get('/api/addmission/get_addmission',config);