import axios from 'axios';

export default { isLoggedIn, login };

function isLoggedIn() {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data);
    return response.data.loggedIn;
  });
}

function login(credentials) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email: credentials.email,
      password: credentials.password
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
