import axios from 'axios'
import apiUrl from '../apiConfig'

export const commentCreate = (comment, user, id) => {
  return axios({
    url: apiUrl + '/blogposts/' + id,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { comment }
  })
}
