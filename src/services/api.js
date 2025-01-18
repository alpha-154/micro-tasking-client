import axios from "axios";

// Creating an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from environment variables
  timeout: 120000, // Request timeout
});

// Adding a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Define API functions
const registerUser = (registrationData) => {
  return apiClient.post("/api/user/register", registrationData);
};

const generateToken = (loginData) => {
  return apiClient.post("/api/user/generate-token", loginData);
};

const registerUserWithGoogle = (registrationData) => {
  return apiClient.post("/api/user/register-with-google", registrationData);
};

const fetchUserProfile = (uid) => {
  return apiClient.get(`/api/user/get-user-profile/${uid}`);
};

const fetchBuyerStatsWithPendingSubmissions = (uid) => {
  return apiClient.get(`/api/buyer/get-all-tasks-with-submissionData/${uid}`);
}

const addTask = (taskData) => {
  return apiClient.post("/api/buyer/create-task", taskData);
}

const fetchTasksbyUser = (uid) => {
  return apiClient.get(`/api/buyer/get-all-tasks/${uid}`);
}

const updateTask = (taskData) => {
  return apiClient.patch("/api/buyer/update-task", taskData);
}

const deleteTask = (uid, taskId) => {
  console.log(uid, taskId);
  return apiClient.delete(`/api/buyer/delete-task/${uid}/${taskId}`);
}


export {
  registerUser,
  generateToken,
  registerUserWithGoogle,
  fetchUserProfile,
  fetchBuyerStatsWithPendingSubmissions ,
  addTask,
  fetchTasksbyUser,
  updateTask,
  deleteTask
};
