/**
 * API Calls related to users and their properties
 */
import axios from 'axios'
const apiURL = 'https://prilov.aguayo.co/api/'

export default {
  create: function (user) {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    }

    return axios.post(apiURL + 'users', payload)
  }
}
