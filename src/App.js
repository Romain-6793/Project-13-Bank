import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import User from './pages/User/User'
import Error from './pages/Error/Error'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import GlobalStyle from './utils/style/GlobalStyle'
import { Beforeunload } from 'react-beforeunload';

function App() {

    const authUser = useSelector((state) => state.auth);

    //     function storageHandler() {
    //   localStorage.removeItem("token")
    // }

    // function storageHandler() {
    //     if (authUser.remembered !== true) {
    //         localStorage.removeItem("token")
    //     }
    // }

    // window.addEventListener("beforeunload", (ev) => {
    //     ev.preventDefault();
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });

    return (

        // <Beforeunload onBeforeUnload={storageHandler()}>
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
        // </Beforeunload>

    )
}

export default App
