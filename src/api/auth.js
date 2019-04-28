import axios from 'axios';

export default { login };

function login() {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data);
    return response.data.loggedIn
  });
}
