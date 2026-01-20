import axios from "axios";

const API = "http://localhost:8080";

// Fetch questions (optionally filtered by jobId)
export function fetchQuestions(jobId = null) {
  const url = jobId 
    ? `${API}/api/test/questions?jobId=${jobId}`
    : `${API}/api/test/questions`;
  return axios.get(url);
}

// Submit answers
export function submitAnswers(requestData, jobId = null) {
  const studentId = localStorage.getItem("studentId");
  const url = jobId 
    ? `${API}/api/test/submit?studentId=${studentId}&jobId=${jobId}`
    : `${API}/api/test/submit?studentId=${studentId}`;
  return axios.post(url, requestData);
}

// Get student result
export function getStudentResult(id) {
  return axios.get(`${API}/api/student/result/${id}`);
}

export const getJobRecommendations = (level) =>
  axios.get(`${API}/api/jobs/recommend/${level}`);

// Recruiter APIs
export const getAllJobs = () => axios.get(`${API}/api/jobs/all`);
export const getJobsByRecruiter = (recruiterId) => axios.get(`${API}/api/jobs/by-recruiter/${recruiterId}`);
export const createJob = (jobData) => {
  console.log("Creating job with data:", jobData);
  return axios.post(`${API}/api/jobs/create`, jobData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
export const updateJob = (id, jobData) => axios.put(`${API}/api/jobs/update/${id}`, jobData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const deleteJob = (id) => axios.delete(`${API}/api/jobs/delete/${id}`);
export const getAllStudents = (recruiterId = null) => {
  const url = recruiterId 
    ? `${API}/api/recruiter/students?recruiterId=${recruiterId}`
    : `${API}/api/recruiter/students`;
  return axios.get(url);
};
export const getStudentDetails = (id, recruiterId = null) => {
  const url = recruiterId 
    ? `${API}/api/recruiter/students/${id}?recruiterId=${recruiterId}`
    : `${API}/api/recruiter/students/${id}`;
  return axios.get(url);
};
export const sendMessage = (messageData) => axios.post(`${API}/api/recruiter/message/send`, messageData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const getRecruiterMessages = (recruiterId) => axios.get(`${API}/api/recruiter/messages/${recruiterId}`);

// Student messaging APIs
export const sendStudentMessage = (messageData) => axios.post(`${API}/api/student/message/send`, messageData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const getReceivedMessages = (studentId) => axios.get(`${API}/api/student/message/received/${studentId}`);
export const getSentMessages = (studentId) => axios.get(`${API}/api/student/message/sent/${studentId}`);
export const getUnreadCount = (studentId) => axios.get(`${API}/api/student/message/unread-count/${studentId}`);

// Test management APIs
export const createQuestion = (questionData) => axios.post(`${API}/api/test/questions/create`, questionData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const getQuestionsWithAnswers = (recruiterId = null) => {
  const url = recruiterId 
    ? `${API}/api/test/questions/with-answers?recruiterId=${recruiterId}`
    : `${API}/api/test/questions/with-answers`;
  return axios.get(url);
};
export const updateQuestion = (id, questionData) => axios.put(`${API}/api/test/questions/update/${id}`, questionData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const deleteQuestion = (id) => axios.delete(`${API}/api/test/questions/delete/${id}`);

// Recruiter Profile APIs
export const getRecruiterProfile = (id) => axios.get(`${API}/api/recruiter/profile/${id}`);
export const updateRecruiterProfile = (id, profileData) => axios.put(`${API}/api/recruiter/profile/${id}`, profileData, {
  headers: {
    'Content-Type': 'application/json'
  }
});

// Student Profile APIs
export const getStudentProfile = (id) => axios.get(`${API}/api/student/profile/${id}`);
export const updateStudentProfile = (id, profileData) => axios.put(`${API}/api/student/profile/${id}`, profileData, {
  headers: {
    'Content-Type': 'application/json'
  }
});

// Student Assessment APIs
export const getStudentAssessments = (id) => axios.get(`${API}/api/student/assessments/${id}`);