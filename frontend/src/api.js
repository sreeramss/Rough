import axios from 'axios';

let token,userId = null;
token = localStorage.getItem("token");
userId = localStorage.getItem("userId")
console.log(userId);
console.log(token);




const defaultOptions = {
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": "application/json"
    },
};

if (token !== null) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
}

const API = axios.create(defaultOptions);


export const fetchBookmarks = () => API.get(`/api/bookmarks/${userId}`);
export const addBookmark = (bookmark) => API.post('/api/bookmarks', bookmark);
export const deleteBookmark = (id) => API.delete(`/api/bookmarks/${id}`);

export const loginAPICall = (payload) => API.post('/login/', payload);

export const signupAPICall = (payload) => API.post('/signup/', payload);
