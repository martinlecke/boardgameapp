import axios from 'axios';

export default { isLoggedIn, login, register, logout };

function isLoggedIn() {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then(response => {
    return response.data.loggedIn;
  });
}

function login({ email, password }) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email,
      password
    },
    withCredentials: true
  })
    .then(response => {
      return { loggedIn: true };
    })
    .catch(e => {
      return { loggedIn: false };
    });
}

function register({ email, password }) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/user/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email,
      password
    },
    withCredentials: true
  })
    .then(response => {
      return { loggedIn: true };
    })
    .catch(e => ({ loggedIn: false }));
}

function logout() {
  return axios
    .get('http://localhost:8080/user/logout', { withCredentials: true })
    .then(response => {
      return { loggedIn: false };
    });
}
