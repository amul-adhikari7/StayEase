import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Aboutus from './Aboutus/Aboutus'
import AdminBookingList from './booking/AdminBookingList '
import Bookingdetail from './booking/Bookingdetail'
import EditBookingPage from './booking/EditBookingPage '
import Navbar from './components/Navbar'
import ForgetPassword from './Forgetpassword/ForgetPassword'
import Homepage from './homepage/Homepage'
import AddHotel from './Hotels/AddRoom'
import ShowRooms from './Hotels/ShowRooms'
import UpdateDeleteRoom from './Hotels/UpdateDEleteRoom'
import RoomPage from './Hotels/UserRooms'
import ViewRoom from './Hotels/ViewRoom'
import Login from './login/Login'
import HelpCenter from './others/HelpCenter'
import PrivacyPolicy from './others/PrivacyPolicy '
import EsewaResponse from './paymentGateways/Esewa/EsewaResponse'
import Register from './register/Register'
import Profile from './user/Profile'

function App () {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage />} /> {/* Homepage */}
        <Route path='/login' element={<Login />} /> {/* Login */}
        <Route path='/register' element={<Register />} /> {/* Register */}
        <Route path='forgetpassword' element={<ForgetPassword />} />{' '}
        {/* Forget Password */}
        <Route path='/room' element={<RoomPage />} />
        <Route path='/room/:id' element={<ViewRoom />} />
        <Route path='profile' element={<Profile />} /> {/* Profile */}
        <Route path='/bookings' element={<Bookingdetail />} /> {/* Booking */}
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/help' element={<HelpCenter />} />
        <Route path='/esewa/response' element={<EsewaResponse />} />
        <Route path='/hotel' element={<AddHotel />} />
        <Route path='/rooms' element={<ShowRooms />} />
        <Route path='/room/update-delete/:id' element={<UpdateDeleteRoom />} />
        <Route path='/admin/bookings' element={<AdminBookingList />} />
        <Route path='/admin/booking/edit/:id' element={<EditBookingPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
