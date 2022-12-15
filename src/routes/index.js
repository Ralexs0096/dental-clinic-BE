import UserRoute from './users.route.js'
import AppointmentRoute from './appointments.route.js'
import AuthRoute from './auth.route.js'

const routes = [
  {
    path: '/user',
    route: UserRoute
  },
  {
    path: '/appointment',
    route: AppointmentRoute
  },
  {
    path: '/auth',
    route: AuthRoute
  }
]

export default routes
