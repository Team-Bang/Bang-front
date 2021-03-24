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
