import axios from 'axios'


let guestId = localStorage.getItem('guest_id')
if (!guestId) {
  guestId = crypto.randomUUID()
  localStorage.setItem('guest_id', guestId)
}

const api = axios.create({
  baseURL: 'http://localhost:3306/api'
})


api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && !user.isGuest) {
    
    config.headers['x-user-id'] = user.id
    config.headers['x-user-role'] = user.role
  } else {
   
    config.headers['x-guest-id'] = guestId
    config.headers['x-user-role'] = 'student'
  }

  return config
})

export { api }
