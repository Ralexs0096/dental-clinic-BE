import UserRoute from './users.route.js'
import AppointmentRoute from './appointments.route.js'

const routes = [
  {
    path: '/user',
    route: UserRoute
  },
  {
    path: '/appointment',
    route: AppointmentRoute
  }
]

export default routes
