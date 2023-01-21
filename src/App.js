import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import User from './pages/User/User'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Error from './components/Error/Error'
import { useSelector } from 'react-redux';
import GlobalStyle from './utils/style/GlobalStyle'

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
                <Route path="/signIn" element={<SignIn />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>


    )
}

export default App