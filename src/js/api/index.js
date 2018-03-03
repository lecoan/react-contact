import axios from 'axios';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
const token = cookies.get('csrftoken');

const API = {
  login(username, password) {
    return axios.post('/api/users/login/', {
      username,
      password,
    });
  },
  register(username, password) {
    return axios.post('/api/users/register/', {
      username,
      password
    });
  },
  logout() {
    return axios.get('api/users/logout/');
  },
  addContact(contact) {
    return axios.post('/api/contacts/', contact, {
      headers: {'X-CSRFTOKEN': token}
    });
  },
  deleteContact(id) {
    return axios.delete(`/api/contacts/${id}/`, {
      headers: {'X-CSRFTOKEN': token}
    });
  },
  modifyContact(contact) {
    return axios.put(`/api/contacts/${contact.id}/`, contact, {
      headers: {'X-CSRFTOKEN': token}
    });
  },
  getContacts() {
    return axios.get('/api/contacts/');
  }
};

export default API;