import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Use your backend URL or environment variable
  headers: {
    'Content-Type': 'application/json', // Ensure proper content type is set
  },
});

// Request interceptor for adding the auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => {
    // Success case: return response data
    return response;
  },
  (error) => {
    // Error case: handle 401 Unauthorized errors globally
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Token expired or invalid.');
      // Optionally: Redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error); // Reject the promise to handle locally in components
  }
);

// Example: Fetching data
const fetchData = async () => {
  try {
    const response = await api.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Example: Sending data
const sendData = async (data) => {
  try {
    const response = await api.post('/data', data);
    console.log('Data sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

export default api;
