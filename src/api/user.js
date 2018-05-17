/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  update: function (data) {
    return Vue.axiosAuth.patch('/api/users/' + data.id, data)
  },
  updateFollowing: function (user, data) {
    return Vue.axiosAuth.patch('/api/users/' + user, data)
  },
  updateWithFile: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      if (key !== 'picture') {
        formData.append(key, data[key])
      } else {
        let image = data.picture
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(image.split(',')[1])

        // separate out the mime component
        var mimeString = image.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }

        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], {type: mimeString})
        var file = new File([bb], 'image' + index + '.png')
        formData.append('picture', file)
      }
    })
    return Vue.axiosAuth.patch('/api/users/' + data.id, formData)
  },

  create: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      if (key !== 'picture') {
        formData.append(key, data[key])
      } else {
        let image = data.picture
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(image.split(',')[1])

        // separate out the mime component
        var mimeString = image.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }

        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], {type: mimeString})
        var file = new File([bb], 'image' + index + '.png')
        formData.append('picture', file)
      }
    })
    return Vue.axios.post('/api/users', formData)
  },

  login: function (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  passwordRecovery: function (email) {
    return Vue.axios.get('/api/users/password/recovery/' + email)
  },

  validateToken: function (token, email) {
    const data = {
      token: token
    }
    return Vue.axios.post('/api/users/password/recovery/' + email, data)
  },

  passwordChange: function (token, email, password) {
    const data = {
      token: token,
      password: password
    }
    return Vue.axios.post('/api/users/password/reset/' + email, data)
  },

  checkEmail: function (email) {
    const params = {
      email: email
    }
    return Vue.axios.get('/api/users', { params })
  },

  load: function (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId)
  },

  getAll: function () {
    return Vue.axios.get('/api/users')
  },

  getUsersByGroup: function (groupId) {
    return Vue.axios.get('/api/users/?filter[group_ids]=' + groupId)
  },

  getUserById: function (userId) {
    return Vue.axios.get('/api/users/' + userId)
  },

  // transación de créditos
  creditsWidthDrawal: function (ammount) {
    const payload = {
      user_id: ammount.user_id,
      amount: ammount.amount,
      transfer_status: ammount.transfer_status,
      extra: ammount.extra
    }
    return Vue.axiosAuth.post('/api/credits_transactions', payload)
  }
}
