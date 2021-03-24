import axios from 'axios'
import apiUrl from '../apiConfig'

export const blogPostCreate = (blogpost, user) => {
  return axios({
    url: apiUrl + '/blogposts',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { blogpost }
  })
}
