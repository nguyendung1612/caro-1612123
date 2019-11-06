import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://caroapi-1612123.herokuapp.com',
  baseURL: 'http://localhost:4040',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default {
  signUp: async (name, username, password) => {
    try {
      const response = await instance.post('/user/register', {
        username,
        password,
        name
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  signIn: async (username, password) => {
    try {
      const response = await instance.post('/user/login', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  signOut: async () => {
    try {
      const response = await instance.post('/user/logout');
      window.localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  /* signIn2: (username, password) => {
    return instance({
      method: 'POST',
      url: '/user/login',
      data: { username, password }
    })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }, */

  getUser: async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const response = await instance.get('/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  signInFB: async () => {
    try {
      const rs = await instance.get('/auth/fb');
      console.log(rs.data);
      return rs.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  updateLocal: async (id, name, username) => {
    try {
      const response = await instance.post('/user/update', {
        id,
        name,
        username
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  upload: async (id, data, config) => {
    try {
      const response = await instance.post(`/user/avatar/${id}`, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
};
