import axios from 'axios'
import apiUrl from '../apiConfig'

export const commentCreate = (comment, user, id) => {
  console.log('created comment is :', comment.reply)
  return axios({
    url: apiUrl + '/blogposts/' + id + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { comment }
  })
}

export const commentView = (id) => {
  return axios({
    url: apiUrl + '/blogposts/' + id + '/viewcomments',
    method: 'GET'
  })
}
