/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  update: function (data) {
    if (window.localStorage.getItem('userId') === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    if (data.id === null) {
      return Promise.reject(new Error('Need a user ID.'))
    }
    const payload = {...data}
    return Vue.axiosAuth.patch('/api/users/' + data.id, payload)
  },

  updateWithFile: function (data) {
    if (window.localStorage.getItem('userId') === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    if (data.id === null) {
      return Promise.reject(new Error('Need a user ID.'))
    }
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
    formData.append('_method', 'PATCH')
    return Vue.axiosAuthWithFile.post('/api/users/' + data.id, formData)
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
    return Vue.axiosWithFile.post('/api/users', formData)
  },

  login: function (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  checkEmail: function (email) {
    // return Vue.axios.post('/api/users/email', payload)
    setTimeout(function () { return true }, 1000)
  },

  load: function () {
    const userId = window.localStorage.getItem('userId')
    if (userId === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials found'))
    }
    return Vue.axiosAuth.get('/api/users/' + userId)
  }
}
