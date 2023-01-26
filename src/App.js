import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import GlobalStyle from './utils/style/GlobalStyle'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import User from './pages/User/User'
import Error from './pages/Error/Error'
import Profile from './pages/Profile/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'



function App() {

    const authUser = useSelector((state) => state.auth);

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                {authUser._id ?
                    <Route path="/user" element={<User />} />
                    : <Route path="/user" element={<Error />} />
                }
                <Route path="/profile" element={<Profile />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
