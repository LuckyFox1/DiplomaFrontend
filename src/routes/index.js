import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import RegisterRoute from './Register'
import PersonalCabinetRoute from './PersonalCabinet'
import MedicalCardRoute from './MedicalCard'
import SearchRoute from './Search'
import HospitalRoute from './Hospital'
import LabRoute from './Lab'
import LoginRoute from './Login'
import ScheduleRoute from './Schedule'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    RegisterRoute(store),
    PersonalCabinetRoute(store),
    MedicalCardRoute(store),
    SearchRoute(store),
    HospitalRoute(store),
    LabRoute(store),
    LoginRoute(store),
    ScheduleRoute(store)
  ]
})

export default createRoutes
