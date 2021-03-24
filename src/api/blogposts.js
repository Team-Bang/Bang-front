import axios from 'axios'
import apiUrl from '../apiConfig'

export const blogPostCreate = (blogpost, user) => {
  return axios({
    url: apiUrl + '/blogposts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { blogpost }
  })
}
export const blogPostIndex = (blogpost, user) => {
  return axios({
    url: apiUrl + '/blogposts',
    method: 'GET',
    data: { blogpost }
  })
}

export const blogPostShow = (id) => {
  return axios({
    url: apiUrl + '/blogposts/' + id,
    method: 'GET'
  })
}

export const blogPostUpdate = (id, blogpost, user) => {
  return axios({
    url: apiUrl + '/blogposts/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { blogpost }
  })
}
